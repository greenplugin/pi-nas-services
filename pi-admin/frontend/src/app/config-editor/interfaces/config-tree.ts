import {ConfigFile} from "./config-file";

export interface ConfigThree {
    path: string;
    name: string;
    type: 'dir';
    items: Array<ConfigFile | ConfigThree>;
}
