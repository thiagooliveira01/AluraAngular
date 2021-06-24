import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';

@Component({
    templateUrl: './signin.component.html'
})
export class SignInComponent implements OnInit {

    loginForm = new FormGroup({
        userName: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required)
      });

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router) { }
    
    ngOnInit(): void {
    /*    this.loginForm = this.formBuilder.group({
            userName: ['', Validators.required],
            password: ['', Validators.required]
        }); */
    }
    
    login() {

        const userName = this.loginForm.value.userName;
        const password = this.loginForm.value.password;
    
        this.authService
            .authenticate(userName, password)
            .subscribe(
                () => this.router.navigate(['user', userName]),
                err => {
                    console.log(err);
                    this.loginForm.reset();
                }
            );
    }
}