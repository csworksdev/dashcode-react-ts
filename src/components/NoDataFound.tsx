import VideoPlayer from "./partials/widget/VideoPlayer";
import NoDataAnimation from '@/assets/animation/animation_lmntuh8c.json';
import Button from "./ui/Button";

type Props = {
    title?: string;
    desc?: string;
    reloadActionParams?: any
    reloadAction?: (params: any) => void
}

const NoDataFound = (props: Props) => {
    const { title, desc, reloadActionParams, reloadAction } = props

    const reload = () => {
        window.location.reload()
    };

    return (
        <div className="container-no-data-access-modal">
            <VideoPlayer animationData={NoDataAnimation} loop play style={{ width: 200, height: 200 }} />
            <h6 className="text-xl text-slate-800 dark:text-slate-300 capitalize font-bold">
                {
                    title != null ?
                        title : 'Data Tidak Ditemukan'
                }
            </h6>
            <p className="text-sm text-center text-slate-500 dark:text-slate-300 font-normal">
                {
                    desc != null ? desc :
                        <>
                        <span>Maaf, kami tidak dapat menemukan data yang Anda cari. Pastikan data tersebut sudah </span><br></br>tercatat atau pertimbangkan untuk menggunakan kata kunci lainnya.
                        </>
                }
            </p>
            {
                reloadAction != null &&
                <div className="css-naw-faf-awj-afw">
                    <Button onClick={() => reloadAction(reloadActionParams)} className="btn btn-lg btn-primary mt-3 mr-3">Muat Ulang Data</Button>
                    <Button onClick={() => reload()} type="button" className="btn btn-lg btn-light mt-3">Muat Ulang Halaman</Button>
                </div>
            }
        </div>
    )
};
export default NoDataFound;