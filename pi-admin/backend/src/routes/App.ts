// Init shared
import {Request, Response, Router} from "express";
import {OK} from "http-status-codes";
import {SettingsProvider} from "../Settings/SettingsProvider";
import {fileReader} from "../SettingsFileReader";

const router = Router();

const menuSettingsProvider = new SettingsProvider(fileReader, 'menu');

/******************************************************************************
 *                      Get All Users - "GET /api/app/menu"
 ******************************************************************************/
router.get('/menu', async (req: Request, res: Response) => {
    return res.status(OK).json(menuSettingsProvider.load(false));
});


export const App = router;
