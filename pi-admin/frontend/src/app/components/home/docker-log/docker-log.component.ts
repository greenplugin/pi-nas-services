import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../services/api.service";
import {DomSanitizer} from "@angular/platform-browser";
import {DockerLogsService} from "../../../docker/services/docker-logs.service";

@Component({
    selector: 'app-docker-log',
    templateUrl: './docker-log.component.html',
    styleUrls: ['./docker-log.component.scss']
})
export class DockerLogComponent implements OnInit {
    public log: string[] = [];

    constructor(
        private dockerLogsService: DockerLogsService,
        private apiService: ApiService,
        private sanitizer: DomSanitizer,
    ) {
        dockerLogsService
            .getLog()
            .subscribe(logEntries => this.log = logEntries.map(entry => entry.message));
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
