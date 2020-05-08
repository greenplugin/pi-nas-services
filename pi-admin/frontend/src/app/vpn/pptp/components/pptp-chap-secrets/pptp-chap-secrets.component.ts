import {Component, OnInit} from '@angular/core';
import {PptpConfigApiService} from "../../services/pptp-config-api.service";
import {ChapSecretsInterface} from "../../../../interfaces/config/ChapSecretsInterface";

@Component({
    selector: 'app-pptp-chap-secrets',
    templateUrl: './pptp-chap-secrets.component.html',
    styleUrls: ['./pptp-chap-secrets.component.scss']
})
export class PptpChapSecretsComponent implements OnInit {

    public secrets: ChapSecretsInterface

    constructor(private pptpConfigApiService: PptpConfigApiService) {
    }

    ngOnInit() {
        this.pptpConfigApiService.loadChapSecrets().subscribe(secrets => this.secrets = secrets)
    }

}
