import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LoginService {

    loginServerApi = 'http://localhost:7000';

    checkLogin () {
        return this.http.get(this.loginServerApi);
    }
    constructor(public http: HttpClient) { }
}
