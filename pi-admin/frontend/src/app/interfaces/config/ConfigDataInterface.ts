export interface ConfigDataInterface {
    path: string;
    lines: Array<ConfigLineInterface | ConfigCommentOrEmptyInterface>
}

export interface ConfigLineInterface {
    type: 'option'
    key: string
    value: string,
    disabled: boolean
}

export interface ConfigCommentOrEmptyInterface {
    type: 'comment' | 'emptyLine'
    value: string,
}
