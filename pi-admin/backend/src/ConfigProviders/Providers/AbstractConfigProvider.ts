import {ConfigProviderInterface} from "../Interfaces/ConfigProviderInterface";
import {ConfigDataInterface} from "../Contracts/ConfigDataInterface";
import {ConfigParserTypeEnum} from "../enum/ConfigParserTypeEnum";
import {EmptyOrCommentLine} from "../../../../frontend/src/app/interfaces/config/ChapSecretsInterface";

export abstract class AbstractConfigProvider implements ConfigProviderInterface {
    public path: string

    constructor(path: string) {
        this.path = path;
    }

    abstract readConfig(): ConfigDataInterface;

    abstract writeConfig(config: ConfigDataInterface): void;

    protected isComment(line: string): boolean {
        return /^#[^#]/gm.test(line)
    }

    protected isEmptyLine(line: string): boolean {
        return line.replace(/\s*/g, '') === ''
    }

    protected isDisabledLine(line: string) {
        return /^##[^#]/gm.test(line)
    }

    protected getEmptyLineOrComment(line: string): EmptyOrCommentLine | null {
        if (this.isEmptyLine(line)) {
            return {
                type: "emptyLine",
                value: ''
            }
        }
        if (this.isComment(line)) {
            return {
                type: "comment",
                value: line
            }
        }

        return null;
    }

    protected transformDisabledLine(line: string): [string, boolean] {
        if (this.isDisabledLine(line)) {
            return [line.replace(/^##\s*/, ''), true]
        }
        return [line, false]
    }
}
