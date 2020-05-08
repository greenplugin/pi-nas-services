import {readFileSync} from "fs";
import {ConfigDataInterface, ConfigLineInterface} from "./interfaces/ConfigDataInterface";

export class DefaultConfigProvider {
    constructor(private path: string) {

    }

    readConfig(): ConfigDataInterface {
        const content = readFileSync(this.path, 'utf8');
        // @ts-ignore
        const lines = [...content.matchAll(/^.*$/gm)]
            .map(entry => entry[0])
            .map((line: string): ConfigLineInterface => {
                if (line.replace(/\s*/g, '') === '') {
                    return {
                        type: "emptyLine",
                        key: '',
                        value: ''
                    }
                }
                if (/^#/gm.test(line)) {
                    return {
                        type: "comment",
                        key: '',
                        value: line
                    }
                }
                let [key, value] = line.split(/\s+/);
                return {
                    type: 'option',
                    key: key || '',
                    value: value || ''
                }
            })

        return {
            path: this.path,
            lines
        }
    }

    writeConfig(config: string) {

    }
}
