import { NgModule } from '@angular/core';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fontAwesomeSolidIcons } from './icons.font-awesome-solid';

@NgModule({
    exports: [FontAwesomeModule],
})
export class IconsModule {
    constructor(library: FaIconLibrary) {
        library.addIconPacks(
            fontAwesomeSolidIcons
        );
    }
}
