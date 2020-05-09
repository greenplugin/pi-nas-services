import {Component, OnInit} from '@angular/core';
import {PptpConfigApiService} from "../../services/pptp-config-api.service";
import {ChapSecretsInterface} from "../../../../interfaces/config/ChapSecretsInterface";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
    selector: 'app-pptp-chap-secrets',
    templateUrl: './pptp-chap-secrets.component.html',
    styleUrls: ['./pptp-chap-secrets.component.scss']
})
export class PptpChapSecretsComponent implements OnInit {

    public secrets: ChapSecretsInterface

    constructor(private pptpConfigApiService: PptpConfigApiService, private snackBar: MatSnackBar) {
    }

    ngOnInit() {
        this.load()
    }

    load() {
        this.pptpConfigApiService
            .loadChapSecrets()
            .subscribe(secrets => this.secrets = secrets)
    }

    save() {
        this.pptpConfigApiService.saveChapSecrets(this.secrets)
            .subscribe((response) => {
                this.load()
                console.info('saved', response)
                this.snackBar.open('Updated successfully', 'ok', {
                    duration: 2000,
                });
            })
    }

    add() {
        this.secrets.lines.push({
            type: 'chap-secret',
            user: 'new-user-' + this.secrets.lines.filter(line => line.type === 'chap-secret').length,
            server: '*',
            password: 'secret',
            ip: '*',
            disabled: true
        })
    }
}
