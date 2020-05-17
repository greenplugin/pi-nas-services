import {ConfigParserTypeEnum} from "../enum/ConfigParserTypeEnum";
import {DefaultConfigDataInterface} from "./DefaultConfigDataInterface";
import {ConfigLineInterface} from "./ConfigLineInterface";
import {ConfigSectionInterface} from "./ConfigSectionInterface";

export interface ConfigDataInterface {
    parser: ConfigParserTypeEnum;
    [ConfigParserTypeEnum.CHAP_SECRETS]?: DefaultConfigDataInterface<ConfigLineInterface>,
    [ConfigParserTypeEnum.DEFAULT]?: DefaultConfigDataInterface<ConfigLineInterface>,
    [ConfigParserTypeEnum.SMARTY]?: DefaultConfigDataInterface<ConfigLineInterface | ConfigSectionInterface>
    [ConfigParserTypeEnum.ENV]?: DefaultConfigDataInterface<ConfigLineInterface>
}

