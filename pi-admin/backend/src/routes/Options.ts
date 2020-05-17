// Init shared
import {Request, Response, Router} from "express";
import {OK} from "http-status-codes";
import {readdirSync, readFileSync, statSync} from "fs";
import {join} from 'path'
import * as os from "os";
import {DefaultConfigProvider} from "../ConfigProviders/Providers/DefaultConfigProvider";
import {ChapSecretsConfigProvider} from "../ConfigProviders/Providers/ChapSecretsConfigProvider";
import {SettingsProvider} from "../Settings/SettingsProvider";
import {YamlFileReader} from "../Settings/YamlFileReader";
import {fileReader} from "../SettingsFileReader";
import {ConfigFilesInterface} from "../ConfigurationContracts/ConfigFilesInterface";
import {providers} from "../ConfigProviders/Providers";
import {ConfigProviderInterface} from "../ConfigProviders/Interfaces/ConfigProviderInterface";

const router = Router();

const containerConfigProvider = new SettingsProvider<ConfigFilesInterface>(fileReader, 'containers-configs');

function getConfigProviderByConfigId(id: string): ConfigProviderInterface {
    const configInfo = containerConfigProvider.load().config_files[id]
    if (!configInfo) {
        throw new Error(`Bad service id '${id}'`)
    }

    const ConfigProviderConstructor = providers[configInfo.parser];
    if (!ConfigProviderConstructor) {
        throw new Error(`No suitable parser for config '${configInfo.parser}'`)
    }

    return new ConfigProviderConstructor(configInfo.path)
}

/******************************************************************************
 *                      Get All Users - "GET /api/pptpd/config"
 ******************************************************************************/

router.get('/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json('Wrong config Id')
    }

    try {
        const config = getConfigProviderByConfigId(id).readConfig()
        return res.status(OK).json(config);
    } catch (e) {
        if (e instanceof Error) {
            return res.status(400).json({error: e.message})
        }
        throw e;
    }
});

router.post('/:id', async (req: Request, res: Response) => {
    const {id} = req.params;
    const {config} = req.body;
    if (!id || !config) {
        return res.status(400).json('Wrong config')
    }
    // @todo add validation

    try {
        const result = getConfigProviderByConfigId(id).writeConfig(config)
        return res.status(OK).json(result);
    } catch (e) {
        if (e instanceof Error) {
            return res.status(400).json({error: e.message})
        }
        throw e;
    }
});

export default router;
