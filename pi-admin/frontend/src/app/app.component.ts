import {AfterViewInit, Component, OnInit} from '@angular/core';
import {MainIconsService} from "./icons/main-icons.service";
import {ApiService} from "./services/api.service";
import {filter} from "rxjs/operators";
import {WebsocketService} from "./services/websocket.service";
import {ContainerData} from "./docker/interfaces/container-data-interface";
import {DockerContainersService} from "./docker/services/docker-containers.service";
import {RouterLinkActive} from "@angular/router";

interface Temp {
    zone: string
    temp: number
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit{
    title = 'frontend';
    sidenavOpened = true;
    routerLinkActive: {[key: string]: RouterLinkActive}
    disableAnimation = true;

    public temp: Temp[]
    public tempAvg: number;
    public containers: ContainerData[] = []

    constructor(
        private mainIconsService: MainIconsService,
        private wsService: WebsocketService,
        private dockerContainerService: DockerContainersService
    ) {
        mainIconsService.registerIcon('pptpd', '/assets/pptpd.svg');
        mainIconsService.registerIcon('openvpn', '/assets/openvpn.svg');
        mainIconsService.registerIcon('raspberry_color', '/assets/raspberry_color.svg');
        mainIconsService.registerIcon('dlna', '/assets/dlna.svg');
    }

    ngOnInit(): void {
        this.wsService.wsMessages
            .pipe(filter((message: any) => message.path === 'device.temp.all'))
            .subscribe((message: { data: Temp[] }) => {
                this.temp = message.data;
                this.tempAvg = this.temp.reduce((result: number, item: Temp) => result + item.temp, 0) / this.temp.length;
            })

        this.loadContainers();
    }

    ngAfterViewInit(): void {
        setTimeout(() => this.disableAnimation = false);
    }

    restartContainer(container: ContainerData) {
        container.restarting = true;
        this.dockerContainerService.restartContainer(container);
    }

    loadContainers() {
        this.dockerContainerService
            .getContainers()
            .subscribe((containers: ContainerData[]) => this.containers = containers);
    }

    showInfo(container: ContainerData) {
        console.info(container);
    }

    getContainerName(containerData: ContainerData){
        return containerData.Names.join(', ').replace(/\//gm, '')
    }
}
