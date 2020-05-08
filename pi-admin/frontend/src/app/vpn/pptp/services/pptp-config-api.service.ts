import {Injectable} from '@angular/core';
import {ApiService} from "../../../services/api.service";
import {Observable} from "rxjs";
import {ConfigDataInterface} from "../../../interfaces/config/ConfigDataInterface";
import {ChapSecretsInterface} from "../../../interfaces/config/ChapSecretsInterface";

@Injectable({
    providedIn: 'root'
})
export class PptpConfigApiService {

    constructor(private apiService: ApiService) {
    }

    loadConfig(): Observable<ConfigDataInterface> {
        return this.apiService.get('pptpd/config')
    }

    loadOptions(): Observable<ConfigDataInterface> {
        return this.apiService.get('pptpd/options')
    }

    loadChapSecrets(): Observable<ChapSecretsInterface> {
        return this.apiService.get('pptpd/chap-secrets')
    }
}
