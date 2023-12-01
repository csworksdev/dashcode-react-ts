import { FiCalendar, FiGrid, FiShoppingBag } from "react-icons/fi";
import { useState } from 'react';
import SidebarTooltip from "@/components/ui/SidebarTooltip";
import { LimitString, checkJenisLs } from "@/utils/stringConverter";
import { DateTime } from "luxon";
import PaginationFrontend from "@/components/ui/PaginationFrontend";
import ScrollableTable from "@/components/main/tables/ScrollableTable";
import RowImage from "../tables/RowImage";
import RowIcon from "../tables/RowIcon";
import RowRupiahIcon from "../tables/RowRupiahIcon";
import ValidationCondition from "./ValidationCondition";
import ActionCondition from "./ActionCondition";
import Motion from "../tables/Motion";
import NoDataFound from "@/components/NoDataFound";
import TransferValidationCondition from "./TransferValidationCondition";

type Props = {
    ActiveTab: DocumentTransactionBasicFilterType;
    SelectedTab: DocumentTransactionBasicFilterType
    data: ListSp2dResponseType[]
    handleGetData: (tab: DocumentTransactionBasicFilterType, type: DocumentTransactionBasicType) => void
    handleDeleteModal?: (data: ListSp2dResponseType) => void
    handleOpenUnverifikasiModal?: (data: ListSp2dResponseType) => void;
    handleOpenVerifikasiModal?: (data: ListSp2dResponseType) => void;
    handleOpenTransferModal?: (data: ListSp2dResponseType) => void;
}

