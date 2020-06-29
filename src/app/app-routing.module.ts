import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

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
        canActivate: [AuthGuard],
    },
    {
        path: 'account',
        loadChildren: () =>
            import('app/account/account-routing.module').then(m => m.AccountRoutingModule),
        canActivate: [AuthGuard],
    },
    {
        path: 'market',
        loadChildren: () =>
        import('app/market/market-routing.module').then(m => m.MarketRoutingModule),
        canActivate: [AuthGuard],
    },
    {
        path: 'auth',
        loadChildren: () =>
            import('app/auth/auth-routing.module').then(m => m.AuthRoutingModule),
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
