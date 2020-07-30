import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SBRouteData } from '@app/navigation/models/navigation.model';
import { AuthModule } from './auth.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

export const ROUTES: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login',
    },
    {
        path: 'login',
        canActivate: [],
        component: LoginComponent,
        data: {
            title: 'Login',
        } as SBRouteData,
    },
    {
        path: 'register',
        canActivate: [],
        component: RegisterComponent,
        data: {
            title: 'Register',
        } as SBRouteData,
    },
];

@NgModule({
    imports: [ 
        AuthModule, 
        RouterModule.forChild(ROUTES)
    ],
    exports: [ 
        RouterModule 
    ],
})
export class AuthRoutingModule {}
