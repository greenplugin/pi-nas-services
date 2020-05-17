import {ConfigFileInterface} from "./ConfigFileInterface";

export interface ConfigFilesInterface {
    config_files: {
        [key: string]: ConfigFileInterface
    }
}
