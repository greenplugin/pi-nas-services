import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

export interface RequestOptions {
    headers?: HttpHeaders | {
        [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
        [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
    withCredentials?: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private readonly apiPath = `http://${window.location.hostname}:3000/api`

    constructor(private http: HttpClient) {
    }

    get(path, options?: RequestOptions): Observable<any> {
        if (!options) {
            return this.http.get([this.apiPath, path].join('/'))
        }

        return this.http.get([this.apiPath, path].join('/'), options as any)
    }

    post(path, data, options?: RequestOptions): Observable<any> {
        if(!options){
            return this.http.post([this.apiPath, path].join('/'), data);
        }
        return this.http.post([this.apiPath, path].join('/'), data, options as any);
    }
}
