import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NavigationModule } from '@app/navigation/navigation.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        NavigationModule,
        HttpClientModule
    ],
    providers: [],
    declarations: [ 
        LoginComponent, 
        RegisterComponent 
    ],
    exports: [],
})
export class AuthModule {}
