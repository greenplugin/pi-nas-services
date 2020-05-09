// Init shared
import {Request, Response, Router} from "express";
import {OK} from "http-status-codes";
import {Docker} from 'node-docker-api';
import {Router as WsRouter} from 'express-ws';
import sockets, {IncomingConnection} from '../Sockets';
import {Container} from "node-docker-api/lib/container";
import {IncomingMessage} from "http";
import {first} from "rxjs/operators";
import {interval} from "rxjs";

const docker = new Docker({socketPath: '/var/run/docker.sock'});
const router = Router() as WsRouter;


/******************************************************************************
 *                      Get All Users - "GET /api/docker/all"
 ******************************************************************************/

router.get('/all', async (req: Request, res: Response) => {
    const containers = await docker.container.list();
    const containersData = containers.map(container => container.data)
    return res.status(OK).json({containersData});
});

/******************************************************************************
 *                      Restart All Containers - "POST /api/docker/all"
 ******************************************************************************/

router.post('/all', async (req: Request, res: Response) => {
    const containers = await docker.container.list();
    const containersData = await Promise.all(containers.map(container => container.restart().then(container => container.data)))
    return res.status(OK).json({containersData});
});

/******************************************************************************
 *                      Restart Container By Id - "POST /api/docker/restart"
 ******************************************************************************/

router.post('/restart', async (req: Request, res: Response) => {
    const id = req.body.containerId;
    if (!id) {
        return res.status(400).json('container name should be provided')
    }
    const container = await docker.container.get(id);
    const containerId = await container.restart().then(container => container.id)
    console.info(containerId);
    return res.status(OK).json({containerId});
});

router.get('/logs', async (req: Request, res: Response) => {

    return res.status(OK).json({});
});

sockets.connections.subscribe(async (connection: IncomingConnection) => {
    const list = await docker.container.list();
    await list.forEach((container: Container) => {
        container.logs({
            follow: true,
            stdout: true,
            stderr: true,
            timestamps: true,
            tail: 100,
        }).then((stream: any) => {
            if (stream instanceof IncomingMessage) {
                stream.setEncoding('utf8')
                try {
                    stream.on('data', (info: Buffer) => {
                        info.toString('utf8').split(/(?=\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{9}Z)/gm)
                            .filter(item => (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{9}Z/gm.test(item)))
                            // .map(item => item.replace(/^.{1}/, ''))
                            .forEach(string => {
                                connection.ws.send(JSON.stringify({
                                    path: 'docker/logs/data',
                                    data: {
                                        id: container.id,
                                        data: container.data,
                                        log: string,
                                        date: (string.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{9}Z/gm) || [])[0]
                                    }
                                }))
                            })
                    })
                    stream.on('error', (err: any) => {
                        connection.ws.send(JSON.stringify({
                            path: 'docker/logs/error',
                            data: {
                                id: container.id,
                                data: container.data,
                                error: err
                            }
                        }))
                    })
                } catch (e) {
                    stream.destroy()
                    console.info(e)
                }

                connection.close.pipe(first()).subscribe(() => stream.destroy());
                connection.error.pipe(first()).subscribe(() => stream.destroy());
            }
        })
    })
})

export default router;