const TableList = (props: Props) => {
    const { SelectedTab, ActiveTab, data, handleGetData, handleDeleteModal, handleOpenUnverifikasiModal, handleOpenVerifikasiModal, handleOpenTransferModal } = props
    const [currentPage, setCurrentPage] = useState(1);
    const [PerPage, setPerPage] = useState<number>(10);

    return (
        <>
            <Motion>
                {
                    data != null && data.length > 0 ?
                        <>
                            <ScrollableTable>
                                <thead>
                                    <tr>
                                        <th className="table-th table-thd">NOMOR</th>
                                        <th className="table-th table-thd">JENIS SURAT</th>
                                        <th className="table-th table-thd">TANGGAL TERBIT</th>
                                        <th className="table-th table-thd">STATUS</th>
                                        <th className="table-thd text-center">STATUS TRANSFER</th>
                                        <th className="table-th table-thd">TUJUAN PEMBAYARAN</th>
                                        {
                                            SelectedTab === 'ditolak' ?
                                                <th className="table-th table-thd">KETERANGAN PENOLAKAN</th> :
                                                null
                                        }
                                        <th className="table-th table-thd">NILAI YANG DIAJUKAN</th>
                                        <th className="table-th table-thd">Unit SKPD</th>
                                        <th className="table-th"></th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700 ">
                                    {
                                        data.map((item: ListSp2dResponseType, index: number) => {
                                            return (
                                                <tr key={index}>
                                                    <td className="table-td py-2">
                                                        <RowImage
                                                            title={item.nomor_sp_2_d}
                                                            desc={`Dibuat Pada: ${DateTime.fromISO(item.created_at).setLocale('id').toFormat('dd LLLL yyyy')}`}
                                                            image={"/assets/images/sp2d-min.webp"}
                                                        />
                                                    </td>

                                                    <td className="table-td py-2">
                                                        <RowIcon
                                                            title={`${item.jenis_sp_2_d} ${checkJenisLs(item.jenis_ls_sp_2_d)}`}
                                                            icon={<FiGrid size={25} color="#50C793" />}
                                                            minWidth={200}
                                                        />
                                                    </td>

                                                    <td className="table-td py-2">
                                                        <RowIcon
                                                            title={`${DateTime.fromISO(item.tanggal_sp_2_d).setLocale('id').toFormat('dd LLLL yyyy')}`}
                                                            icon={<FiCalendar size={25} color="#00ADB5" />}
                                                            minWidth={200}
                                                        />
                                                    </td>

                                                    <td className="table-td py-2">
                                                        <ValidationCondition status={item.is_verifikasi_sp_2_d} />
                                                    </td>

                                                    <td className="table-td py-2">
                                                        <TransferValidationCondition status={item.is_transfer_sp_2_d} />
                                                    </td>

                                                    <td className="table-td py-2" >
                                                        {
                                                            item.keterangan_sp_2_d.length > 47 ?
                                                                <SidebarTooltip
                                                                    title={
                                                                        <span className="inline-flex items-center" style={{ width: 250 }}>
                                                                            <div className="container-table-td-2-column">
                                                                                <span className="text-sm text-slate-800 dark:text-slate-300 capitalize font-bold">{LimitString(item.keterangan_sp_2_d, 47)}</span>
                                                                            </div>
                                                                        </span>
                                                                    }
                                                                    className=""
                                                                    content={item.keterangan_sp_2_d}
                                                                    placement="top"
                                                                    arrow
                                                                /> :
                                                                <span className="inline-flex items-center" style={{ width: 250 }}>
                                                                    <div className="container-table-td-2-column">
                                                                        <span className="text-sm text-slate-800 dark:text-slate-300 capitalize font-bold">{item.keterangan_sp_2_d}</span>
                                                                    </div>
                                                                </span>
                                                        }
                                                    </td>

                                                    {
                                                        SelectedTab === 'ditolak' ?
                                                            <td className="table-td py-2" >
                                                                {
                                                                    item.keterangan_verifikasi_sp_2_d.length > 47 ?
                                                                        <SidebarTooltip
                                                                            title={
                                                                                <span className="inline-flex items-center" style={{ width: 250 }}>
                                                                                    <div className="container-table-td-2-column">
                                                                                        <span className="text-sm text-slate-800 dark:text-slate-300 capitalize font-bold">{LimitString(item.keterangan_verifikasi_sp_2_d, 47)}</span>
                                                                                    </div>
                                                                                </span>
                                                                            }
                                                                            className=""
                                                                            content={item.keterangan_verifikasi_sp_2_d}
                                                                            placement="top"
                                                                            arrow
                                                                        /> :
                                                                        <span className="inline-flex items-center" style={{ width: 250 }}>
                                                                            <div className="container-table-td-2-column">
                                                                                <span className="text-sm text-slate-800 dark:text-slate-300 capitalize font-bold">{item.keterangan_verifikasi_sp_2_d}</span>
                                                                            </div>
                                                                        </span>
                                                                }
                                                            </td> : null
                                                    }

                                                    <td className="table-td py-2">
                                                        <RowRupiahIcon
                                                            title={item.nilai_sp_2_d}
                                                            icon={<FiShoppingBag size={25} color="#4669fa" />}
                                                            minWidth={200}
                                                        />
                                                    </td>

                                                    <td className="table-td py-2">
                                                        <RowImage
                                                            title={item.nama_sub_skpd}
                                                            image={"/assets/images/aMHhm8fp7D8EO347U.min.webp"}
                                                            minWidth={230}
                                                        />
                                                    </td>
                                                    <td>
                                                        
                                                        <ActionCondition
                                                            ActiveTab={ActiveTab}
                                                            item={item}
                                                            handleDeleteModal={handleDeleteModal}
                                                            handleOpenUnverifikasiModal={handleOpenUnverifikasiModal}
                                                            handleOpenVerifikasiModal={handleOpenVerifikasiModal}
                                                            handleOpenTransferModal={handleOpenTransferModal}
                                                        />
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </ScrollableTable>

                            {
                                data != null ?
                                    <PaginationFrontend
                                        currentPage={Number(currentPage)}
                                        setCurrentPage={setCurrentPage}
                                        perPage={PerPage}
                                        setPerPage={setPerPage}
                                        data={data}
                                    /> : null
                            }
                        </> : <NoDataFound />
                }
            </Motion>
        </>
    )
};
export default TableList;