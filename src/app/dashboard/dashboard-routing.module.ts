import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SBRouteData } from '@app/navigation/models/navigation.model';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardModule } from './dashboard.module';

export const ROUTES: Routes = [
    {
        path: '',
        data: {
            title: 'Dashboard'
        } as SBRouteData,
        canActivate: [],
        component: DashboardComponent,
    }
];

@NgModule({
    imports: [ 
        DashboardModule, 
        RouterModule.forChild(ROUTES) 
    ],
    exports: [ 
        RouterModule 
    ],
})
export class DashboardRoutingModule {}
