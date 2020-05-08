export interface ConfigDataInterface {
    path: string;
    lines: ConfigLineInterface[]
}

export interface ConfigLineInterface {
    type: 'comment' | 'option' | 'emptyLine'
    key: string
    value: string
}
