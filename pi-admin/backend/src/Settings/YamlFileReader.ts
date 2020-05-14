import {FileReaderInterface} from "./interface/FileReaderInterface";
import {readdirSync, readFileSync, statSync} from "fs";
import {join} from "path";

export class YamlFileReader implements FileReaderInterface {

    constructor(private path: string) {
    }

    public readAll(name: string): string[] {
        const path = join(this.path, name)

        if (statSync(path).isDirectory()) {
            const configs = readdirSync(path);
            return configs
                .filter((file) => /\.yml$|\.yaml$/mg.test(file))
                .map(file => this.loadFile(join(path, file)))
        }

        return [this.loadFile(path)]
    }


    private loadFile(path: string): string {
        return readFileSync(path, 'utf8')
    }
}
