// Init shared
import {Request, Response, Router} from "express";
import {OK} from "http-status-codes";
import {readdirSync, readFileSync, statSync} from "fs";
import {join} from 'path'
import * as os from "os";
import {DefaultConfigProvider} from "../ConfigProviders/DefaultConfigProvider";
import {ChapSecretsConfigProvider} from "../ConfigProviders/ChapSecretsConfigProvider";

const router = Router();


/******************************************************************************
 *                      Get All Users - "GET /api/device/temp"
 ******************************************************************************/

router.get('/config', async (req: Request, res: Response) => {
    const config = (new DefaultConfigProvider('/config/pptpd/pptpd.conf')).readConfig()

    return res.status(OK).json(config);
});

router.post('/config', async (req: Request, res: Response) => {

    return res.status(OK).json({});
});


router.get('/options', async (req: Request, res: Response) => {
    const config = (new DefaultConfigProvider('/config/pptpd/pptpd-options')).readConfig()

    return res.status(OK).json(config);
});

router.post('/options', async (req: Request, res: Response) => {
    const config = (new DefaultConfigProvider('/config/pptpd/pptpd-options')).readConfig()

    return res.status(OK).json(config);
});

router.get('/chap-secrets', async (req: Request, res: Response) => {
    const config = (new ChapSecretsConfigProvider('/config/pptpd/chap-secrets')).readConfig()

    return res.status(OK).json(config);
});

router.post('/chap-secrets', async (req: Request, res: Response) => {
    const config = (new ChapSecretsConfigProvider('/config/pptpd/chap-secrets')).readConfig()

    return res.status(OK).json(config);
});



export default router;
