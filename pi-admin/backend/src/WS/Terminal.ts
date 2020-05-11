import {Container} from "node-docker-api/lib/container";
import docker from "../Docker/Docker";
import {Request} from "express";
import WebSocket from "ws";
import {CommandRunner} from "../Docker/CommandRunner";

export class Terminal {
    private readonly container: Container;
    private readonly startCommand: string = 'sh';
    private readonly encoder: TextEncoder;
    private readonly decoder: TextDecoder;

    constructor(private ws: WebSocket, private req: Request) {
        this.container = docker.container.get(req.params.id);
        this.startCommand = req.params.command;
        // this.startCommand = atob(req.params.command);
        // console.info(this.startCommand, req.params.command)
        this.encoder = new TextEncoder();
        this.decoder = new TextDecoder();
        this.follow().then()
    }

    async follow() {
        const cmd = new CommandRunner(this.container)
        const stream = await cmd.follow(this.startCommand)
        console.info(this.startCommand)

        stream.on('data', (d: Buffer) => {
            try {
                this.ws.send(d)
            } catch (e) {
                console.info(this.decoder.decode(d));
            }
        })
        stream.on('end', () => {
            console.info('destroyed');
            try {
                this.ws.send('\r\r\n Session closed \r\n');
                this.ws.close();
            } catch (e) {
                console.info(e)
            }
        })
        stream.on('error', (e) => {
            console.info('error');
            console.info(e)
            try {
                this.ws.send('\r\n Session Failed \r\n');
                this.ws.close()
            } catch (e) {
                console.info(e)
            }
        })

        this.ws.on('message', (data: string) => {
            try {
                stream.connection.write(data);
                console.info(data.charCodeAt(0))
            } catch (e) {
                console.info(e);
            }
        })

        this.ws.on('close', () => {
            try {
                // @todo refactor this
                stream.connection.write(String.fromCharCode(16))
                setTimeout(() => {
                    stream.connection.write(String.fromCharCode(17))
                    setTimeout(() => {
                        stream.connection.write(String.fromCharCode(9))
                        setTimeout(() => {
                            stream.connection.write(String.fromCharCode(26))
                        }, 10)
                    }, 10)
                }, 10)
            } catch (e) {
                console.error(e)
            }
        })
    }
}


// [
//     100, 101, 115, 116,
//     114, 111, 89, 45,
//     115, 116, 114, 101,
//     97, 109, 45, 102,
//     114, 111, 109, 45,
//     99, 108, 105, 101,
//     110, 116, 45, 109,
//     101, 115, 115, 97,
//     103, 101, 45, 100,
//     101, 115, 116, 114,
//     111, 121
// ]
//
// ===
//
// [
//     100, 101, 115, 116,
//     114, 111, 89, 45,
//     115, 116, 114, 101,
//     97, 109, 45, 102,
//     114, 111, 109, 45,
//     99, 108, 105, 101,
//     110, 116, 45, 109,
//     101, 115, 115, 97,
//     103, 101, 45, 100,
//     101, 115, 116, 114,
//     111, 121
// ]
