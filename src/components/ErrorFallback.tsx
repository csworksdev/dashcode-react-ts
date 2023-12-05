import { useState, useEffect } from 'react';
import VideoPlayer from './partials/widget/VideoPlayer';
// import storage from 'utils/storage';
import ErrorAnimation from '@/assets/animation/animation_lmv3v1zm.json'
import Button from './ui/Button';
import { Link } from 'react-router-dom';
// import { reportToDiscord } from '@/utils/Discord';

const ErrorFallback = (props: any) => {

    const [count, setCount] = useState(5000);

    useEffect(() => {
        // reportToDiscord("Error", {})
        const timer = setInterval(() => {
            setCount((prevCount: number) => prevCount - 1);
        }, 1);

        if (count <= 0) {
            clearInterval(timer);
        }
        return () => clearInterval(timer);
    }, [count]);

    const reload = () => {
        window.location.reload()
    };

    useEffect(() => {
        if (props != null && props.error != null && props.error.message != null) {
            let data: any = {
                errorMessage: props.error.message
            }

            if (props.error.stack != null) {
                data.errorStack = props.error.stack
            }
            // reportToDiscord("Error", data)
        }
    }, [props])

    return (
        <div className="css-fnE_f8jr-4g" role="alert">
            <VideoPlayer style={{ width: 300, height: 300 }} animationData={ErrorAnimation} loop play />
            <h1 className='css-nccf-w-dj-2qa'>Oops!.. </h1>
            <p className="css-vfh_f8fa-v">Maaf, ada sesuatu yang salah. Kami telah menerima laporan atas permasalahan yang terjadi <br />Untuk memulihkan situasi, muat ulang halaman atau kembali ke halaman awal dengan menekan tombol dibawah ini</p>
            <div className="css-naw-faf-awj-afw mt-3">
                <Link to={'/'}>
                    <Button className="btn btn-lg btn-light mt-3 mr-3">Kembali ke Halaman Awal</Button>
                </Link>
                <Button onClick={() => reload()} type="button" className="btn btn-primary btn-lg mt-3">Muat Ulang Halaman</Button>
            </div>
        </div>
    );
};

export default ErrorFallback;