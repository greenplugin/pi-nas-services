import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {map} from "rxjs/operators";
import {MenuSectionInterface} from "../interfaces/menu-section-interface";
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class MenuService {
    private menu: BehaviorSubject<MenuSectionInterface[]> = new BehaviorSubject<MenuSectionInterface[]>([])

    constructor(private apiService: ApiService) {
    }

    loadMenu() {
        this.apiService.get('app/menu')
            .pipe(map((payload: any): MenuSectionInterface[] => {
                return Object.values(payload.menu).map((section: any) => {
                    section.items = Object.keys(section.items).map((key: string) => {
                        const item = section.items[key]
                        item.id = key;
                        return item;
                    })
                    return section;
                });
            }))
            .subscribe((sections: MenuSectionInterface[]) => {
                this.menu.next(sections);
            })

        return this.menu;
    }

    getMenu() {
        return this.menu
    }
}
