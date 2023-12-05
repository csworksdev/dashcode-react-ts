import ForbiddenAnimation from '@/assets/animation/animation_ln99euag.json';
import VideoPlayer from './partials/widget/VideoPlayer';
import { useEffect } from 'react';
// import { reportToDiscord } from '@/utils/Discord';

type Props = {
    error: any
}

const ForbiddenNotify = (props: Props) => {
    const { error } = props

    let splitUrl = error.request.responseURL.split('/')
    var newPathname = "";
    for (let i = 3; i < splitUrl.length; i++) {
        newPathname += "/";
        newPathname += splitUrl[i];
    }

    useEffect(() => {
        if (newPathname != null && newPathname != '') {
            const data = {
                rute: newPathname
            }
            // reportToDiscord("Forbidden", data)
        }
    }, [newPathname])

    return (
        <div>
            <div className='css-ncacf--_cw-2qa-caw2'>
                <VideoPlayer animationData={ForbiddenAnimation} loop play style={{ width: 85, height: 85 }} />
                <h1 style={{ fontSize: 15 }} className='text-center font-bold text-danger'>Akses Ditolak!..</h1>
                <p style={{ fontSize: 12 }} className='ms-2 text-center mb-0 font-normal'>Anda tidak memiliki akses ke alamat</p>
                <div className='css-cj-w_2-fdq1-d1'>
                    <pre>{newPathname}</pre>
                </div>
            </div>
        </div>
    )
};
export default ForbiddenNotify;