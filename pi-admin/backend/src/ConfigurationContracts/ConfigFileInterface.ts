import {ConfigParserTypeEnum} from "../ConfigProviders/enum/ConfigParserTypeEnum";

export interface ConfigFileInterface {
    path: string
    title: string
    description: string
    parser: ConfigParserTypeEnum
}
