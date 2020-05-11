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
    Names: string[],
    Image: string,
    ImageID: string,
    Command: string,
    Created: number,
    Ports: PortConfig[],
    Labels: string[],
    State: string,
    Status: string,
    HostConfig: {
        NetworkMode: string
    },
    NetworkSettings: NetworkSettings,
    Mounts: MountPoint[],
    restarting?: true
}


export interface PortConfig {
    IP: string
    PrivatePort: number
    PublicPort: number
    Type: string
}


export interface NetworkSettings {
    Networks: {
        [key: string]: Network
    }
}


export interface Network {
    Aliases: any;
    DriverOpts: any;
    EndpointID: string;
    Gateway: string;
    GlobalIPv6Address: string;
    GlobalIPv6PrefixLen: number;
    IPAMConfig: any;
    IPAddress: string;
    IPPrefixLen: number;
    IPv6Gateway: string;
    Links: any;
    MacAddress: string;
    NetworkID: string;
}
