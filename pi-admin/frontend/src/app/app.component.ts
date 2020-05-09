import {Component, OnInit} from '@angular/core';
import {MainIconsService} from "./icons/main-icons.service";
import {ApiService} from "./services/api.service";
import {filter} from "rxjs/operators";
import {WebsocketService} from "./services/websocket.service";
import {ContainerData} from "./docker/interfaces/container-data-interface";

interface Temp {
    zone: string
    temp: number
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'frontend';
    sidenavOpened = true;

    private temp: Temp[]
    private tempAvg: number;
    private containers: ContainerData[] = []

    constructor(
        private mainIconsService: MainIconsService,
        private apiService: ApiService,
        private wsService: WebsocketService
    ) {
        mainIconsService.registerIcon('pptpd', '/assets/pptpd.svg');
        mainIconsService.registerIcon('openvpn', '/assets/openvpn.svg');
        mainIconsService.registerIcon('raspberry_color', '/assets/raspberry_color.svg');
    }

    ngOnInit(): void {
        this.wsService.wsMessages
            .pipe(filter((message: any) => message.path === 'device/temp/all'))
            .subscribe((message: { data: Temp[] }) => {
                this.temp = message.data;
                this.tempAvg = this.temp.reduce((result: number, item: Temp) => result + item.temp, 0) / this.temp.length;
            })

        this.loadContainers();
    }

    restartContainer(container: ContainerData) {
        container.restarting = true;
        this.apiService.post('docker/restart', {containerId: container.Id})
            .subscribe((response: ContainerData) => {
                this.loadContainers();
                console.info(response);
            })
    }

    loadContainers() {
        this.apiService.get('docker/all').subscribe((response: any) => {
            this.containers = response.containersData
        });
    }

    showInfo(container: ContainerData) {
        console.info(container);
    }
}
