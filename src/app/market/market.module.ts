import { CommonModule, DecimalPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DetailsComponent } from './components/details/details.component';
import { DatasetService } from './services/dataset.service';
import { MetricsComponent } from './components/metrics/metrics.component';
import { NgBootstrapTableComponent } from './components/ng-bootstrap-table/ng-bootstrap-table.component';
import { ShareComponent } from './components/share/share.component';
import { TablesComponent } from './components/tables/tables.component';
import { NavigationModule } from '@app/navigation/navigation.module';
import { CommonsModule } from '@app/commons/commons.module';
import { DashboardCardsComponent } from '@app/dashboard/components/dashboard-cards/dashboard-cards.component';
import { DashboardModule } from '@app/dashboard/dashboard.module';
import { MarketService } from './services/market.service';
import { NgPopupComponent } from './components/ng-popup/ng-popup.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        NavigationModule,
        CommonsModule,
        FormsModule,
        DashboardModule
    ],
    providers: [
        DecimalPipe,
        DatasetService,
        MarketService
    ],
    declarations: [ 
        DetailsComponent,
        MetricsComponent,
        NgBootstrapTableComponent,
        ShareComponent,
        TablesComponent,
        NgPopupComponent
     ],
    exports: [ 
        TablesComponent 
    ],
})
export class MarketModule {}
