import {readFileSync, writeFileSync} from "fs";
import {
    ConfigCommentOrEmptyInterface,
    ConfigDataInterface,
    ConfigLineInterface
} from "./interfaces/ConfigDataInterface";

export class DefaultConfigProvider {
    constructor(private path: string) {

    }

    readConfig(): ConfigDataInterface {
        const content = readFileSync(this.path, 'utf8');
        // @ts-ignore
        const lines = [...content.matchAll(/^.*$/gm)]
            .map(entry => entry[0])
            .map((line: string): ConfigLineInterface | ConfigCommentOrEmptyInterface => {
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

                if (/^##/gm.test(line)) {
                    line = line.replace(/^##\s*/, '');
                    disabled = true;
                }

                let [key, value] = line.split(/\s+/);
                return {
                    type: 'option',
                    key: key || '',
                    value: value || '',
                    disabled
                }
            })

        return {
            path: this.path,
            lines
        }
    }

    writeConfig(config: ConfigDataInterface): void {
        const lines = config.lines.map((line: ConfigLineInterface | ConfigCommentOrEmptyInterface): string => {
            if (line.type === "option") {
                return `${line.disabled ? '##' : ''}${line.key} \t\t\t${line.value}`
            }

            return line.value
        })

        writeFileSync(this.path, lines.join('\r\n'), 'utf8')
    }
}
