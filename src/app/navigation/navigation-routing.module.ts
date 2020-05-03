import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SBRouteData } from '@app/navigation/models/navigation.model';
import { DashboardComponent } from '@app/dashboard/components/dashboard/dashboard.component';
import { DashboardModule } from '@app/dashboard/dashboard.module';
import { TablesComponent } from '@app/market/components/tables/tables.component';
import { MarketModule } from '@app/market/market.module';

export const ROUTES: Routes = [
    {
        path: 'dashboard',
        data: {
            title: 'Dashboard',
        } as SBRouteData,
        canActivate: [],
        component: DashboardComponent,
    },
    {
        path: '/browse/bundles',
        data: {
            title: 'Browse bundles',
        } as SBRouteData,
        canActivate: [],
        component: TablesComponent
    }
];

@NgModule({
    imports: [ 
        DashboardModule, 
        MarketModule, 
        RouterModule.forChild(ROUTES) 
    ],
    exports: [ 
        RouterModule 
    ],
})
export class NavigationRoutingModule {}
