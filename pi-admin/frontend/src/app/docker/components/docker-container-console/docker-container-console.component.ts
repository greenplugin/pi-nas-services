import { Component, OnInit} from '@angular/core';
import {map} from "rxjs/operators";
import {ContainerData} from "../../interfaces/container-data-interface";
import {ActivatedRoute} from "@angular/router";
import {DockerContainersService} from "../../services/docker-containers.service";

@Component({
    selector: 'app-docker-container-console',
    templateUrl: './docker-container-console.component.html',
    styleUrls: ['./docker-container-console.component.scss']
})
export class DockerContainerConsoleComponent implements OnInit {
    private containerData;
    public id: string;
    public terminals: Array<string> = []
    commands: string[] = [
        'sh',
        'bash',
        'top'
    ]

    constructor(route: ActivatedRoute, private dockerContainersService: DockerContainersService) {
        route.parent.params.subscribe(params => {
            this.id = params.id
            this.dockerContainersService
                .getContainers()
                .pipe(map((containers: ContainerData[]) => {
                    return containers.find((container: ContainerData) => container.Id === this.id);
                })).subscribe((containerData: ContainerData) => {
                if (containerData) {
                    this.containerData = containerData
                }
            })
        })
    }

    ngOnInit() {
    }

    openTerminal(command: string) {
        this.terminals.push(command)
    }

    closeTerminal(command: string) {
        const index = this.terminals.indexOf(command);
        if (index >= 0) {
            this.terminals.splice(index, 1);
        }
    }
}
