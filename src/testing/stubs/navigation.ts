import { of } from 'rxjs';
import { NavigationService } from '@app/navigation/services/navigation.service';
import { SBRouteData } from '@app/navigation/models/navigation.model';

export const NavigationServiceStub: Partial<NavigationService> = {
    sideNavVisible$: () => of(true),
    toggleSideNav: (visibility?: boolean) => {},
    routeData$: () => of({} as SBRouteData),
    currentURL$: () => of('TEST_URL'),
};
