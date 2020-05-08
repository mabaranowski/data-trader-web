import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '@app/auth/models/auth.model';
import { UserService } from '@app/auth/services/user.service';

@Component({
    selector: 'sb-login',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './login.component.html',
    styleUrls: ['login.component.scss'],
})
export class LoginComponent implements OnInit {
    @ViewChild('f') loginForm!: NgForm;
    error!: string;
    isAuthenticated = false;
    
    constructor(
        private userService: UserService,
        private changeDetectorRef: ChangeDetectorRef,
        private router: Router
    ) {}

    ngOnInit() {
        this.userService.user.subscribe(user => {
            this.isAuthenticated = !!user;
        });
    }

    onSubmit() {
        const user: User = {
            email: this.loginForm.value.email,
            password: this.loginForm.value.password
        }

        if(this.loginForm.valid) {
            this.userService.loginUser(user).subscribe(res => {
                this.router.navigate(['/dashboard']);
            }, 
            err => {
                this.error = err.error;
                this.changeDetectorRef.markForCheck();
            });
        } else {
            this.error = 'All fields are required';
            this.changeDetectorRef.markForCheck();
        }
    }
}
