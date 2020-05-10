export interface MountPoint {
    Type: string,
    Source: string,
    Destination: string,
    Mode: string,
    RW: boolean,
    Propagation: string
}

export interface ContainerData {
    Id: string,
    Names: any[],
    Image: string,
    ImageID: string,
    Command: string,
    Created: number,
    Ports: any[],
    Labels: any,
    State: string,
    Status: string,
    HostConfig: any,
    NetworkSettings: any,
    Mounts: MountPoint[],
    restarting?: true
}


export interface PortConfig {
    IP: string
    PrivatePort: number
    PublicPort: number
    Type: string
}
