import { eraseCookie, getCookie } from '@/utils/cookie';
// import { lazyImport } from '@/utils/lazyImport';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import NotFoundPage from '@/components/404';
import { DashboardRoutes } from '@/pages/dashboard';
import App from '@/App';
import Forbidden from '@/components/Forbidden';
// const { PenatausahaanRoutes } = lazyImport(() => import('@/pages/penatausahaan/routes'), 'PenatausahaanRoutes');
// const { UserRoutes } = lazyImport(() => import('@/pages/pengaturan/routes/user/routes'), 'UserRoutes');
// const { AppSettingRoutes } = lazyImport(() => import('@/pages/pengaturan'), 'AppSettingRoutes');

const Logout = () => {
    eraseCookie('X-SIPD-PU-TK')
    const navigate = useNavigate();
    useEffect(() => {
        const authKey = getCookie('X-SIPD-PU-TK');
        if (authKey !== '' || authKey !== null) {
            eraseCookie('X-SIPD-PU-TK')
            navigate('/login', { replace: true });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>--</>
    );
};

const ForbiddenPages = () => {
    return (
        <>
            <Forbidden />
        </>
    );
};

export const protectedRoutes = [
    { path: '/dashboard/*', element: <App><DashboardRoutes /></App> },
    // { path: '/user/*', element: <App><UserRoutes /></App> },
    // { path: '/setting/*', element: <App><AppSettingRoutes /></App> },
    // { path: '/penatausahaan/*', element: <App><PenatausahaanRoutes /></App> },
    { path: '/FORBIDDEN/*', element: <ForbiddenPages /> },
    { path: '/logout/*', element: <Logout /> },
    { path: '*', element: <NotFoundPage /> },
];