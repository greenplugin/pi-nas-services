import {ConfigParserTypeEnum} from "../enum/ConfigParserTypeEnum";

export interface ConfigLineInterface {
    parser: ConfigParserTypeEnum
    type: 'option' | 'array' | 'map'
    key: string
    value: string | ConfigLineInterface | string[] | ConfigLineInterface[],
    disabled: boolean
}
