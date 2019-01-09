import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    username: String;
    password: String;

    constructor(
        private loginService: LoginService,
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit(): void {
    }

    onLoginSubmit() {
        const user = {
            username: this.username,
            password: this.password
        };

        this.authService.authenticateUser(user).subscribe(data => {
            if (data.success) {
                this.authService.storeUserData(data.token, data.user);
                console.log('you are now logged in');
                this.router.navigate(['/dashboard']);
            } else {
                console.log(data);
                this.router.navigate(['/login']);
            }
        });
    }

}
