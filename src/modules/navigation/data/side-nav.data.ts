import { SideNavItems, SideNavSection } from '@modules/navigation/models';

export const sideNavSections: SideNavSection[] = [
    {
        text: 'CORE',
        items: ['dashboard'],
    },
    {
        text: 'STORE',
        items: ['browse', 'share', 'metric'],
    },
    {
        text: 'ACCOUNT',
        items: ['settings', 'logout'],
    },
];

export const sideNavItems: SideNavItems = {
    dashboard: {
        icon: 'tachometer-alt',
        text: 'Dashboard',
        link: '/dashboard',
    },
    browse: {
        icon: 'search',
        text: 'Browse',
        link: '/browse',
    },
    share: {
        icon: 'share',
        text: 'Share',
        link: '/share',
    },
    metric: {
        icon: 'address-card',
        text: 'Metrics',
        link: '/metric',
    },
    settings: {
        icon: 'cog',
        text: 'Settings',
        link: '/settings',
    },
    logout: {
        icon: 'sign-out-alt',
        text: 'Logout',
        link: '/logout',
    },
};
