import {AfterViewInit, Component, OnInit} from '@angular/core';
import {MainIconsService} from "./icons/main-icons.service";
import {filter} from "rxjs/operators";
import {WebsocketService} from "./services/websocket.service";
import {ContainerData} from "./docker/interfaces/container-data-interface";
import {DockerContainersService} from "./docker/services/docker-containers.service";
import {StorageService} from "./services/storage.service";
import {MenuService} from "./services/menu.service";
import {MenuItemInterface, MenuSectionInterface} from "./interfaces/menu-section-interface";

export interface Temp {
    zone: string
    temp: number
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
    title = 'frontend';
    menuItems: MenuSectionInterface[] = [];
    shadowSideNavOpened = true;
    disableAnimation = true;

    get sidenavOpened() {
        return this.shadowSideNavOpened;
    }

    set sidenavOpened(value: boolean) {
        this.shadowSideNavOpened = value;
        this.storageService.setItem('app-sidenav-state', value ? 'true' : 'false');
    }

    public temp: Temp[]
    public tempAvg: string;
    public containers: ContainerData[] = []

    constructor(
        private storageService: StorageService,
        private mainIconsService: MainIconsService,
        private wsService: WebsocketService,
        private dockerContainerService: DockerContainersService,
        private menuService: MenuService
    ) {
        mainIconsService.registerIcon('pptpd', '/assets/pptpd.svg');
        mainIconsService.registerIcon('openvpn', '/assets/openvpn.svg');
        mainIconsService.registerIcon('raspberry_color', '/assets/raspberry_color.svg');
        mainIconsService.registerIcon('dlna', '/assets/dlna.svg');
        this.shadowSideNavOpened = this.storageService.getItem('app-sidenav-state') === 'true';
    }

    ngOnInit(): void {
        this.loadMenu()

        this.wsService.wsMessages
            .pipe(filter((message: any) => message.path === 'device.temp.all'))
            .subscribe((message: { data: Temp[] }) => {
                this.temp = message.data;
                this.tempAvg = (this.temp.reduce((result: number, item: Temp) => result + item.temp, 0) / this.temp.length).toFixed(2);
            })

        this.loadContainers();
    }

    ngAfterViewInit(): void {
        setTimeout(() => this.disableAnimation = false);
    }

    loadContainers() {
        this.dockerContainerService
            .getContainers()
            .subscribe((containers: ContainerData[]) => this.containers = containers);
    }

    loadMenu() {
        this.menuService
            .loadMenu()
            .subscribe((menu) => {
                console.info(menu);
                this.menuItems = menu;
            })
    }

    getContainerName(containerData: ContainerData) {
        return containerData.Names.join(', ').replace(/\//gm, '')
    }

    getRouterLink(item: MenuItemInterface) {
        if (item.type === "configuration") {
            return ['/configuration', item.route].join('/')
        }

        if (item.type === "iframe") {
            return ['/external-service', item.route].join('/')
        }
    }
}
