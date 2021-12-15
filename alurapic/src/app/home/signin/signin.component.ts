import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { PlatformDetectorService } from 'src/app/core/plataform-detector/platform-detector.service';

@Component({
    templateUrl: './signin.component.html'
})
export class SignInComponent implements AfterViewInit {

    fromUrl: string = '';
    loginForm = new FormGroup({
        userName: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required)
    });
    @ViewChild('userNameInput')
    userNameInput!: ElementRef<HTMLInputElement>;

    constructor(
        private authService: AuthService,
        private router: Router,
        private platformDetectorService: PlatformDetectorService,
        private activatedRoute: ActivatedRoute
        ) {
            activatedRoute.queryParams
                .subscribe(params => this.fromUrl = params['fromUrl']);
         }

    ngAfterViewInit(): void {
        this.platformDetectorService.isPlatformBrowser() && 
            this.userNameInput.nativeElement.focus();
    }
        
    login() {

        const userName = this.loginForm.value.userName;
        const password = this.loginForm.value.password;
    
        this.authService
            .authenticate(userName, password)
            .subscribe(
                () => {
                    if (this.fromUrl)
                        this.router.navigateByUrl(this.fromUrl);
                    else
                        this.router.navigate(['user', userName])
                },
                err => {
                    console.log(err);
                    this.loginForm.reset();
                    this.platformDetectorService.isPlatformBrowser() && 
                        this.userNameInput.nativeElement.focus();
                    alert('Invalid user name or password');
                }
            );
    }
}