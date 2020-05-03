import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SettingsComponent } from './components/settings/settings.component';
import { NavigationModule } from '@app/navigation/navigation.module';
import { CommonsModule } from '@app/commons/commons.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        NavigationModule,
        CommonsModule
    ],
    providers: [],
    declarations: [ 
        SettingsComponent
    ],
    exports: [],
})
export class AccountModule {}
