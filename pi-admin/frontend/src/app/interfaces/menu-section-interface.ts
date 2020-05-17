export interface MenuSectionInterface {
    icon: "subscriptions"
    items: Array<MenuItemConfigurationInterface | MenuItemExternalInterface | MenuItemIframeInterface>
    title: "Multimedia services"
}

export interface MenuItemInterface {
    id: string;
    route: string;
    title: string;
    icon: string;
    type: "configuration" | "external" | "iframe"
}

export interface MenuItemConfigurationInterface extends MenuItemInterface {
    configFiles: string[];
    svgIcon: string;
    type: "configuration";
}

export interface MenuItemExternalInterface extends MenuItemInterface {
    path: string;
    type: "external";
}

export interface MenuItemIframeInterface extends MenuItemInterface {
    path: string;
    type: "iframe";
}
