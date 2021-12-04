import Dashboard from './views/Dashboard.vue';

export default [
    {
        path: '/',
        component: Dashboard,
        meta: { title: 'Dashboard' }
    },
    // {
    //     path: '/login',
    //     component: Login,
    //     meta: { title: 'Login', navbar: false }
    // },
    // {
    //     path: '/redirect',
    //     component: Redirect,
    //     meta: { title: 'Redirect', navbar: false }
    // },
    {
        path: '/dashboard',
        component: Dashboard,
        meta: { title: 'Dashboard' }
    },
    // {
    //     path: '/notes',
    //     component: Notes,
    //     meta: { title: 'Notes' }
    // },
    // {
    //     path: '/settings',
    //     component: Notes,
    //     meta: { title: 'Notes' }
    // },
    // {
    //     path: '/:path(.*)',
    //     component: NotFound
    //     meta: { title: '404', navbar: false }
    // }
];
