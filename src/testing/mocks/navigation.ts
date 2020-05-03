import { SideNavItem } from '@app/navigation/models/navigation.model';
export { SideNavItem };

export class MockSideNavItem implements SideNavItem {
    text = 'TEST';
    link = 'TEST';
}
