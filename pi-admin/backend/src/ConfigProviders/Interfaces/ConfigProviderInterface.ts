import {ConfigDataInterface} from "../Contracts/ConfigDataInterface";

export interface ConfigProviderInterface {
    readConfig(): ConfigDataInterface

    writeConfig(config: ConfigDataInterface): void
}
