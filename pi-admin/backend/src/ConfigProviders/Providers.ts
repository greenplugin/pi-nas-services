import {ChapSecretsConfigProvider} from "./Providers/ChapSecretsConfigProvider";
import {ConstructorOf} from "./types/ConstructorOf";
import {ConfigProviderInterface} from "./Interfaces/ConfigProviderInterface";
import {ConfigParserTypeEnum} from "./enum/ConfigParserTypeEnum";
import {SmartyConfigProvider} from "./Providers/SmartyConfigProvider";
import {DefaultConfigProvider} from "./Providers/DefaultConfigProvider";

export const providers: { [key: string]: ConstructorOf<ConfigProviderInterface> } = {
    [ConfigParserTypeEnum.CHAP_SECRETS]: ChapSecretsConfigProvider,
    [ConfigParserTypeEnum.SMARTY]: SmartyConfigProvider,
    [ConfigParserTypeEnum.DEFAULT]: DefaultConfigProvider
}

