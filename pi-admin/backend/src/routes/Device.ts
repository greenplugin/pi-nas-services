// Init shared
import {Request, Response, Router} from "express";
import {OK} from "http-status-codes";
import * as os from "os";
import sockets, {IncomingConnection} from "../Sockets";
import {first, subscribeOn} from "rxjs/operators";
import logger from "@shared/Logger";
import {Thermal} from "../Device/Thermal";

const router = Router();


/******************************************************************************
 *                      Get All Users - "GET /api/device/system"
 ******************************************************************************/
router.get('/system', async (req: Request, res: Response) => {
    const cpu = os.cpus();
    const memory = {
        total: os.totalmem(),
        free: os.freemem()
    }
    const arch = os.arch();
    const loadavg = os.loadavg();

    return res.status(OK).json({cpu, memory, arch, loadavg});
});

const thermalZones = new Thermal().getZones();

sockets.connections.subscribe((connection: IncomingConnection) => {
    const errorSubscription = connection.error.subscribe((error) => logger.error(error.message, error))
    const subscription = thermalZones.subscribe((data) => {
        connection.writer.write(
            'device.temp.all',
            data
        )
    })

    connection.close.pipe(first()).subscribe(() => {
        subscription.unsubscribe()
        errorSubscription.unsubscribe()
    });
})

export default router;
