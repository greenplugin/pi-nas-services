import {readdirSync, readFileSync, statSync} from "fs";
import {join} from "path";
import {interval, Subject} from "rxjs";

export class ThermalProvider {
    private readonly path = '/sys/class/thermal';
    private readonly zones: string[]

    constructor() {
        this.zones = readdirSync(this.path)
            .filter(f => /thermal_zone\d+/.test(f) && statSync(join(this.path, f)).isDirectory())
            .map(f => join(this.path, f))
    }

    public getZones(timeInterval: number = 100, stack: number = 10) {
        const result = new Subject();
        const zoneMap: { [key: string]: number[] } = {}
        this.zones.forEach((zone) => zoneMap[zone] = [])
        interval(timeInterval).subscribe(() => {
            const results: { zone: string, temp: number }[] = [];
            this.zones.forEach((zone) => {
                zoneMap[zone].push(parseInt(readFileSync(join(zone, 'temp'), 'utf8')))
                if (zoneMap[zone].length >= stack) {
                    results.push({
                        zone: zone,
                        temp: Math.round((zoneMap[zone].reduce((r, v) => r + v, 0) / zoneMap[zone].length) / 10) / 100
                    })
                    zoneMap[zone] = [];
                }
            })
            if (results.length) {
                result.next(results);
            }
        })
        return result;
    }
}
