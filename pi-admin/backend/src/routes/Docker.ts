import {Request, Response, Router} from "express";
import {OK} from "http-status-codes";

import {Router as WsRouter} from 'express-ws';
import sockets, {IncomingConnection} from '../Sockets';
import container, {Container} from "node-docker-api/lib/container";
import logger from "@shared/Logger";
import {LogListener} from "../Docker/LogListener";
import docker from "../Docker/Docker";
import {IncomingMessage} from "http";
import {CommandRunner} from "../Docker/CommandRunner";

const router = Router() as WsRouter;

const logListeners: Map<string, WeakMap<IncomingConnection, LogListener>> = new Map();
const connections: Array<IncomingConnection> = [];

/******************************************************************************
 *                      Get All containers - "GET /api/docker/all"
 ******************************************************************************/

router.get('/all', async (req: Request, res: Response) => {
    const containers = await docker.container.list();
    const containersData = containers.map(container => container.data)
    return res.status(OK).json({containersData});
});

/******************************************************************************
 *                      Get All ENV variables from container - "GET /api/docker/env/:id"
 ******************************************************************************/

router.get('/env/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json('container id should be provided')
    }
    const container = await docker.container.get(id);
    const result = await (new CommandRunner(container)).run('printenv')
    return res.status(OK).json({result});
});


router.post('/env/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    const command = req.body.command;
    if (!id || !command) {
        return res.status(400).json('container id should be provided')
    }
    const container = await docker.container.get(id);
    const result = await (new CommandRunner(container)).run('printenv')
    return res.status(OK).json({result});
});

/******************************************************************************
 *                      Restart Container By Id - "POST /api/docker/restart"
 ******************************************************************************/

router.post('/restart', async (req: Request, res: Response) => {
    const id = req.body.containerId;
    if (!id) {
        return res.status(400).json('container id should be provided')
    }
    let container = await docker.container.get(id);
    container = await docker.container.list((await container.restart()).id)
        .then((containers: Container[]) => containers.find((c: Container) => c.id === container.id)) || container
    const containerListenerMap = logListeners.get(container.id)
    if (containerListenerMap) {
        await connections.forEach((connection: IncomingConnection) => {
            const listenerMap: LogListener | undefined = containerListenerMap.get(connection);
            if (listenerMap) {
                listenerMap.restart(container)
            }
        })
    }
    return res.status(OK).json({containerId: container.id});
});

sockets.connections.subscribe(async (connection: IncomingConnection) => {
    connections.push(connection);
    connection.error.subscribe((error) => logger.error(error.message, error))
    connection.close.subscribe(() => connections.splice(connections.indexOf(connection), 1))
    const list = await docker.container.list();
    await list.forEach((container: Container) => {
        const listener = new LogListener(connection);
        listener.listen(container)
        const thisLogListener = logListeners.get(container.id);
        if (thisLogListener) {
            thisLogListener.set(connection, listener);
        } else {
            logListeners.set(container.id, new WeakMap([[connection, listener]]))
        }
    })
})

export default router;
