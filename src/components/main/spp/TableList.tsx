import { FiCalendar, FiGrid, FiShoppingBag } from "react-icons/fi";
import { useState } from 'react';
import SidebarTooltip from "@/components/ui/SidebarTooltip";
import { LimitString, checkJenisLs } from "@/utils/stringConverter";
import { DateTime } from "luxon";
import PaginationFrontend from "@/components/ui/PaginationFrontend";
import RowImage from "@/components/main/tables/RowImage";
import RowIcon from "@/components/main/tables/RowIcon";
import RowRupiahIcon from "@/components/main/tables/RowRupiahIcon";
import ValidationCondition from "@/components/main/spp/ValidationCondition";
import ActionCondition from "@/components/main/spp/ActionCondition";
import ScrollableTable from "@/components/main/tables/ScrollableTable";
import Motion from "../tables/Motion";
import NoDataFound from "@/components/NoDataFound";

type Props = {
    ActiveTab: DocumentTransactionBasicFilterType;
    ActivePage: DocumentTransactionBasicType;
    data: SppPembuatanListType[]
    handleDeleteModal?: (data: SppPembuatanListType) => void
    handleOpenUnverifikasiModal?: (data: SppPembuatanListType) => void;
    handleOpenVerifikasiModal?: (data: SppPembuatanListType) => void;
}

const TableList = (props: Props) => {
    const { ActiveTab, ActivePage, data, handleDeleteModal, handleOpenUnverifikasiModal, handleOpenVerifikasiModal } = props
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
                                        {
                                            ActiveTab === 'ditolak' ?
                                                <th className="table-th table-thd">ALASAN PENOLAKAN</th> : null
                                        }
                                        <th className="table-th table-thd">STATUS</th>
                                        <th className="table-th table-thd">JENIS SURAT</th>
                                        <th className="table-th table-thd">TANGGAL TERBIT</th>
                                        <th className="table-th table-thd">TUJUAN PEMBAYARAN</th>
                                        <th className="table-th table-thd">NILAI YANG DIAJUKAN</th>
                                        <th className="table-th"></th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700 ">
                                    {
                                        data.map((item: SppPembuatanListType, index: number) => {
                                            return (
                                                <tr style={{ display: (index >= (currentPage - 1) * PerPage && index < currentPage * PerPage) ? '' : 'none' }} key={index}>
                                                    <td className="table-td py-2">
                                                        <RowImage
                                                            title={item.nomor_spp}
                                                            desc={`Dibuat Pada: ${DateTime.fromISO(item.created_at).setLocale('id').toFormat('dd LLLL yyyy')}`}
                                                            image={"/assets/images/21948365_4300_7.webp"}
                                                        />
                                                    </td>
                                                    {
                                                        ActiveTab === 'ditolak' ?
                                                            <td className="table-td py-2" >
                                                                {
                                                                    item.keterangan_spp.length > 47 ?
                                                                        <SidebarTooltip
                                                                            title={
                                                                                <span className="inline-flex items-center" style={{ width: 250 }}>
                                                                                    <div className="container-table-td-2-column">
                                                                                        <span className="text-sm text-slate-800 dark:text-slate-300 capitalize font-bold">{LimitString(item.keterangan_verifikasi_spp, 47)}</span>
                                                                                    </div>
                                                                                </span>
                                                                            }
                                                                            className=""
                                                                            content={item.keterangan_verifikasi_spp}
                                                                            placement="top"
                                                                            arrow
                                                                        /> :
                                                                        <span className="inline-flex items-center" style={{ width: 250 }}>
                                                                            <div className="container-table-td-2-column">
                                                                                <span className="text-sm text-slate-800 dark:text-slate-300 capitalize font-bold">{item.keterangan_verifikasi_spp || '-'}</span>
                                                                            </div>
                                                                        </span>
                                                                }
                                                            </td>
                                                            : null
                                                    }

                                                    <td className="table-td py-2">
                                                        <ValidationCondition status={item.is_verifikasi_spp} />
                                                    </td>

                                                    <td className="table-td py-2">
                                                        <RowIcon
                                                            title={`${item.jenis_spp} ${checkJenisLs(item.jenis_ls_spp)}`}
                                                            icon={<FiGrid size={25} color="#50C793" />}
                                                            minWidth={200}
                                                        />
                                                    </td>



                                                    <td className="table-td py-2">
                                                        <RowIcon
                                                            title={`${DateTime.fromISO(item.tanggal_spp).setLocale('id').toFormat('dd LLLL yyyy')}`}
                                                            icon={<FiCalendar size={25} color="#00ADB5" />}
                                                            minWidth={200}
                                                        />
                                                    </td>
                                                    <td className="table-td py-2" >
                                                        {
                                                            item.keterangan_spp.length > 47 ?
                                                                <SidebarTooltip
                                                                    title={
                                                                        <span className="inline-flex items-center" style={{ width: 250 }}>
                                                                            <div className="container-table-td-2-column">
                                                                                <span className="text-sm text-slate-800 dark:text-slate-300 capitalize font-bold">{LimitString(item.keterangan_spp, 47)}</span>
                                                                            </div>
                                                                        </span>
                                                                    }
                                                                    className=""
                                                                    content={item.keterangan_spp}
                                                                    placement="top"
                                                                    arrow
                                                                /> :
                                                                <span className="inline-flex items-center" style={{ width: 250 }}>
                                                                    <div className="container-table-td-2-column">
                                                                        <span className="text-sm text-slate-800 dark:text-slate-300 capitalize font-bold">{item.keterangan_spp}</span>
                                                                    </div>
                                                                </span>
                                                        }
                                                    </td>
                                                    <td className="table-td py-2">
                                                        <RowRupiahIcon
                                                            title={item.nilai_spp}
                                                            icon={<FiShoppingBag size={25} color="#4669fa" />}
                                                            minWidth={200}
                                                        />
                                                    </td>


                                                    <td>
                                                        <ActionCondition
                                                            ActivePage={ActivePage}
                                                            ActiveTab={ActiveTab}
                                                            item={item}
                                                            handleDeleteModal={handleDeleteModal}
                                                            handleOpenUnverifikasiModal={handleOpenUnverifikasiModal}
                                                            handleOpenVerifikasiModal={handleOpenVerifikasiModal}
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