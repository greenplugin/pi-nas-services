import {Injectable} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {Observable} from "rxjs";
import {ConfigTree} from "../interfaces/config-tree";
import {FullFile} from "../interfaces/full-file";

@Injectable({
    providedIn: 'root'
})
export class ConfigService {

    constructor(private apiService: ApiService) {
    }

    loadConfigs(): Observable<ConfigTree> {
        return this.apiService.get('config/list')
    }

    loadFile(id: string): Observable<string> {
        return this.apiService.get('config/file/' + id, {responseType: 'text'})
    }

    uploadFile(file: FullFile): Observable<any> {
        const input = new FormData();
        input.append('fileContent', file.content);
        return this.apiService.post(`config/file/${file.options.id}`, input)
    }
}
