import WebSocket, {CloseEvent, ErrorEvent} from "ws";
import {Subject} from "rxjs";
import {Request} from "express";

export interface IncomingConnection {
    path: string;
    ws: WebSocket;
    request: Request;
    close: Subject<CloseEvent>;
    error: Subject<ErrorEvent>;
}

class Sockets {
    public connections: Subject<IncomingConnection> = new Subject<IncomingConnection>();

    push(path: string, ws: WebSocket, request: Request) {
        const connection: IncomingConnection = {path, ws, request, close: new Subject(), error: new Subject()}
        this.connections.next(connection);
        connection.ws.onerror = (event) => connection.error.next(event);
        connection.ws.onclose = (event) => connection.close.next(event);
    }
}

export default new Sockets();
