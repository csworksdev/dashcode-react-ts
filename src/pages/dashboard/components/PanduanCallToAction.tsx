import VideoPlayer from "@/components/partials/widget/VideoPlayer";
import { useState } from 'react';
import Button from "@/components/ui/Button";
import BukuPanduanAnimation from '@/assets/animation/animation_lnnan3tw.json';
import InformationModal from "./InformationModal";

const PanduanCallToAction = () => {
    const [ToogleModal, setToogleModal] = useState<boolean>(false);
    return (
        <div className="css-n-aw-aw-_wsja-s">
            <div className='o0aj'>
                <img
                    className="css-n-aw-aw-_wsja-s4"
                    src="/assets/images/fgh.png"
                    alt=""
                />
            </div>

            <div className="demo-content">
                <div className='css-na-fwwa-g_Qd-q'>
                    <h5 className='font-bold text-white mb-3'>Panduan Aplikasi</h5>
                    <p className='text-white block font-12 mb-1 text-slate-600 dark:text-slate-300 font-semibold mb-5'>Panduan ini dirancang untuk memberikan panduan langkah demi langkah, tips, dan saran yang berguna agar pengguna dapat menggunakan aplikasi secara efisien dan efektif. Dengan pemahaman yang mendalam tentang aplikasi ini, pengguna diharapkan dapat memanfaatkan seluruh fitur dan fungsionalitas yang tersedia, sehingga dapat mencapai hasil yang optimal.</p>
                    <Button onClick={() => setToogleModal(true)} className='btn btn-success'>Unduh Sekarang</Button>
                </div>
                <div className='css-n-awj_q2o-8dxm-q'>
                    <VideoPlayer loop animationData={BukuPanduanAnimation} play style={{ width: 200, height: 200 }} />
                </div>
            </div>

            <InformationModal
                ToogleModal={ToogleModal}
                setToogleModal={setToogleModal}
            />
        </div>
    )
};
export default PanduanCallToAction;