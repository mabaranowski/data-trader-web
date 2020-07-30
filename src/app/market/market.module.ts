import { CommonModule, DecimalPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonsModule } from '@app/commons/commons.module';
import { DashboardModule } from '@app/dashboard/dashboard.module';
import { IconsModule } from '@app/icons/icons.module';
import { NavigationModule } from '@app/navigation/navigation.module';
import { DetailsComponent } from './components/details/details.component';
import { DeviceDetailsComponent } from './components/device-details/device-details.component';
import { MetricsComponent } from './components/metrics/metrics.component';
import { NgBootstrapTableComponent } from './components/ng-bootstrap-table/ng-bootstrap-table.component';
import { NgPopupComponent } from './components/ng-popup/ng-popup.component';
import { ShareComponent } from './components/share/share.component';
import { TablesComponent } from './components/tables/tables.component';
import { DatasetService } from './services/dataset.service';
import { MarketService } from './services/market.service';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        NavigationModule,
        CommonsModule,
        FormsModule,
        DashboardModule,
        IconsModule,
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
        NgPopupComponent,
        DeviceDetailsComponent
    ],
    exports: [
        TablesComponent
    ],
})
export class MarketModule { }
