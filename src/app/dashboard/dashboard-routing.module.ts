import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardModule } from './dashboard.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SBRouteData } from '@app/navigation/models/navigation.model';
import { AuthGuard } from '@app/auth/auth.guard';

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
