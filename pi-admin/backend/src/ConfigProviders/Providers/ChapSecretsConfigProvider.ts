import {readFileSync, writeFileSync} from "fs";
import {ConfigDataInterface} from "../Contracts/ConfigDataInterface";
import {ConfigParserTypeEnum} from "../enum/ConfigParserTypeEnum";

import {AbstractConfigProvider} from "./AbstractConfigProvider";
import {ConfigLineInterface} from "../Contracts/ConfigLineInterface";
import {ConfigCommentOrEmptyLineInterface} from "../Contracts/ConfigCommentOrEmptyLineInterface";

export class ChapSecretsConfigProvider extends AbstractConfigProvider {
    public readonly parserName = ConfigParserTypeEnum.CHAP_SECRETS

    readConfig(): ConfigDataInterface {
        const content = readFileSync(this.path, 'utf8');
        // @ts-ignore
        const lines = [...content.matchAll(/^.*$/gm)]
            .map(entry => entry[0])
            .map((line: string, index): ConfigLineInterface | ConfigCommentOrEmptyLineInterface => {
                if (line.replace(/\s*/g, '') === '') {
                    return {
                        type: "emptyLine",
                        value: ''
                    }
                }
                if (/^#[^#]/gm.test(line)) {
                    return {
                        type: "comment",
                        value: line
                    }
                }
                let disabled = false;
                if (this.isDisabledLine(line)) {
                    line = line.replace(/^##\s*/, '');
                    disabled = true;
                }
                let [user, server = '*', password = '*', ip = '*'] = line.split(/\s+/);
                return {
                    key: index.toString(),
                    type: "array",
                    parser: this.parserName,
                    value: [user, server, password, ip,],
                    disabled
                }
            })

        return {
            parser: this.parserName,
            [this.parserName]: {
                payload: lines
            }
        }
    }

    writeConfig(config: ConfigDataInterface) {
        const data = config[ConfigParserTypeEnum.CHAP_SECRETS];
        if (!data) {
            throw new Error('Cannot parse config')
        }
        const lines = data.payload.map((line: ConfigLineInterface | ConfigCommentOrEmptyLineInterface): string => {
            if (line.type === "array") {
                if (!Array.isArray(line.value)) {
                    throw new Error('Cannot parse config')
                }
                return `${line.disabled ? '##' : ''}${line.value.join(' \t\t\t')}`
            }
            if ('string' !== typeof line.value) {
                throw new Error('Cannot parse config')
            }

            return line.value
        })

        writeFileSync(this.path, lines.join('\n'), 'utf8')
    }
}
