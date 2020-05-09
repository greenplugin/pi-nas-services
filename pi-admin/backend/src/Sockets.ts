import WebSocket, {CloseEvent, ErrorEvent} from "ws";
import {Observable, Subject} from "rxjs";
import {Request} from "express";
import {shareReplay} from "rxjs/operators";
import {Error} from "tslint/lib/error";

export interface IncomingConnection {
    path: string;
    ws: WebSocket;
    request: Request;
    close: Observable<CloseEvent>;
    error: Observable<ErrorEvent>;
    writer: WriterInterface;
}

export interface WriterInterface {
    write(key: string, data: any): void;
}

class Sockets {
    private readonly incomingConnections: Subject<IncomingConnection> = new Subject<IncomingConnection>();

    get connections(): Observable<IncomingConnection> {
        return this.incomingConnections.pipe(shareReplay());
    }

    push(path: string, ws: WebSocket, request: Request) {
        this.incomingConnections.next(new Connection(path, ws, request));
    }
}

class Connection implements IncomingConnection {
    public readonly closeSubject: Subject<CloseEvent> = new Subject<CloseEvent>();
    public readonly errorSubject: Subject<ErrorEvent> = new Subject<ErrorEvent>();

    public readonly writer: WriterInterface;

    get close(): Observable<CloseEvent> {
        return this.closeSubject.pipe(shareReplay());
    }

    get error(): Observable<ErrorEvent> {
        return this.errorSubject.pipe(shareReplay());
    }

    constructor(
        public readonly path: string,
        public readonly ws: WebSocket,
        public readonly request: Request
    ) {
        ws.onerror = (event) => this.errorSubject.next(event);
        ws.onclose = (event) => this.closeSubject.next(event);
        this.writer = new Writer(ws, this.errorSubject);
    }


}

class Writer implements WriterInterface {

    constructor(private ws: WebSocket, private errorHandler: Subject<ErrorEvent>) {
    }

    public write(key: string, data: any) {
        try {
            this.ws.send(JSON.stringify({
                path: key,
                data
            }))
        } catch (e) {
            if (e instanceof Error) {
                this.errorHandler.next({
                    error: e,
                    message: e.message,
                    type: e.name || 'undefined error',
                    target: this.ws,
                })
            } else {
                this.errorHandler.next({
                    error: e,
                    message: 'Unknown Error.',
                    type: 'Undefined Type',
                    target: this.ws,
                })
            }
        }

    }
}

export default new Sockets();
