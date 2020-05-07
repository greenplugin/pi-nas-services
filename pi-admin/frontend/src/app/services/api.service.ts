import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private readonly apiPath = `http://${window.location.hostname}:3000/api`

    constructor(private http: HttpClient) {
    }

    get(path) {
        return this.http.get([this.apiPath, path].join('/'))
    }

    post(path, data) {
        return this.http.post([this.apiPath, path].join('/'), data);
    }
}
