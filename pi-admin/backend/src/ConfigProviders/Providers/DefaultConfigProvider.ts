import {readFileSync, writeFileSync} from "fs";
import {ConfigDataInterface} from "../Contracts/ConfigDataInterface";
import {ConfigParserTypeEnum} from "../enum/ConfigParserTypeEnum";
import {AbstractConfigProvider} from "./AbstractConfigProvider";
import {ConfigLineInterface} from "../Contracts/ConfigLineInterface";
import {ConfigCommentOrEmptyLineInterface} from "../Contracts/ConfigCommentOrEmptyLineInterface";

export class DefaultConfigProvider extends AbstractConfigProvider {
    protected readonly parserName = ConfigParserTypeEnum.DEFAULT

    readConfig(): ConfigDataInterface {
        const content = readFileSync(this.path, 'utf8');
        // @ts-ignore
        const lines = [...content.matchAll(/^.*$/gm)]
            .map(entry => entry[0])
            .map((line: string): ConfigLineInterface | ConfigCommentOrEmptyLineInterface => {
                const result = this.getEmptyLineOrComment(line);
                if (result !== null) {
                    return result;
                }

                let [transformedLine, disabled] = this.transformDisabledLine(line)

                let [key, value] = transformedLine.split(/\s+/);

                return {
                    type: 'option',
                    parser: this.parserName,
                    key: key || '',
                    value: value || '',
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
        const data = config[ConfigParserTypeEnum.DEFAULT];
        if (!data) {
            throw new Error('Cannot parse config');
        }
        const lines = data.payload.map((line: ConfigLineInterface | ConfigCommentOrEmptyLineInterface): string => {
            if (line.type === "option") {
                return `${line.disabled ? '##' : ''}${line.key} \t\t\t${line.value}`
            }
            if ('string' !== typeof line.value) {
                throw new Error('cannot save config');
            }
            return line.value
        })

        writeFileSync(this.path, lines.join('\r\n'), 'utf8')
    }
}
