/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Module */
import { TablesModule } from './tables.module';

/* Containers */
import * as tablesContainers from './containers';

/* Guards */
import * as tablesGuards from './guards';
import { SBRouteData } from '@modules/navigation/models';
// import { DetailsComponent } from './containers/details/details.component';

/* Routes */
export const ROUTES: Routes = [
    {
        path: 'bundles',
        canActivate: [],
        component: tablesContainers.TablesComponent,
        data: {
            title: 'Bundle Marketplace'
        } as SBRouteData,
    },
    {
        path: 'bundles/details/:id',
        canActivate: [],
        component: tablesContainers.DetailsComponent,
        data: {
            title: 'Details'
        } as SBRouteData,
    },
    {
        path: 'streams',
        canActivate: [],
        component: tablesContainers.TablesComponent,
        data: {
            title: 'Stream Marketplace'
        } as SBRouteData,
    },
    {
        path: 'streams/details/:id',
        canActivate: [],
        component: tablesContainers.DetailsComponent,
        data: {
            title: 'Details'
        } as SBRouteData,
    }
];

@NgModule({
    imports: [TablesModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class TablesRoutingModule {}
