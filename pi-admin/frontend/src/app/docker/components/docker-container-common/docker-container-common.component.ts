import {Component, OnDestroy, OnInit} from '@angular/core';
import {MainIconsService} from "../../../icons/main-icons.service";
import {DockerLogEntry, DockerLogsService} from "../../services/docker-logs.service";
import {ActivatedRoute} from "@angular/router";
import {map} from "rxjs/operators";
import {ContainerData} from "../../interfaces/container-data-interface";
import {DockerContainersService} from "../../services/docker-containers.service";
import {interval, Subscription} from "rxjs";

@Component({
    selector: 'app-docker-container-common',
    templateUrl: './docker-container-common.component.html',
    styleUrls: ['./docker-container-common.component.scss']
})
export class DockerContainerCommonComponent implements OnInit, OnDestroy {
    public subscription: Subscription;
    public id: string;
    public logEntries: DockerLogEntry[];
    public containerData: ContainerData;

    constructor(
        mainIconsService: MainIconsService,
        route: ActivatedRoute,
        private dockerLogsService: DockerLogsService,
        private dockerContainersService: DockerContainersService
    ) {
        mainIconsService.registerIcon('app-console', '/assets/console.svg');
        route.params.subscribe(params => {
            this.id = params.id
            this.dockerLogsService.getLog()
                .pipe(map((logEntries: DockerLogEntry[]) => logEntries.filter((entry: DockerLogEntry) => entry.id === this.id)))
                .subscribe((logEntries: DockerLogEntry[]) => {
                    this.logEntries = logEntries;
                })
            this.dockerContainersService
                .getContainers()
                .pipe(map((containers: ContainerData[]) => {
                    return containers.find((container: ContainerData) => container.Id === this.id)
                }))
                .subscribe((containerData: ContainerData) => this.containerData = containerData)
        })
    }

    ngOnInit() {
        this.resumeUpdate();
    }

    restartContainer() {
        this.containerData.restarting = true;
        this.dockerContainersService.restartContainer(this.containerData);
    }

    switchUpdate() {
        if (this.subscription && !this.subscription.closed) {
            this.pauseUpdate()
            return;
        }

        this.resumeUpdate();
    }

    pauseUpdate() {
        if (this.subscription && !this.subscription.closed) {
            this.subscription.unsubscribe();
        }
    }

    resumeUpdate() {
        this.subscription = interval(7000).subscribe(() => {
            this.dockerContainersService.loadContainers()
        })
    }

    ngOnDestroy(): void {
        this.pauseUpdate()
    }

    showInfo(container: ContainerData) {
        console.info(container);
    }
}
