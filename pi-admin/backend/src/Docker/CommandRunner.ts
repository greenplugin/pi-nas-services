import {Container} from "node-docker-api/lib/container";
import {IncomingMessage} from "http";

export class CommandRunner {
    constructor(private container: Container) {

    }

    async run(command: string | Array<string>) {
        if ('string' === typeof command) {
            command = command.split(/\s+/)
        }
        return (await this.container.exec
            .create({
                AttachStdout: true,
                AttachStderr: true,
                Cmd: command
            })
            .then(exec => {
                return exec.start({Detach: false})
            })
            .then((stream: any): IncomingMessage => stream)
            .then((stream: IncomingMessage): Promise<string> => new Promise((resolve, reject) => {
                let data = '';
                stream.on('data', (d: Buffer) => {
                    data += d.toString()
                })
                stream.on('end', () => {
                    resolve(data.replace(/^\W+(?=\w)/gm, ''))
                })
                stream.on('error', reject)
            }))).split('\n');
    }

    public async follow(command: string | Array<string> = 'sh'): Promise<IncomingMessage> {
        if ('string' === typeof command) {
            command = command.split(/\s+/)
        }
        return await this.container.exec
            .create({
                AttachStdout: true,
                AttachStderr: true,
                AttachStdin: true,
                DetachKeys: "ctrl-p,ctrl-q,ctrl-i,ctrl-z",
                Privileged: true,
                Tty: true,
                Cmd: command
            })
            .then(exec => {
                return exec.start({Detach: false})
            })
            .then((stream: any): IncomingMessage => stream);
    }
}
