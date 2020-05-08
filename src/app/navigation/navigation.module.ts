import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonsModule } from '@app/commons/commons.module';
import { IconsModule } from '@app/icons/icons.module';
import { DashboardHeadComponent } from './components/dashboard-head/dashboard-head.component';
import { SideNavItemComponent } from './components/side-nav-item/side-nav-item.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { TopNavComponent } from './components/top-nav/top-nav.component';
import { LayoutAuthComponent } from './layouts/layout-auth/layout-auth.component';
import { LayoutDashboardComponent } from './layouts/layout-dashboard/layout-dashboard.component';
import { NavigationService } from './services/navigation.service';
import { SideNavService } from './services/side-nav.service';

@NgModule({
    imports: [
        CommonModule, 
        RouterModule, 
        IconsModule, 
        CommonsModule, 
    ],
    providers: [ 
        NavigationService, 
        SideNavService,
    ],
    declarations: [
        DashboardHeadComponent,
        SideNavComponent,
        SideNavItemComponent,
        TopNavComponent,
        LayoutAuthComponent,
        LayoutDashboardComponent
    ],
    exports: [ 
        DashboardHeadComponent, 
        LayoutDashboardComponent,
        LayoutAuthComponent
    ],
})
export class NavigationModule {}
