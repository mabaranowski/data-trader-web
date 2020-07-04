import { SideNavSection, SideNavItems } from '../models/navigation.model';

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
        link: '/market/bundles',
    },
    browseStreams: {
        icon: 'bolt',
        text: 'Browse streams',
        link: '/market/streams',
    },
    share: {
        icon: 'share',
        text: 'Devices',
        link: '/market/share',
    },
    metric: {
        icon: 'address-card',
        text: 'Metrics',
        link: '/market/metrics',
    },
    settings: {
        icon: 'cog',
        text: 'Settings',
        link: '/account/settings',
    },
    logout: {
        icon: 'sign-out-alt',
        text: 'Logout',
        link: '/auth/login',
    },
};
