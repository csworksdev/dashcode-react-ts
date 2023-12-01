import { FiCalendar, FiShoppingBag } from "react-icons/fi";
import { useState } from 'react';
import { LimitString } from "@/utils/stringConverter";
import { DateTime } from "luxon";
import SidebarTooltip from "@/components/ui/SidebarTooltip";
import PaginationFrontend from "@/components/ui/PaginationFrontend";
import ScrollableTable from "@/components/main/tables/ScrollableTable";
import RowImage from "../tables/RowImage";
import RowIcon from "../tables/RowIcon";
import RowRupiahIcon from "../tables/RowRupiahIcon";
import ValidationCondition from "./ValidationCondition";
import ActionCondition from "./ActionCondition";
import ViewRecap from "./ViewRecap";
import CreateRecap from "./CreateRecap";
import LockRecap from "./LockRecap";
import Motion from "../tables/Motion";

type Props = {
    data: ResponseNpdListTypes[]
    SelectedTab: DocumentTransactionBasicFilterType
    SelectedSubTab: NpdDocumentFilterType
    handleDeleteModal: (item: ResponseNpdListTypes) => void
    handleVerificationModal: (item: ResponseNpdListTypes) => void
    handleGetData: (tab: any) => void
}

const TableList = (props: Props) => {
    const { data, SelectedTab, SelectedSubTab, handleDeleteModal, handleVerificationModal, handleGetData } = props
    const [currentPage, setCurrentPage] = useState(1);
    const [ToogleViewRecapModal, setToogleViewRecapModal] = useState<boolean>(false);
    const [ToogleCreateRecapModal, setToogleCreateRecapModal] = useState<boolean>(false);
    const [ToogleLockModal, setToogleLockModal] = useState<boolean>(false);
    const [SelectedData, setSelectedData] = useState<ResponseNpdListTypes>();
    const [PerPage, setPerPage] = useState<number>(10);

    return (
        <>
            <Motion>
                <>
                    <ScrollableTable>
                        <thead>
                            <tr>
                                <th className="table-th table-thd">NOMOR NPD</th>
                                <th className="table-th table-thd">TANGGAL</th>
                                <th className="table-th table-thd">SUB SKPD</th>
                                <th className="table-th table-thd">NILAI</th>
                                <th className="table-th table-thd">KETERANGAN</th>
                                {/* <th className="table-th table-thd">PERSETUJUAN PA / KPA</th>
                                <th className="table-th table-thd">VALIDASI BP / BPP</th> */}
                                <th className="table-th"></th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700 ">
                            {
                                data.map((item: ResponseNpdListTypes, index: number) => {
                                    return (
                                        <tr key={index}>
                                            <td className="table-td py-2">
                                                <RowImage
                                                    title={item.nomor_npd}
                                                    desc={`Dibuat Pada: ${DateTime.fromISO(item.tanggal_npd).setLocale('id').toFormat('dd LLLL yyyy')}`}
                                                    image={"/assets/images/general/rekapitulasi-npd.png"}
                                                />
                                            </td>
                                            <td className="table-td py-2">
                                                <RowIcon
                                                    title={`${DateTime.fromISO(item.tanggal_npd).setLocale('id').toFormat('dd LLLL yyyy')}`}
                                                    icon={<FiCalendar size={25} color="#00ADB5" />}
                                                    minWidth={200}
                                                />
                                            </td>
                                            <td className="table-td py-2">
                                                <RowImage
                                                    title={item.nama_sub_skpd}
                                                    image={"/assets/images/aMHhm8fp7D8EO347U.min.webp"}
                                                />
                                            </td>
                                            <td className="table-td py-2">
                                                <RowRupiahIcon
                                                    title={item.nilai_npd}
                                                    icon={<FiShoppingBag size={25} color="#4669fa" />}
                                                    minWidth={200}
                                                />
                                            </td>
                                            <td className="table-td py-2" >
                                                {
                                                    item.keterangan_npd.length > 47 ?
                                                        <SidebarTooltip
                                                            title={
                                                                <span className="inline-flex items-center" style={{ width: 250 }}>
                                                                    <div className="container-table-td-2-column">
                                                                        <span className="text-sm text-slate-800 dark:text-slate-300 capitalize font-bold">{LimitString(item.keterangan_npd, 47)}</span>
                                                                    </div>
                                                                </span>
                                                            }
                                                            className=""
                                                            content={item.keterangan_npd}
                                                            placement="top"
                                                            arrow
                                                        /> :
                                                        <span className="inline-flex items-center" style={{ width: 250 }}>
                                                            <div className="container-table-td-2-column">
                                                                <span className="text-sm text-slate-800 dark:text-slate-300 capitalize font-bold">{item.keterangan_npd}</span>
                                                            </div>
                                                        </span>
                                                }
                                            </td>
                                            {/* <td className="table-td py-2">
                                                <ValidationCondition text={'setujui'} status={item.is_verifikasi_npd} />
                                            </td>
                                            <td className="table-td py-2">
                                                <ValidationCondition text={'validasi'} status={item.is_validasi_npd} />
                                            </td> */}
                                            <td>
                                                <ActionCondition
                                                    SelectedTab={SelectedTab}
                                                    SelectedSubTab={SelectedSubTab}
                                                    item={item}
                                                    handleDeleteModal={handleDeleteModal}
                                                    handleVerificationModal={handleVerificationModal}
                                                    setToogleViewRecapModal={setToogleViewRecapModal}
                                                    setToogleCreateRecapModal={setToogleCreateRecapModal}
                                                    setToogleLockModal={setToogleLockModal}
                                                    setSelectedData={setSelectedData}
                                                />
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </ScrollableTable>

                    <PaginationFrontend
                        currentPage={Number(currentPage)}
                        setCurrentPage={setCurrentPage}
                        perPage={PerPage}
                        setPerPage={setPerPage}
                        data={[1, 2, 3]}
                    />

                    {
                        SelectedData != null ?
                            <>
                                <ViewRecap SelectedData={SelectedData} ToogleViewRecapModal={ToogleViewRecapModal} setToogleViewRecapModal={setToogleViewRecapModal} />
                                <CreateRecap SelectedData={SelectedData} ToogleViewRecapModal={ToogleCreateRecapModal} setToogleViewRecapModal={setToogleCreateRecapModal} />
                                <LockRecap handleGetData={handleGetData} SelectedData={SelectedData} ToogleViewRecapModal={ToogleLockModal} setToogleViewRecapModal={setToogleLockModal} />
                            </>
                            : null
                    }
                </>
            </Motion>


        </>
    )
};
export default TableList;