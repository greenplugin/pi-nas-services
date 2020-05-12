export interface ConfigFile {
    id: string;
    path: string;
    name: string;
    type: 'file';
    size: number;
    isChanged: boolean;
}
