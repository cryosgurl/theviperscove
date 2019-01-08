import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from './login.service';
import { Login } from '../../interface/login';

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
                console.log(response);
                this.login = response.data;
            },
            err => {
                console.log(err);
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
