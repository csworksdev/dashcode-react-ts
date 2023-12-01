import NominalFormat from "@/components/main/NominalFormat";
import { FiDivideCircle, FiFileText, FiHome, FiLock, FiPackage, FiTrendingUp, FiUnlock } from "react-icons/fi";
import { HeaderInfoDpaType } from "../../../../pages/penatausahaan/types";

type Props = {
    headerInfo: HeaderInfoDpaType
}

const DpaHeaderInfo = (props: Props) => {
    const { headerInfo } = props
    return (
        <>
            <div className="container-rak-detail-heads mb-10">
                <div className="grid grid-cols-12 gap-2">
                    <div className="col-span-2">
                        <div className="css-k4ok-j-jw01a">
                            <span className="">
                                <div className="container-icon-table-list-s mb-2">
                                    <FiPackage size={18} color="#F9A74C" />
                                </div>
                                <div className="container-table-td-2-column">
                                    <div className="css-iiwm-n2ag-a">
                                        <p className="font-bold">x</p>
                                        <NominalFormat className='text-lg text-slate-800 dark:text-slate-300 capitalize font-bold' displayType={'text'} value={headerInfo.total_skpd} />
                                    </div>
                                    <span className="txt-font-12 text-slate-300 dark:text-slate-300">Jumlah SKPD</span>
                                </div>
                            </span>
                        </div>
                    </div>
                    <div className="col-span-2">
                        <div className="css-k4ok-j-jw01a">
                            <span className="">
                                <div className="container-icon-table-list-s mb-2">
                                    <FiUnlock size={18} color="#04364A" />
                                </div>
                                <div className="container-table-td-2-column">
                                    <div className="css-iiwm-n2ag-a">
                                        <p className="font-bold">x</p>
                                        <NominalFormat className='text-lg text-slate-800 dark:text-slate-300 capitalize font-bold' displayType={'text'} value={headerInfo.unlocked} />
                                    </div>
                                    <span className="txt-font-12 text-slate-300 dark:text-slate-300">Belum Dikunci</span>
                                </div>
                            </span>
                        </div>
                    </div>
                    <div className="col-span-2">
                        <div className="css-k4ok-j-jw01a">
                            <span className="">
                                <div className="container-icon-table-list-s mb-2">
                                    <FiLock size={18} color="#FC5185" />
                                </div>
                                <div className="container-table-td-2-column">
                                    <div className="css-iiwm-n2ag-a">
                                        <p className="font-bold">x</p>
                                        <NominalFormat className='text-lg text-slate-800 dark:text-slate-300 capitalize font-bold' displayType={'text'} value={headerInfo.locked} />
                                    </div>
                                    <span className="txt-font-12 text-slate-300 dark:text-slate-300">Terkunci</span>
                                </div>
                            </span>
                        </div>
                    </div>
                    <div className="col-span-3">
                        <div className="css-k4ok-j-jw01a">
                            <span className="">
                                <div className="container-icon-table-list-s mb-2">
                                    <FiTrendingUp size={18} color="#4669fa" />
                                </div>
                                <div className="container-table-td-2-column">
                                    <NominalFormat className='text-md text-slate-800 dark:text-slate-300 capitalize font-bold' displayType={'text'} value={headerInfo.akumulasi_anggaran} prefix={'Rp'} />
                                    <span className="txt-font-12 text-slate-300 dark:text-slate-300">Akumulasi Alokasi Anggaran</span>
                                </div>
                            </span>
                        </div>
                    </div>
                    <div className="col-span-3">
                        <div className="css-k4ok-j-jw01a">
                            <span className="">
                                <div className="container-icon-table-list-s mb-2">
                                    <FiFileText size={18} color="#3FC1C9" />
                                </div>
                                <div className="container-table-td-2-column">
                                    <NominalFormat className='text-md text-slate-800 dark:text-slate-300 capitalize font-bold' displayType={'text'} value={headerInfo.akumulasi_rak} prefix={'Rp'} />
                                    <span className="txt-font-12 text-slate-300 dark:text-slate-300">Akumulasi Rencana Anggaran Kas (RAK)</span>
                                </div>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};
export default DpaHeaderInfo;