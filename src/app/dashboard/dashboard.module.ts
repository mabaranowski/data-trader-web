import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DashboardCardsComponent } from './components/dashboard-cards/dashboard-cards.component';
import { DashboardChartsComponent } from './components/dashboard-charts/dashboard-charts.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavigationModule } from '@app/navigation/navigation.module';
import { CommonsModule } from '@app/commons/commons.module';
import { ChartsComponent } from './components/charts/charts.component';
import { IconsModule } from '@app/icons/icons.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        NavigationModule,
        CommonsModule,
        IconsModule
    ],
    providers: [],
    declarations: [ 
        DashboardComponent, 
        DashboardCardsComponent, 
        DashboardChartsComponent, 
        ChartsComponent 
    ],
    exports: [
        DashboardCardsComponent
    ],
})
export class DashboardModule {}
