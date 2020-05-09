import {readFileSync, writeFileSync} from "fs";
import {ChapSecretInterface, ChapSecretsInterface, EmptyOrCommentLine} from "./interfaces/ChapSecretsInterface";

export class ChapSecretsConfigProvider {
    constructor(private path: string) {

    }

    readConfig(): ChapSecretsInterface {
        const content = readFileSync(this.path, 'utf8');
        // @ts-ignore
        const lines = [...content.matchAll(/^.*$/gm)]
            .map(entry => entry[0])
            .map((line: string): ChapSecretInterface | EmptyOrCommentLine => {
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
                let [user, server = '*', password = '*', ip = '*'] = line.split(/\s+/);
                return {
                    type: "chap-secret",
                    user,
                    server,
                    password,
                    ip,
                    disabled
                }
            })

        return {
            path: this.path,
            lines
        }
    }

    writeConfig(config: ChapSecretsInterface) {
        const lines = config.lines.map((line: ChapSecretInterface | EmptyOrCommentLine): string => {
            if (line.type === "chap-secret") {
                const string = [line.user, line.server, line.password, line.ip].join(' \t\t\t');
                return `${line.disabled ? '##' : ''}${string}`
            }

            return line.value
        })
        console.info(lines.join('\n'));

        writeFileSync(this.path, lines.join('\n'), 'utf8')
    }
}
