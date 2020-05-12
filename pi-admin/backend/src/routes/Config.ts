import {Request, Response, Router} from "express";
import {OK} from "http-status-codes";
import {readdirSync, readFileSync, statSync, writeFileSync} from "fs";
import {join} from "path";
import multer from 'multer';

const upload = multer()

const router = Router();

interface ConfigFile {
    id: string;
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
                id: Buffer.from(fullPath).toString('hex'),
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
    return res.status(OK).json(getConfigTree('/config', 'config'));
});

router.get('/file/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json('id should be provided')
    }
    const name = Buffer.from(id, 'hex').toString('utf8');
    console.info(name);
    res.charset = 'utf8';
    return res.status(OK).send(readFileSync(name, 'utf8'));
});

router.post('/file/:id', upload.none(), async (req: Request, res: Response) => {
    const id = req.params.id;
    const content = req.body.fileContent
    if (!id || !content) {
        return res.status(400).json('id should be provided')
    }
    const name = Buffer.from(id, 'hex').toString('utf8');
    writeFileSync(name, content, {encoding: 'utf8'})
    return res.status(OK).json({});
});


export const Config = router;
