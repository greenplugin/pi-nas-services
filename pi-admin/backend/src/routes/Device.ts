// Init shared
import {Request, Response, Router} from "express";
import {OK} from "http-status-codes";
import {readdirSync, readFileSync, statSync} from "fs";
import {join} from 'path'
import * as os from "os";
import sockets, {IncomingConnection} from "../Sockets";
import {interval} from "rxjs";
import * as fs from "fs";
import {distinctUntilChanged, first, map} from "rxjs/operators";
import winston from "winston";

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

sockets.connections.subscribe((connection: IncomingConnection) => {
    const path = '/sys/class/thermal';
    let zones = readdirSync(path)
        .filter(f => /thermal_zone\d+/.test(f) && statSync(join(path, f)).isDirectory())
        .map(f => join(path, f))
    const subscription = interval(1000).pipe(
        map(() => {
            return zones.map((zone) => ({
                zone: zone,
                temp: parseInt(readFileSync(join(zone, 'temp'), 'utf8')) / 1000
            }))
        }),
        distinctUntilChanged((a, b) => a.reduce((x, i) => x + i.temp, 0) === b.reduce((x, i) => x + i.temp, 0))
    )
        .subscribe((data) => {
            try {
                connection.ws.send(JSON.stringify({
                    path: 'device/temp/all',
                    data
                }))
            } catch (e) {
                console.error(e)
            }
        })

    connection.close.pipe(first()).subscribe(() => subscription.unsubscribe());
    connection.error.pipe(first()).subscribe(() => subscription.unsubscribe());
})

export default router;
