import {Component, OnInit} from '@angular/core';
import {MainIconsService} from "./icons/main-icons.service";
import {ApiService} from "./services/api.service";
import {interval} from "rxjs";
import {switchMap} from "rxjs/operators";

interface Temp {
    zone: string
    temp: number
}

interface MountPoint {
    Type: string,
    Source: string,
    Destination: string,
    Mode: string,
    RW: boolean,
    Propagation: string
}

interface ContainerData {
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
    Mounts: MountPoint,
    restarting?: true
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
        private apiService: ApiService
    ) {
        mainIconsService.registerIcon('pptpd', '/assets/pptpd.svg');
        mainIconsService.registerIcon('openvpn', '/assets/openvpn.svg');
        mainIconsService.registerIcon('raspberry_color', '/assets/raspberry_color.svg');
    }

    ngOnInit(): void {
        interval(5000).pipe(switchMap(() => this.apiService.get('device/temp')))
            .subscribe((response: { tempByZones: Temp[] }) => {
                this.temp = response.tempByZones;
                this.tempAvg = this.temp.reduce((result: number, item: Temp) => result + item.temp, 0) / this.temp.length;
                console.info(this.temp);
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
