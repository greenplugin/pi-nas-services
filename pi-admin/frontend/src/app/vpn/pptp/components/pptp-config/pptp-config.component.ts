import {Component, OnInit} from '@angular/core';
import {PptpConfigApiService} from "../../services/pptp-config-api.service";
import {ConfigDataInterface} from "../../../../interfaces/config/ConfigDataInterface";

@Component({
    selector: 'app-pptp-config',
    templateUrl: './pptp-config.component.html',
    styleUrls: ['./pptp-config.component.scss']
})
export class PptpConfigComponent implements OnInit {
    public config: ConfigDataInterface

    constructor(private pptpConfigApiService: PptpConfigApiService) {
    }

    ngOnInit() {
        this.pptpConfigApiService.loadConfig().subscribe(config => this.config = config)
    }

}
