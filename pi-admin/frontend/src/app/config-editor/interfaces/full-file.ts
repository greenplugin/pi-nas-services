import {ConfigFile} from "./config-file";

export interface FullFile {
    initialContent: string;
    content: string;
    options: ConfigFile;
    closed?: any;
}

