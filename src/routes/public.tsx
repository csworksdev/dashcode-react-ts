import { AuthRoutes } from '@/pages/authentication';
import { LandingRoutes } from '@/pages/landing';
export const publicRoutes = [
    {
        path: '/',
        element: <LandingRoutes />,
    },
    {
        path: '/login/*',
        element: <AuthRoutes />,
    },

];
