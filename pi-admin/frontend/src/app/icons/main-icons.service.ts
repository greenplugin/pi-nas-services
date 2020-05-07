import {Injectable} from '@angular/core';
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";

@Injectable({
    providedIn: 'root'
})
export class MainIconsService {
    constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
        this.registerIcon('docker', 'assets/docker.svg')
    }

    public registerIcon(name: string, path: string) {
        this.matIconRegistry.addSvgIcon(
            name,
            this.domSanitizer.bypassSecurityTrustResourceUrl(path)
        );
    }
}
