import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NavigationService } from '@app/navigation/services/navigation.service';

@Component({
    selector: 'sb-top-nav',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './top-nav.component.html',
    styleUrls: ['top-nav.component.scss'],
})
export class TopNavComponent implements OnInit {
    constructor(private navigationService: NavigationService) {}
    ngOnInit() {}
    toggleSideNav() {
        this.navigationService.toggleSideNav();
    }
}
