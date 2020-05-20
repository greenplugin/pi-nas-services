import {Observable, Subject} from "rxjs";
import {ThermalProvider} from "./ThermalProvider";
import {shareReplay} from "rxjs/operators";

class AppThermalListener {
    private temperatures: Subject<any> = new Subject<any>();

    constructor() {
        (new ThermalProvider().getZones(100)).subscribe((temp) => {
            this.temperatures.next(temp);
        });
    }

    getTemperatures(): Observable<{ zone: string, temp: number }> {
        return this.temperatures.pipe(shareReplay())
    }
}

export const thermalListener = new AppThermalListener()
