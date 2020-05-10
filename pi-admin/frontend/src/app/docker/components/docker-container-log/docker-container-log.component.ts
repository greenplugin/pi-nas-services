import {Component, OnInit} from '@angular/core';
import {DockerLogEntry, DockerLogsService} from "../../services/docker-logs.service";
import {ApiService} from "../../../services/api.service";
import {DomSanitizer} from "@angular/platform-browser";
import {map} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-docker-container-log',
    templateUrl: './docker-container-log.component.html',
    styleUrls: ['./docker-container-log.component.scss']
})
export class DockerContainerLogComponent implements OnInit {
    public logEntries: DockerLogEntry[] = [];
    private id: string;

    constructor(
        private dockerLogsService: DockerLogsService,
        private apiService: ApiService,
        private sanitizer: DomSanitizer,
        private route: ActivatedRoute
    ) {
        route.parent.params.subscribe(params => {
            this.id = params.id
            this.dockerLogsService.getLog()
                .pipe(map((logEntries: DockerLogEntry[]) => logEntries.filter((entry: DockerLogEntry) => entry.id === this.id)))
                .subscribe((logEntries: DockerLogEntry[]) => {
                    this.logEntries = logEntries.reverse();
                    console.info(params)
                })
        })
    }

    ngOnInit() {

    }

    getSafeHTML(string) {
        return this.sanitizer.bypassSecurityTrustHtml(string);
    }

    reverse(arr: Array<any>) {
        return arr.reverse()
    }
}
