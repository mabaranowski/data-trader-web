import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SettingsComponent } from './components/settings/settings.component';
import { NavigationModule } from '@app/navigation/navigation.module';
import { CommonsModule } from '@app/commons/commons.module';
import { SettingsService } from './services/settings.service';
import { SubsComponent } from './components/subs/subs.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        NavigationModule,
        CommonsModule
    ],
    providers: [SettingsService],
    declarations: [ 
        SettingsComponent, SubsComponent
    ],
    exports: [],
})
export class AccountModule {}
