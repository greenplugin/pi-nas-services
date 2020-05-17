export interface ChapSecretsInterface {
    path: string;
    lines: Array<ChapSecretInterface | EmptyOrCommentLine>;
}

export interface ChapSecretInterface {
    type: 'chap-secret',
    user: string,
    server: string,
    password: string,
    ip: string,
    disabled: boolean
}

export interface EmptyOrCommentLine {
    type: 'emptyLine' | 'comment'
    value: string;
}
