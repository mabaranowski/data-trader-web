import { ChangeDetectionStrategy, Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { UserService } from '@app/auth/services/user.service';
import { User } from '@testing/mocks';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'sb-register',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './register.component.html',
    styleUrls: ['register.component.scss'],
})
export class RegisterComponent implements OnInit {
    @ViewChild('f') registerForm!: NgForm;
    error!: string;

    constructor(
        private userService: UserService,
        private changeDetectorRef: ChangeDetectorRef,
        private router: Router
        ) {}
    ngOnInit() {}

    onSubmit() {
        const user: User = {
            firstName: this.registerForm.value.first_name,
            lastName: this.registerForm.value.last_name,
            email: this.registerForm.value.email,
            password: this.registerForm.value.password
        }
        if(this.registerForm.value.password !== this.registerForm.value.confirmPassword) {
            this.error = 'Passwords do not match';
            this.changeDetectorRef.markForCheck();
            return;
        }

        if(this.registerForm.valid) {
            this.userService.registerUser(user).subscribe(res => {
                this.router.navigate(['/auth/login']);
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
