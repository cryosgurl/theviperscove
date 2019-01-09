import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    name: String;
    username: String;
    email: String;
    password: String;
    confirm: String;

    constructor(
        private validateService: ValidateService,
        private authService: AuthService,
        private router: Router
    ) { }

      ngOnInit() {
      }

    onRegisterSubmit() {
        const user = {
            name: this.name,
            email: this.email,
            username: this.username,
            password: this.password
        };

        // required fields
        if (!this.validateService.validateRegister(user)) {
            console.log('fill in all fields');
            return false;
        }

        // Valid email adress
        if (!this.validateService.validateEmail(user.email)) {
            console.log('Please use a valid email');
            return false;
        }

        // Register User
        this.authService.registerUser(user).subscribe(data => {
            if (data.success) {
                console.log('you are now registered');
                this.router.navigate(['/login']);
            } else {
                console.log('Registration failed');
                this.router.navigate(['/register']);
            }
        });
    }

}
