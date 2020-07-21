import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './components/settings/settings.component';
import { AccountModule } from './account.module';
import { AuthGuard } from '@app/auth/auth.guard';
import { SubsComponent } from './components/subs/subs.component';

export const ROUTES: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'settings',
    },
    {
        path: 'settings',
        canActivate: [
            AuthGuard
        ],
        component: SettingsComponent,
    },
    {
        path: 'subs',
        canActivate: [
            AuthGuard
        ],
        component: SubsComponent,
    },
];

@NgModule({
    imports: [ 
        AccountModule, 
        RouterModule.forChild(ROUTES) 
    ],
    exports: [ 
        RouterModule
    ],
})
export class AccountRoutingModule { }
