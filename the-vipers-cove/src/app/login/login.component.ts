import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Login } from '../interface/login';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

    login: Login;
    interval: any;

    constructor(private loginService: LoginService) { }

    updateLoginStatus() {
        this.loginService.checkLogin()
            .subscribe(res => {
                const response: any = res;
                this.login = response.data;
            });
    }

    ngOnInit(): void {
        this.updateLoginStatus();
        this.interval = setInterval(() => {
            this.updateLoginStatus();
        }, 60000);

    }
    ngOnDestroy(): void {
        clearInterval(this.interval);
    }

}
