import {Injectable} from '@angular/core';
import {WebSocketSubject} from "rxjs/internal-compatibility";
import {interval, Subject, Subscription} from "rxjs";
import {takeWhile} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class WebsocketService {
    public readonly socket = new WebSocketSubject({url: `ws://${window.location.hostname}:3000/websocket`})
    public readonly wsMessages = new Subject();
    private subscription: Subscription;
    private reconnections;

    constructor() {
        this.connect()
    }

    connect() {
       this.subscription =  this.socket
            .subscribe(
                (message) => {
                    this.wsMessages.next(message);
                },
                (error: Event) => {
                    this.subscription.unsubscribe()
                    this.reconnect();
                }
            )
    }

    reconnect() {
        this.reconnections = interval(5000)
            .pipe(takeWhile((v, index) => index < 1000 && this.subscription.closed));

        this.reconnections.subscribe(
            () => {
                console.log('trying to reconnect');
                this.connect()
            },
            null,
            () => {
                this.reconnections = null;
                if (this.socket.closed) {
                    this.wsMessages.complete();
                }
            });
    }
}
