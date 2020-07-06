import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TablesComponent } from './components/tables/tables.component';
import { DetailsComponent } from './components/details/details.component';
import { ShareComponent } from './components/share/share.component';
import { MetricsComponent } from './components/metrics/metrics.component';
import { SBRouteData } from '@app/navigation/models/navigation.model';
import { MarketModule } from './market.module';
import { DeviceDetailsComponent } from './components/device-details/device-details.component';

export const ROUTES: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'share',
    },
    {
        path: 'bundles',
        canActivate: [],
        component: TablesComponent,
        data: {
            title: 'Bundle Marketplace'
        } as SBRouteData,
    },
    {
        path: 'bundles/details/:id',
        canActivate: [],
        component: DetailsComponent,
        data: {
            title: 'Details'
        } as SBRouteData,
    },
    {
        path: 'streams',
        canActivate: [],
        component: TablesComponent,
        data: {
            title: 'Stream Marketplace'
        } as SBRouteData,
    },
    {
        path: 'streams/details/:id',
        canActivate: [],
        component: DetailsComponent,
        data: {
            title: 'Details'
        } as SBRouteData,
    },
    {
        path: 'share',
        canActivate: [],
        component: ShareComponent,
        data: {
            title: 'Share'
        } as SBRouteData,
    },
    {
        path: 'share/details/:id',
        canActivate: [],
        component: DeviceDetailsComponent,
        data: {
            title: 'Details'
        } as SBRouteData,
    },
    {
        path: 'metrics',
        canActivate: [],
        component: MetricsComponent,
        data: {
            title: 'Metrics'
        } as SBRouteData,
    }
];

@NgModule({
    imports: [ 
        MarketModule, 
        RouterModule.forChild(ROUTES) 
    ],
    exports: [
        RouterModule
    ],
})
export class MarketRoutingModule {}
