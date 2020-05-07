// Init shared
import {Request, Response, Router} from "express";
import {OK} from "http-status-codes";
import {Docker} from 'node-docker-api';

const docker = new Docker({socketPath: '/var/run/docker.sock'});
const router = Router();


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


export default router;
