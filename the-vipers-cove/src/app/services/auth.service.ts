import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Login } from '../interface/login';
import { Profile } from '../interface/profile';
import { Register } from '../interface/register';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
        registerApi = 'http://localhost:7000/users/register';
        authApi = 'http://localhost:7000/users/authenticate';
        profileApi = 'http://localhost:7000/users/profile';

        authToken: any;
        user: any;

        constructor(private http: HttpClient, public jwtHelper: JwtHelperService) { }

        registerUser(user) {
            const headers = new HttpHeaders({
                'Content-Type':  'application/json'
            });
            return this.http.post<Register>(this.registerApi, user, {headers: headers});
        }

        authenticateUser(user) {
            const headers = new HttpHeaders({
                'Content-Type':  'application/json'
            });
            return this.http.post<Login>(this.authApi, user, {headers: headers});
        }

        getProfile() {
            this.loadToken();
            const headers = new HttpHeaders({
                'Content-Type':  'application/json',
                'Authorization': this.authToken
            });
            return this.http.get<Profile>(this.profileApi, {headers: headers});
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

        tokenIsExpired() {
            return this.jwtHelper.isTokenExpired();
        }

        logout() {
            this.authToken = null;
            this.user = null;
            localStorage.clear();
        }
}
