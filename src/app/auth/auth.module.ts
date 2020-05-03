import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserService } from './services/user.service';
import { NavigationModule } from '@app/navigation/navigation.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        NavigationModule
    ],
    providers: [ 
        UserService
    ],
    declarations: [ 
        ForgotPasswordComponent, 
        LoginComponent, 
        RegisterComponent 
    ],
    exports: [],
})
export class AuthModule {}
