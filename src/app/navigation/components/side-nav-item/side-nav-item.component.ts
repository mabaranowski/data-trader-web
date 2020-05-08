import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { SideNavItem, SBRouteData } from '@app/navigation/models/navigation.model';
import { UserService } from '@app/auth/services/user.service';

@Component({
    selector: 'sb-side-nav-item',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './side-nav-item.component.html',
    styleUrls: ['side-nav-item.component.scss'],
})
export class SideNavItemComponent implements OnInit {
    @Input() sideNavItem!: SideNavItem;
    @Input() isActive!: boolean;

    expanded = false;
    routeData!: SBRouteData;

    constructor(private userService: UserService) {}
    ngOnInit() {}

    onLogout() {
        this.userService.logoutUser();
    }
}
