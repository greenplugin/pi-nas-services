import {ConfigFile} from "./config-file";

export interface ConfigTree {
    path: string;
    name: string;
    type: 'dir';
    items: Array<ConfigFile | ConfigTree>;
}
