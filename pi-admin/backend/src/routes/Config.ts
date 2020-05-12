// Init shared
import {Request, Response, Router} from "express";
import {OK} from "http-status-codes";
import * as os from "os";
import {readdirSync, statSync} from "fs";
import {join} from "path";

const router = Router();

interface ConfigFile {
    path: string;
    name: string;
    type: 'file';
    size: number;
}

interface ConfigThree {
    path: string;
    name: string;
    type: 'dir';
    items: Array<ConfigFile | ConfigThree>;
}

function getConfigTree(path: string, name: string): ConfigThree {
    const items: Array<ConfigFile | ConfigThree> = readdirSync(path)
        .map(fileName => {
            const fullPath = join(path, fileName)
            const fileStat = statSync(fullPath)
            if (fileStat.isDirectory()) {
                return getConfigTree(fullPath, fileName)
            }
            return {
                path: fullPath,
                name: fileName,
                type: 'file',
                size: fileStat.size
            }
        })
    return {
        path: path,
        name: name,
        type: 'dir',
        items
    };
}


/******************************************************************************
 *                      Get All Users - "GET /api/config"
 ******************************************************************************/


router.get('/list', async (req: Request, res: Response) => {
    const tree = getConfigTree('/config', 'config');
    return res.status(OK).json({tree});
});

router.get('/file/:name', async (req: Request, res: Response) => {

});

router.post('/file/:name', async (req: Request, res: Response) => {

});


export const Config = router;
