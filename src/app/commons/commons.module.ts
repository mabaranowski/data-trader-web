import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CardViewDetailsComponent } from './components/card-view-details/card-view-details.component';
import { CardComponent } from './components/card/card.component';
import { ChartsAreaComponent } from './components/charts-area/charts-area.component';
import { ChartsBarComponent } from './components/charts-bar/charts-bar.component';
import { IconsModule } from '@app/icons/icons.module';

@NgModule({
    imports: [ 
        CommonModule, 
        RouterModule, 
        IconsModule, 
        NgbModule
    ],
    providers: [],
    declarations: [ 
        CardComponent, 
        CardViewDetailsComponent, 
        ChartsAreaComponent,
        ChartsBarComponent
    ],
    exports: [
        CardComponent, 
        CardViewDetailsComponent, 
        ChartsAreaComponent,
        ChartsBarComponent
    ],
})
export class CommonsModule {}
