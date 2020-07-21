import { SideNavSection, SideNavItems } from '../models/navigation.model';

export const sideNavSections: SideNavSection[] = [
    {
        text: 'CORE',
        items: ['dashboard'],
    },
    {
        text: 'MARKET',
        items: ['browseBundles', 'browseStreams', 'share', 'subs'],
    },
    {
        text: 'ACCOUNT',
        items: ['metric', 'settings', 'logout'],
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
        text: 'Bundles',
        link: '/market/bundles',
    },
    browseStreams: {
        icon: 'bolt',
        text: 'Streams',
        link: '/market/streams',
    },
    share: {
        icon: 'mobile-alt',
        text: 'Devices',
        link: '/market/share',
    },
    metric: {
        icon: 'address-card',
        text: 'Metrics',
        link: '/market/metrics',
    },
    subs: {
        icon: 'share',
        text: 'Subscriptions',
        link: '/account/subs',
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
