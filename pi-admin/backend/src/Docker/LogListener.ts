import {Container} from "node-docker-api/lib/container";
import {IncomingConnection} from "../Sockets";
import {IncomingMessage} from "http";
import {first} from "rxjs/operators";

interface RequestOptions {
    follow: boolean,
    stdout: boolean,
    stderr: boolean,
    timestamps: boolean,
    tail?: number,
    since?: number
}

export class LogListener {
    private since?: string;
    private lastLine?: string;

    constructor(private connection: IncomingConnection) {

    }

    listen(container: Container) {
        const options: RequestOptions = {
            follow: true,
            stdout: true,
            stderr: true,
            timestamps: true,
        }

        if (this.since) {
            options.since = Math.round((new Date(this.since)).getTime() / 1000);
        } else {
            options.tail = 50;
        }

        container.logs(options)
            .then((stream: any): IncomingMessage => stream)
            .then((stream: any) => {
                this.connection.close.pipe(first()).subscribe(() => stream.destroy());

                stream.on('data', (info: Buffer) => {
                    info.toString('utf8')
                        .split(/(?=\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{9}Z)/gm)
                        .filter(item => (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{9}Z/gm.test(item)))
                        .forEach(string => {
                            const date = (string.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{9}Z/gm) || [])[0];
                            const log = string.replace(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{9}Z/gm, '');
                            if (this.lastLine === log) {
                                return;
                            }
                            this.lastLine = log
                            this.since = date;
                            this.connection.writer.write(
                                'docker.logs.data.' + container.id,
                                {
                                    id: container.id,
                                    data: container.data,
                                    log,
                                    date
                                }
                            );
                        })
                })
                stream.on('error', (err: any) => {
                    this.connection.writer.write(
                        'docker.logs.error.' + container.id,
                        {
                            id: container.id,
                            data: container.data,
                            error: err
                        }
                    )
                })
            })
    }

    public restart(container: Container) {
        this.listen(container);
    }
}
