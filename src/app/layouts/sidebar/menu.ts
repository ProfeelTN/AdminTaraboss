import { MenuItem } from "./menu.model";

export const MENU: MenuItem[] = [
    
    {
        id: 2,
        label: 'MENUITEMS.DASHBOARD.TEXT',
        icon: 'ti ti-brand-google-home',
        subItems: [
            {
                id: 3,
                label: 'MENUITEMS.DASHBOARD.LIST.ANALYTICS',
                link: '/',
                parentId: 2
            },
           
        ]
    },

    {
        id: 139,
        label: 'Utilisateurs',
        link: '/tables/basic',
        parentId: 138
    },
    {
        id: 140,
        label: 'Offres',
        link: '/tables/gridjs',
        parentId: 138
    },
    {
        id: 141,
        label: 'Candidatures',
        link: '/tables/listjs',
        parentId: 138
    },
    {
        id: 61,
        label: 'MENUITEMS.AUTHENTICATION.TEXT',
        icon: 'ti ti-user-circle',
        subItems: [
            {
                id: 62,
                label: 'MENUITEMS.AUTHENTICATION.LIST.SIGNIN',
                link: '/auth/signin',
                parentId: 61,
            },
            {
                id: 65,
                label: 'MENUITEMS.AUTHENTICATION.LIST.PASSWORDCREATE',
                link: '/auth/pass-change',
                parentId: 61,
            },
            {
                id: 67,
                label: 'MENUITEMS.AUTHENTICATION.LIST.LOGOUT',
                link: '/auth/logout',
                parentId: 61
            },
        
        ]
    },
    {
        id: 75,
        label: 'MENUITEMS.EXTRAPAGES.TEXT',
        icon: 'ti ti-brand-adobe',
        subItems: [
            
            {
                id: 81,
                label: 'MENUITEMS.EXTRAPAGES.LIST.FAQS',
                link: '/pages/faqs',
                parentId: 75
            },
            {
                id: 85,
                label: 'MENUITEMS.EXTRAPAGES.LIST.PRIVACYPOLICY',
                link: '/pages/privacy-policy',
                parentId: 75
            },
        ]
    },
]