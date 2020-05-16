import {readFileSync, writeFileSync} from "fs";
import {ConfigDataInterface} from "../Contracts/ConfigDataInterface";
import {ConfigParserTypeEnum} from "../enum/ConfigParserTypeEnum";
import {AbstractConfigProvider} from "./AbstractConfigProvider";
import {ConfigLineInterface} from "../Contracts/ConfigLineInterface";
import {ConfigCommentOrEmptyLineInterface} from "../Contracts/ConfigCommentOrEmptyLineInterface";
import {ConfigSectionInterface} from "../Contracts/ConfigSectionInterface";

/**
 * не учли многострочные значения, кажется что они в принципе и не нужны, но можно будет потом поправить
 */
export class SmartyConfigProvider extends AbstractConfigProvider {
    protected readonly parserName = ConfigParserTypeEnum.SMARTY

    readConfig(): ConfigDataInterface {
        const content = readFileSync(this.path, 'utf8');
        // @ts-ignore
        const lines = [...content.matchAll(/^.*$/gm)]
            .map(entry => entry[0])
            .map((line: string): ConfigLineInterface | ConfigCommentOrEmptyLineInterface | ConfigSectionInterface => {
                const result = this.getEmptyLineOrComment(line);
                if (result !== null) {
                    return result;
                }

                let [transformedLine, disabled] = this.transformDisabledLine(line)

                if (/^\[.+]$/gm.test(transformedLine)) {
                    return {
                        type: 'section',
                        value: transformedLine.replace(/[\[\]. ]/gm, ''),
                        hidden: /^\[\..+]$/gm.test(transformedLine),
                        disabled: disabled
                    }
                }

                // @ts-ignore
                let [, key, value] = transformedLine.match(/^(.+?)=(.*)$/s);

                return {
                    type: 'option',
                    parser: this.parserName,
                    key: (key || '').trim(),
                    value: (value || '').trim().replace(/['"]/gm, ''),
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

    writeConfig(config: ConfigDataInterface): void {
        const data = config[this.parserName];
        if (!data) {
            throw new Error('Cannot parse config');
        }
        const lines = data.payload
            .map((line: ConfigLineInterface | ConfigCommentOrEmptyLineInterface | ConfigSectionInterface): string => {
                if (line.type === "option") {
                    return `${line.disabled ? '##' : ''}${line.key}=${line.value}`
                }
                if ('string' !== line.value) {
                    throw new Error('Cannot parse config')
                }

                return line.value
            })

        writeFileSync(this.path, lines.join('\r\n'), 'utf8')
    }
}
