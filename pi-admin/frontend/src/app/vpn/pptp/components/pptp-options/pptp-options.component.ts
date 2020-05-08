import {Component, OnInit} from '@angular/core';
import {ConfigDataInterface} from "../../../../interfaces/config/ConfigDataInterface";
import {PptpConfigApiService} from "../../services/pptp-config-api.service";

@Component({
    selector: 'app-pptp-options',
    templateUrl: './pptp-options.component.html',
    styleUrls: ['./pptp-options.component.scss']
})
export class PptpOptionsComponent implements OnInit {
    public options: ConfigDataInterface

    constructor(private pptpConfigApiService: PptpConfigApiService) {
    }

    ngOnInit() {
        this.pptpConfigApiService.loadOptions().subscribe(options => this.options = options)
    }
}
