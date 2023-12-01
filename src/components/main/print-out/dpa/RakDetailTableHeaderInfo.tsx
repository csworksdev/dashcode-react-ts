import { FiDivideCircle, FiFileText, FiTrendingUp } from "react-icons/fi";

import NominalFormat from "@/components/main/NominalFormat";
import { HeaderInfoRakType } from "@/pages/penatausahaan/types";

type Props = {
    headerInfo: HeaderInfoRakType
}

const RakDetailTableHeaderInfo = (props: Props) => {
    const { headerInfo } = props
    return (
        <>
            <div className="container-rak-detail-head">
                <div style={{ width: 350 }}>
                    <span className="inline-flex items-center">
                        <span className="account-user-image ltr:mr-3 rtl:ml-3 flex-none">
                            <img src="/assets/images/aMHhm8fp7D8EO347U.min.webp" alt="" className="object-cover w-full h-full rounded-md" />
                        </span>
                        <div className="container-table-td-2-column">
                            <span className="text-lg text-slate-800 dark:text-slate-300 capitalize font-bold">{headerInfo.name}</span>
                            <span className="txt-font-12 text-slate-300 dark:text-slate-300">Kode: {headerInfo?.kode_skpd}</span>
                        </div>
                    </span>
                </div>
                <div>
                    <span className="inline-flex items-center">
                        <div className="container-icon-table-list">
                            <FiTrendingUp size={25} color="#4669fa" />
                        </div>
                        <div className="container-table-td-2-column">
                            <NominalFormat className='text-lg text-slate-800 dark:text-slate-300 capitalize font-bold' displayType={'text'} value={headerInfo.pendapatan} prefix={'Rp'} />
                            <span className="txt-font-12 text-slate-300 dark:text-slate-300">Akumulasi Alokasi Anggaran</span>
                        </div>
                    </span>
                </div>
                <div>
                    <span className="inline-flex items-center">
                        <div className="container-icon-table-list">
                            <FiFileText size={25} color="#3FC1C9" />
                        </div>
                        <div className="container-table-td-2-column">
                            <NominalFormat className='text-lg text-slate-800 dark:text-slate-300 capitalize font-bold' displayType={'text'} value={headerInfo.rak} prefix={'Rp'} />
                            <span className="txt-font-12 text-slate-300 dark:text-slate-300">Akumulasi (RAK)</span>
                        </div>
                    </span>
                </div>
                <div>
                    <span className="inline-flex items-center">
                        <div className="container-icon-table-list">
                            <FiDivideCircle size={25} color="#FF2E63" />
                        </div>
                        <div className="container-table-td-2-column">
                            <NominalFormat className='text-lg text-slate-800 dark:text-slate-300 capitalize font-bold' displayType={'text'} value={headerInfo.selisih} prefix={'Rp'} />
                            <span className="txt-font-12 text-slate-300 dark:text-slate-300">Akumulasi Selisih</span>
                        </div>
                    </span>
                </div>
            </div>

            <div className="ifn">
                <p className='text-sm text-slate-300 dark:text-slate-300 capitalize font-medium'>Klik Untuk Memperbarui</p>
            </div>
        </>
    )
};
export default RakDetailTableHeaderInfo;