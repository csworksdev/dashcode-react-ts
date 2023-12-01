import { FiFileText } from "react-icons/fi";
import NominalFormat from "@/components/main/NominalFormat";
import { DetailDpaResponse } from "@/pages/penatausahaan/types";

type Props = {
    index: number;
    item: any;
    handleOpenUpdateModal: (data: DetailDpaResponse) => void;
}

const RakDetailTableInfoChild = (props: Props) => {
    const { index, item, handleOpenUpdateModal } = props
    return (
        <tr className='css--bfa-h-afw9' key={index} onClick={() => handleOpenUpdateModal(item)}>
            <td className="table-td py-2">
                <div className="container-wni-v-2fj-a css-na-fjfaw-2">
                    <div style={{ width: 450 }}>
                        <span className="inline-flex items-center">
                            <div className="container-icon-table-rak-list">
                                <FiFileText size={27} color="#4669fa" />
                            </div>
                            <div className="container-table-td-2-column">
                                <span className="text-sm text-slate-800 dark:text-slate-300 capitalize font-bold css-fa-a-wjf2">{item.nama_akun}</span>
                                <span className="txt-font-12 text-slate-300 dark:text-slate-300">{item.kode_akun}</span>
                            </div>
                        </span>
                    </div>
                </div>
            </td>
            <td className="table-td py-2">
                <div className="table-fs-rak-ja_a3">
                    <span className="inline-flex">
                        <div className="container-table-td-2-column">
                            <NominalFormat value={item.nilai} className="text-sm text-slate-800 dark:text-slate-300 capitalize font-bold css-fa-a-wjf2" displayType={'text'} prefix={'Rp'} />
                        </div>
                    </span>
                </div>
            </td>
            <td className="table-td py-2">
                <div className="table-fs-rak-ja_a3">
                    <span className="inline-flex">
                        <div className="container-table-td-2-column">
                            <NominalFormat value={item.total_rak} className="text-sm text-slate-800 dark:text-slate-300 capitalize font-bold css-fa-a-wjf2" displayType={'text'} prefix={'Rp'} />
                        </div>
                    </span>
                </div>
            </td>
            <td className="table-td py-2">
                <div className="table-fs-rak-ja_a3">
                    <span className="inline-flex">
                        <div className="container-table-td-2-column">
                            <NominalFormat value={item.selisih} className="text-sm text-slate-800 dark:text-slate-300 capitalize font-bold css-fa-a-wjf2" displayType={'text'} prefix={'Rp'} />
                        </div>
                    </span>
                </div>
            </td>

            {
                item.bulan.map((item2: any, index2: number) => {
                    return (
                        <td key={index2} className="table-td py-2">
                            <div className="table-fs-rak-ja_a3">
                                <span className="inline-flex">
                                    <div className="container-table-td-2-column">
                                        <NominalFormat value={item2} className="text-sm text-slate-800 dark:text-slate-300 capitalize font-bold css-fa-a-wjf2" displayType={'text'} prefix={'Rp'} />
                                    </div>
                                </span>
                            </div>
                        </td>
                    )
                })
            }
        </tr>
    )
};
export default RakDetailTableInfoChild;