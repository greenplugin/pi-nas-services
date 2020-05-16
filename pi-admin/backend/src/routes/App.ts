// Init shared
import {Request, Response, Router} from "express";
import {OK} from "http-status-codes";
import sockets, {IncomingConnection} from "../Sockets";
import {first} from "rxjs/operators";
import logger from "@shared/Logger";
import {Thermal} from "../Device/Thermal";
import {SettingsProvider} from "../Settings/SettingsProvider";
import {YamlFileReader} from "../Settings/YamlFileReader";

const router = Router();

const menuSettingsProvider = new SettingsProvider(new YamlFileReader('./config'), 'menu');

/******************************************************************************
 *                      Get All Users - "GET /api/app/menu"
 ******************************************************************************/
router.get('/menu', async (req: Request, res: Response) => {
    return res.status(OK).json(menuSettingsProvider.load());
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

export const App = router;
