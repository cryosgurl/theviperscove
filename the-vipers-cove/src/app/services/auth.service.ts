import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Login } from '../interface/login';
import { Register } from '../interface/register';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
        registerApi = 'http://localhost:7000/users/register';
        authApi = 'http://localhost:7000/users/authenticate';
        profileApi = 'http://localhost:7000/users/profile';

        authToken: any;
        user: any;

        constructor(private http: HttpClient) { }

        registerUser(user) {
            const headers = new HttpHeaders();
            headers.append('Content-type', 'application/json');
            return this.http.post<Register>(this.registerApi, user, {headers: headers});
        }

        authenticateUser(user) {
            const headers = new HttpHeaders();
            headers.append('Content-type', 'application/json');
            return this.http.post<Login>(this.authApi, user, {headers: headers});
        }

        getProfile() {
            const headers = new HttpHeaders();
            this.loadToken();
            headers.append('Autherization', this.authToken);
            headers.append('Content-type', 'application/json');
            return this.http.get<Login>(this.profileApi, {headers: headers});
        }

        storeUserData(token, user) {
            localStorage.setItem('id_token', token);
            localStorage.setItem('user', JSON.stringify(user));
            this.authToken = token;
            this.user = user;
        }

        loadToken() {
            const token = localStorage.getItem('id_token');
            this.authToken = token;
        }

        logout() {
            this.authToken = null;
            this.user = null;
            localStorage.clear();
        }
}
