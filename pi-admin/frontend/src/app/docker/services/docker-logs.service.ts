import {Injectable} from '@angular/core';
import {filter, shareReplay} from "rxjs/operators";
import {WebsocketService} from "../../services/websocket.service";
import Convert from 'ansi-to-html'
import {ColorByService} from "../../services/color-by.service";
import {ContainerData} from "../interfaces/container-data-interface";
import {BehaviorSubject, Observable} from "rxjs";

const convert = new Convert({
    fg: '#000',
    bg: '#FFF',
    newline: false,
    escapeXML: false,
    stream: false
});

export interface DockerLogEntry {
    message: string;
    data: ContainerData;
    id: string;
    date: Date;
    containerName: string;
}

@Injectable({
    providedIn: 'root'
})
export class DockerLogsService {
    private readonly log: BehaviorSubject<DockerLogEntry[]> = (new BehaviorSubject<DockerLogEntry[]>([]))

    constructor(ws: WebsocketService, colorByService: ColorByService) {
        const log = [];
        ws.socket.pipe(filter((message: any) => /docker\.logs\..+/gm.test(message.path)))
            .subscribe((message) => {
                const color = colorByService.colorByString(message.data.id);
                const html = (convert.toHtml(message.data.log) as string).replace(/color:#FFF/mg, 'color:#bdbdbd');
                const containerName = (message.data.data.Names || ['undefined_container']).join(',').replace('/', '');
                const date = new Date(message.data.date);
                const lastLogItem = log.length ? log[log.length - 1] : null
                log.push({
                    containerName,
                    message: `<span style="color: ${color}; min-width: 10rem; display: inline-block;">${containerName}:</span> ${html}`,
                    data: message.data.data,
                    id: message.data.id,
                    date
                });
                if (lastLogItem && lastLogItem.date.getTime() > date.getTime()) {
                    console.info('need sort')
                    log.sort((a: DockerLogEntry, b: DockerLogEntry) => {
                        if (a.date.getTime() > b.date.getTime()) {
                            return 1;
                        }
                        if (a.date.getTime() < b.date.getTime()) {
                            return -1;
                        }

                        return 0
                    })
                }
                console.info(message)
                this.log.next(log);
            })
    }

    getLog(): Observable<DockerLogEntry[]> {
        return this.log.pipe(shareReplay());
    }

}
