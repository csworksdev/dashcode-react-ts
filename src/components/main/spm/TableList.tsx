import NominalFormat from "@/components/main/NominalFormat";
import { FiCalendar, FiCheckCircle, FiChevronsDown, FiClock, FiGrid, FiPrinter, FiShoppingBag, FiTrash2, FiXCircle } from "react-icons/fi";
import { Button as ChakraButton, Menu, MenuButton, MenuDivider, MenuItem, MenuList } from '@chakra-ui/react';
import { useState } from 'react';
import SidebarTooltip from "@/components/ui/SidebarTooltip";
import { LimitString, checkJenisLs } from "@/utils/stringConverter";
import { Link } from "react-router-dom";
import DeleteConfirmationModal from "@/components/main/DeleteConfirmationModal";
import toast from "react-hot-toast";
import useProfile from "@/hooks/useProfile";
import { ROLE_PPK_SKPD } from "@/constant/data";
import { deleteSpmPembuatan } from "@/api/penatausahaan/spm";
import { DateTime } from "luxon";
import PaginationFrontend from "@/components/ui/PaginationFrontend";
import Button from "@/components/ui/Button";
import ScrollableTable from "@/components/main/tables/ScrollableTable";
import RowImage from "../tables/RowImage";
import RowIcon from "../tables/RowIcon";
import RowRupiahIcon from "../tables/RowRupiahIcon";
import ValidationCondition from "./ValidationCondition";
import ActionCondition from "./ActionCondition";
import Motion from "../tables/Motion";
import NoDataFound from "@/components/NoDataFound";

type Props = {
    ActiveTab: DocumentTransactionBasicFilterType;
    SelectedTab: DocumentTransactionBasicFilterType
    data: SpmPembuatanListType[]
    handleGetData: (tab: DocumentTransactionBasicFilterType, type: DocumentTransactionBasicType) => void
    handleDeleteModal?: (data: SpmPembuatanListType) => void
    handleOpenUnverifikasiModal?: (data: SpmPembuatanListType) => void;
    handleOpenVerifikasiModal?: (data: SpmPembuatanListType) => void;
}

const TableList = (props: Props) => {
    const { SelectedTab, ActiveTab, data, handleGetData, handleDeleteModal, handleOpenUnverifikasiModal, handleOpenVerifikasiModal } = props
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
                                        {/* <th className="table-th table-thd">NOMOR SPP</th> */}
                                        <th className="table-th table-thd">JENIS SURAT</th>
                                        <th className="table-th table-thd">TANGGAL TERBIT</th>
                                        <th className="table-th table-thd">STATUS</th>
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
                                        data.map((item: SpmPembuatanListType, index: number) => {
                                            return (
                                                <tr key={index}>
                                                    <td className="table-td py-2">
                                                        <SidebarTooltip
                                                            // theme="light-border"
                                                            interactive={true}
                                                            title={
                                                                <RowImage
                                                                    title={item.nomor_spm}
                                                                    desc={`Dibuat Pada: ${DateTime.fromISO(item.created_at).setLocale('id').toFormat('dd LLLL yyyy')}`}
                                                                    image={"/assets/images/spm-min.webp"}
                                                                />
                                                            }
                                                            className=""
                                                            animation="scale"
                                                            content={
                                                                <div className="p-3">
                                                                    <p className="font-12 text-center">Surat Perintah Membayar (SPM) ini diterbitkan otomatis pada saat pembuatan Surat Permintaan Pembayaran (SPP)</p>
                                                                    <Link to={'/penatausahaan/pengeluaran/spp/pembuatan?type=UP'}>
                                                                        <div className="mt-3 text-center">
                                                                            <span className="inline-flex items-center">
                                                                                <span className=" ltr:mr-3 rtl:ml-3 flex-none">
                                                                                    <img src="/assets/images/21948365_4300_7.webp" width={30} alt={item.nomor_spp} className="object-cover rounded-md" />
                                                                                </span>
                                                                                <div className="container-table-td-2-column">
                                                                                    <span className="font-bold font-12">{item.nomor_spp || '-'}</span>
                                                                                    <span style={{ fontSize: 8 }} className="text-slate-300 dark:text-slate-300">Surat Permintaan Pembayaran (SPP) Terkait</span>
                                                                                </div>
                                                                            </span>
                                                                        </div>
                                                                    </Link>
                                                                </div>
                                                            }
                                                            maxWidth={500}
                                                            placement="top"
                                                            arrow
                                                        />
                                                    </td>

                                                    <td className="table-td py-2">
                                                        <RowIcon
                                                            title={`${item.jenis_spm} ${checkJenisLs(item.jenis_ls_spm)}`}
                                                            icon={<FiGrid size={25} color="#50C793" />}
                                                            minWidth={200}
                                                        />
                                                    </td>

                                                    <td className="table-td py-2">
                                                        <RowIcon
                                                            title={`${DateTime.fromISO(item.tanggal_spm).setLocale('id').toFormat('dd LLLL yyyy')}`}
                                                            icon={<FiCalendar size={25} color="#00ADB5" />}
                                                            minWidth={200}
                                                        />
                                                    </td>

                                                    <td className="table-td py-2">
                                                        <ValidationCondition status={item.is_verifikasi_spm} />
                                                    </td>

                                                    <td className="table-td py-2" >
                                                        {
                                                            item.keterangan_spm.length > 47 ?
                                                                <SidebarTooltip
                                                                    title={
                                                                        <span className="inline-flex items-center" style={{ width: 250 }}>
                                                                            <div className="container-table-td-2-column">
                                                                                <span className="text-sm text-slate-800 dark:text-slate-300 capitalize font-bold">{LimitString(item.keterangan_spm, 47)}</span>
                                                                            </div>
                                                                        </span>
                                                                    }
                                                                    className=""
                                                                    content={item.keterangan_spm}
                                                                    placement="top"
                                                                    arrow
                                                                /> :
                                                                <span className="inline-flex items-center" style={{ width: 250 }}>
                                                                    <div className="container-table-td-2-column">
                                                                        <span className="text-sm text-slate-800 dark:text-slate-300 capitalize font-bold">{item.keterangan_spm}</span>
                                                                    </div>
                                                                </span>
                                                        }
                                                    </td>

                                                    {
                                                        SelectedTab === 'ditolak' ?
                                                            <td className="table-td py-2" >
                                                                {
                                                                    item.keterangan_verifikasi_spm.length > 47 ?
                                                                        <SidebarTooltip
                                                                            title={
                                                                                <span className="inline-flex items-center" style={{ width: 250 }}>
                                                                                    <div className="container-table-td-2-column">
                                                                                        <span className="text-sm text-slate-800 dark:text-slate-300 capitalize font-bold">{LimitString(item.keterangan_verifikasi_spm, 47)}</span>
                                                                                    </div>
                                                                                </span>
                                                                            }
                                                                            className=""
                                                                            content={item.keterangan_verifikasi_spm}
                                                                            placement="top"
                                                                            arrow
                                                                        /> :
                                                                        <span className="inline-flex items-center" style={{ width: 250 }}>
                                                                            <div className="container-table-td-2-column">
                                                                                <span className="text-sm text-slate-800 dark:text-slate-300 capitalize font-bold">{item.keterangan_verifikasi_spm}</span>
                                                                            </div>
                                                                        </span>
                                                                }
                                                            </td> : null
                                                    }

                                                    <td className="table-td py-2">
                                                        <RowRupiahIcon
                                                            title={item.nilai_spm}
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