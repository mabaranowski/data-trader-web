import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './components/settings/settings.component';
import { AccountModule } from './account.module';

export const ROUTES: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'settings',
    },
    {
        path: 'settings',
        canActivate: [],
        component: SettingsComponent,
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
