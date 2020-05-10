import {Component, Input, OnInit} from '@angular/core';
import {ConfigDataInterface} from "../../interfaces/config/ConfigDataInterface";

@Component({
    selector: 'app-conf-default',
    templateUrl: './conf-default.component.html',
    styleUrls: ['./conf-default.component.scss']
})
export class ConfDefaultComponent implements OnInit {
    @Input() public config: ConfigDataInterface

    constructor() {
    }

    ngOnInit() {
    }

}
