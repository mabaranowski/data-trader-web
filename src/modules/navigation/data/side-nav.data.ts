import { SideNavItems, SideNavSection } from '@modules/navigation/models';

export const sideNavSections: SideNavSection[] = [
    {
        text: 'CORE',
        items: ['dashboard'],
    },
    {
        text: 'MARKET',
        items: ['browseBundles', 'browseStreams', 'share', 'metric'],
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
    browseBundles: {
        icon: 'cube',
        text: 'Browse bundles',
        link: '/browse/bundles',
    },
    browseStreams: {
        icon: 'bolt',
        text: 'Browse streams',
        link: '/browse/streams',
    },
    share: {
        icon: 'share',
        text: 'Share',
        link: '/browse/share',
    },
    metric: {
        icon: 'address-card',
        text: 'Metrics',
        link: '/browse/metrics',
    },
    settings: {
        icon: 'cog',
        text: 'Settings',
        link: '/settings',
    },
    logout: {
        icon: 'sign-out-alt',
        text: 'Logout',
        link: '/auth/login',
    },
};
