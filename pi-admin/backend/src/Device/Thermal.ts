import {readdirSync, readFileSync, statSync} from "fs";
import {join} from "path";
import {interval} from "rxjs";
import {distinctUntilChanged, map, shareReplay} from "rxjs/operators";

export class Thermal {
    private readonly path = '/sys/class/thermal';
    private readonly zones: string[]

    constructor() {
        this.zones = readdirSync(this.path)
            .filter(f => /thermal_zone\d+/.test(f) && statSync(join(this.path, f)).isDirectory())
            .map(f => join(this.path, f))
    }

    public getZones(timeInterval: number = 1000) {
        return interval(timeInterval).pipe(
            map(() => {
                return this.zones.map((zone) => ({
                    zone: zone,
                    temp: parseInt(readFileSync(join(zone, 'temp'), 'utf8')) / 1000
                }))
            }),
            distinctUntilChanged((a, b) => a.reduce((x, i) => x + i.temp, 0) === b.reduce((x, i) => x + i.temp, 0)),
            shareReplay()
        )
    }
}
