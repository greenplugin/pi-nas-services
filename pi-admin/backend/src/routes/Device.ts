// Init shared
import {Request, Response, Router} from "express";
import {OK} from "http-status-codes";
import {readdirSync, readFileSync, statSync} from "fs";
import {join} from 'path'
import * as os from "os";

const router = Router();


/******************************************************************************
 *                      Get All Users - "GET /api/device/temp"
 ******************************************************************************/

router.get('/temp', async (req: Request, res: Response) => {
    const path = '/sys/class/thermal';
    let zones = readdirSync(path)
        .filter(f => /thermal_zone\d+/.test(f) && statSync(join(path, f)).isDirectory())
        .map(f => join(path, f))

    const tempByZones = zones.map((zone) => {
        let temp = readFileSync(join(zone, 'temp'), 'utf8');
        return {
            zone: zone,
            temp: parseInt(temp) / 1000
        }
    })

    return res.status(OK).json({tempByZones});
});

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


export default router;
