import {Injectable} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {ContainerData} from "../interfaces/container-data-interface";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {first, shareReplay} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class DockerContainersService {
    containers: BehaviorSubject<ContainerData[]> = new BehaviorSubject([])

    constructor(private apiService: ApiService) {
        this.loadContainers()
    }

    public loadContainers(): Observable<ContainerData[]> {
        this.apiService.get('docker/all').subscribe((response: any) => {
            this.containers.next(response.containersData)
        });

        return this.containers.pipe(shareReplay());
    }

    getContainers(): Observable<ContainerData[]> {
        return this.containers.pipe(shareReplay());
    }

    restartContainer(container: ContainerData): Subject<ContainerData[]> {
        const result: Subject<ContainerData[]> = new Subject();
        this.apiService.post('docker/restart', {containerId: container.Id})
            .subscribe((response: ContainerData) => {
                this.loadContainers()
                    .pipe(first())
                    .subscribe((contaners: ContainerData[]) => {
                        result.next(contaners);
                        result.complete();
                    });
            })
        return result;
    }

    getContainerName(containerData: ContainerData){
        return containerData.Names.join(', ').replace(/\//gm, '')
    }
}
