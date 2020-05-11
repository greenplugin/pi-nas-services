import {Component, Input, OnInit} from '@angular/core';
import {ContainerData, MountPoint, Network} from "../../interfaces/container-data-interface";
import {map} from "rxjs/operators";
import {DockerContainersService} from "../../services/docker-containers.service";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-docker-container-summary',
    templateUrl: './docker-container-summary.component.html',
    styleUrls: ['./docker-container-summary.component.scss']
})
export class DockerContainerSummaryComponent implements OnInit {
    public containerData: ContainerData;
    public networks: Array<{ network: Network, key: string }> = []
    public title: string;
    public host = `http://${window.location.hostname}`

    constructor(private dockerContainersService: DockerContainersService, route: ActivatedRoute) {
        route.parent.params.subscribe(params => {
            this.dockerContainersService
                .getContainers()
                .pipe(map((containers: ContainerData[]) => {
                    return containers.find((container: ContainerData) => container.Id === params.id)
                }))
                .subscribe((containerData: ContainerData) => this.onContainerDataUpdate(containerData))
        })
    }

    onContainerDataUpdate(containerData: ContainerData) {
        if (containerData) {
            this.containerData = containerData;
            this.title = containerData.Names.join(', ').replace(/\//gm, '')
            this.networks = Object.keys(this.containerData.NetworkSettings.Networks).map((key) => ({
                network: this.containerData.NetworkSettings.Networks[key],
                key
            }))
        }
    }

    ngOnInit() {
    }

    getMountPointKey(index: number, point: MountPoint) {
        return JSON.stringify(point)
    }
}
