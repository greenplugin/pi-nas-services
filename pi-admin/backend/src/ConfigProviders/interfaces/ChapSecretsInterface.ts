export interface ChapSecretsInterface {
    path: string;
    lines: Array<ChapSecretInterface | EmptyOrCommentLine>;
}

export interface ChapSecretInterface {
    type: 'chap-secret',
    user: string,
    server: string,
    password: string,
    ip: string
}

export interface EmptyOrCommentLine {
    type: 'emptyLine' | 'comment'
    value: string;
}
