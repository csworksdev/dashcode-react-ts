import NotFoundAnimation from '@/assets/animation/not-found.json';
import VideoPlayer from './partials/widget/VideoPlayer';
import {useEffect} from 'react'
import { getCookie } from '@/utils/cookie';
import { useLocation, useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
    const token = getCookie('X-SIPD-PU-TK')
	const navigate = useNavigate();
	const location = useLocation()

    const handleRedirectHome = () => {
        window.location.href = "/"
    };

    useEffect(() => {
		if (location.pathname !== '/' && location.pathname !== '/login' && location.pathname !== '/logout' && location.pathname !== '/dasar-hukum' && location.pathname !== '/dokumentasi' && location.pathname !== '/faq') {
			if (token == null || token === '') {
				navigate('/');
			}
		} else {
            if (token != null && token !== '') {
				navigate('/dashboard');
			}
        }
		
	}, [token, location.pathname])
    
    return (
        <div>
            <div className="container-not-found">
                <VideoPlayer loop animationData={NotFoundAnimation} play style={{ width: 350, height: 350 }}/>
                <div className="absolute-not-found">
                    {/* <h1 className='font-bold'>Halaman <span className='text-danger'>Tidak Ditemukan</span></h1> */}
                    <p className='text-sm text-slate-800 dark:text-slate-300 capitalize font-semibold'>Halaman yang anda tuju tidak ditemukan. Ingin kembali ke <span onClick={() => handleRedirectHome()} className="text-blue cursor-pointer">halaman utama</span>?</p>
                    
                </div>
            </div>
        </div>
    )
};

export default NotFoundPage;