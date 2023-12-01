import VideoPlayer from "./partials/widget/VideoPlayer";
import NoDataAnimation from '@/assets/animation/animation_lmntuh8c.json';
import Button from "./ui/Button";

type Props = {
    title?: string;
    desc?: string;
    reloadActionParams?: any
    reloadAction?: (params: any) => void
}

const NoSkpdFound = (props: Props) => {
    const { title, desc, reloadActionParams, reloadAction } = props

    const reload = () => {
        window.location.reload()
    };

    return (
        <div className="container-no-data-access-modal" style={{ opacity: 0.5 }}>
            <span style={{ width: 130 }} className="account-user-image ltr:mr-3 rtl:ml-3 mb-4 flex-none">
                <img width={300} src="/assets/images/aMHhm8fp7D8EO347U.min.webp" className="object-cover rounded-md" />
            </span>
            <h6 className="text-xl text-slate-800 dark:text-slate-300 capitalize font-bold">
                {
                    title != null ?
                        title : 'SKPD Tidak Ditemukan'
                }
            </h6>
            <p className="text-sm text-center text-slate-500 dark:text-slate-300 font-normal">
                {
                    desc != null ? desc :
                        <>
                            <span>Maaf, untuk melanjutkan, mohon pilih salah satu SKPD diatas.</span><br></br>informasi yang akan ditampilkan disini akan berdasarkan SKPD yang Anda pilih.
                        </>
                }
            </p>
            {/* <div className="css-naw-faf-awj-afw">
                <Button className="btn btn-lg btn-primary mt-3 mr-3">Pilih SKPD Disini</Button>
            </div> */}
        </div>
    )
};
export default NoSkpdFound;