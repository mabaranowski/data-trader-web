import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/dashboard',
    },
    {
        path: 'dashboard',
        loadChildren: () =>
            import('app/dashboard/dashboard-routing.module').then(m => m.DashboardRoutingModule),
    },
    {
        path: 'account',
        loadChildren: () =>
            import('app/account/account-routing.module').then(m => m.AccountRoutingModule),
    },
    {
        path: 'auth',
        loadChildren: () =>
            import('app/auth/auth-routing.module').then(m => m.AuthRoutingModule),
    },
    {
        path: 'market',
        loadChildren: () =>
            import('app/market/market-routing.module').then(m => m.MarketRoutingModule),
    },
    {
        path: '**',
        pathMatch: 'full',
        redirectTo: '/dashboard'
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
})
export class AppRoutingModule {}
