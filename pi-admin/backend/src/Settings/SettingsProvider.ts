import yaml from 'js-yaml'
import {error} from "winston";
import {FileReaderInterface} from "./interface/FileReaderInterface";
import {isPrimitive} from "util";

export class SettingsProvider<T> {
    private config: any;

    constructor(private reader: FileReaderInterface, private configName: string) {
    }

    public load(): T {
        if (!this.config) {
            this.config = this.loadConfig()
        }
        return this.config;
    }

    private loadConfig() {
        const configData = this.reader
            .readAll(this.configName)
            .map(data => {
                return yaml.safeLoad(data)
            })

        if (configData.length > 1) {
            return this.mergeConfig(configData)
        }
        return configData.shift()
    }

    private mergeConfig(data: any[]) {
        const result = data.shift()
        while (data.length) {
            this.recursiveMerge(result, data.shift())
        }

        return result;
    }

    private recursiveMerge(first: any, second: any) {
        if (Array.isArray(second)) {
            if (!Array.isArray(first) && first !== undefined) {
                throw error('unable to merge configs (array)')
            }
            first = first || [];
            second.forEach((item) => {
                if (first.indexOf(item) === -1) {
                    first.push(item)
                }
            })
            return first;
        }
        if (second !== null && typeof second === 'object') {
            Object.keys(second).forEach(key => {
                if (this.isObject(second[key]) && this.isObject(first[key])) {
                    first[key] = this.recursiveMerge(first[key], second[key])
                    return;
                }
                if (this.isObject(second[key]) && (first[key] === undefined || first[key] === null)) {
                    first[key] = second[key]
                    return;
                }
                if (this.isPrimitive(second[key]) && (this.isPrimitive(first[key]) || !first[key])) {
                    first[key] = second[key]
                    return;
                }
                throw error(`Unable to merge configs (merge objects)`);
            })
        }

        return first;
    }


    private isObject(value: any): boolean {
        return value !== null && typeof value === 'object'
    }

    private isPrimitive(value: any): boolean {
        return (typeof value !== 'object' && typeof value !== 'function') || value === null
    }


}
