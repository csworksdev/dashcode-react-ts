import { useEffect } from 'react'
import { useLocation, useNavigate, useRoutes } from 'react-router-dom';
import { protectedRoutes } from './protected';
import { publicRoutes } from './public';
// import { lazyImport } from '@/utils/lazyImport';
import { getCookie } from '@/utils/cookie';
import { LandingRoutes } from '@/pages/landing';
// const { AuthRoutes } = lazyImport(() => import('@/pages/authentication'), 'AuthRoutes');

const AppRoutes = () => {
    const token = getCookie('X-SIPD-PU-TK')
    const navigate = useNavigate();
    const location = useLocation()

    useEffect(() => {
        if (location.pathname !== '/' && location.pathname !== '/login' && location.pathname !== '/logout' && location.pathname !== '/dasar-hukum' && location.pathname !== '/dokumentasi' && location.pathname !== '/faq') {
            if (token == null || token === '') {
                navigate('/');
            }
        }

    }, [token, location.pathname])

    const commonRoutes = [
        { path: '*', element: <LandingRoutes /> }
    ];
    const routes = token ? protectedRoutes : publicRoutes;
    const element = useRoutes([...routes, ...commonRoutes]);

    return <>{element}</>;
};

export default AppRoutes