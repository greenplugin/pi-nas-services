import {AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {AttachAddon} from "xterm-addon-attach";
import {NgTerminal} from "ng-terminal";

@Component({
    selector: 'app-docker-terminal',
    templateUrl: './docker-terminal.component.html',
    styleUrls: ['./docker-terminal.component.scss']
})
export class DockerTerminalComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('terminal', {static: true}) terminal: NgTerminal;
    @Input() private id: string;
    @Input() private command: string;
    @Output() private disconnect: EventEmitter<any> = new EventEmitter<any>();
    public readonly socketUrl = `ws://${window.location.hostname}:3000/terminal-websocket`
    private socket: WebSocket;
    private socketAddon: AttachAddon;

    constructor() {
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.startSession(this.command)
    }

    startSession(command: string) {
        this.socket = new WebSocket(`${this.socketUrl}/${command}/${this.id}`);
        this.socketAddon = new AttachAddon(this.socket);
        this.terminal.underlying.loadAddon(this.socketAddon);
        this.socket.onclose = () => this.disconnect.emit()
    }

    endSession() {
        this.socket.close()
        this.socketAddon.dispose()
    }

    ngOnDestroy(): void {
        console.info('destroy terminal', this.id, this.command)
        this.endSession()
    }

}
