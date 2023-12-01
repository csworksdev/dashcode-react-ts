import { ResponseListPelimpahanUpGuType } from "@/pages/penatausahaan/routes/pengeluaran/pelimpahan-up-gu/types";
import ScrollableTable from "../tables/ScrollableTable";
import { FiCalendar, FiChevronsDown, FiCodesandbox, FiFastForward, FiGitPullRequest, FiPocket, FiSearch, FiShoppingBag } from "react-icons/fi";
import { Button as ChakraButton, Menu, MenuButton, MenuDivider, MenuItem, MenuList } from '@chakra-ui/react';
import NominalFormat from "../NominalFormat";
import useProfile from "@/hooks/useProfile";
import { ROLE_BENDAHARA_PENGELUARAN_PEMBANTU } from "@/constant/data";
import NoDataFound from "@/components/NoDataFound";
import TableShimmer from "@/components/skeleton/TableShimmer";
import { DateTime } from "luxon";
import RowIcon from "../tables/RowIcon";
import RowImage from "../tables/RowImage";
import RowRupiahIcon from "../tables/RowRupiahIcon";

type Props = {
    data: ResponseListPelimpahanUpGuType[] | undefined
    IsLoading: boolean
    handleOpenTarikTunai: (item: ResponseListPelimpahanUpGuType) => void
    handleOpenPelimpahan: (item: ResponseListPelimpahanUpGuType) => void
}

const TableBp = (props: Props) => {
    const { data, IsLoading, handleOpenTarikTunai, handleOpenPelimpahan } = props
    const [Profile] = useProfile();
    return (
        <>
            {
                !IsLoading ?
                    data != null && data.length > 0 ?
                        <ScrollableTable>
                            <thead>
                                <tr>
                                    {/* <th className="table-th table-thd">Nomor SP2D</th> */}
                                    <th className="table-th table-thd">Tanggal Transaksi Terakhir</th>
                                    <th className="table-th table-thd">Nama</th>
                                    <th className="table-th table-thd">Saldo Bank</th>
                                    <th className="table-th table-thd">Saldo Tunai</th>
                                    <th className="table-th table-thd">Total Saldo</th>
                                    <th className="table-th table-thd"></th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700 ">
                                {
                                    data.map((item: ResponseListPelimpahanUpGuType, index: number) => {
                                        return (
                                            <tr key={index}>
                                                <td className="table-td py-2">
                                                    <RowIcon
                                                        title={`${DateTime.fromISO(item.tanggal_transaksi_akhir).setLocale('id').toFormat('dd LLLL yyyy')}`}
                                                        icon={<FiCalendar size={25} color="#50C793" />}
                                                        minWidth={200}
                                                    />
                                                </td>
                                                <td className="table-td py-2">
                                                    <RowImage
                                                        title={item.nama_bp}
                                                        image={"/assets/images/tMkNdxbELY.min.webp"}
                                                    />
                                                </td>
                                                <td className="table-td py-2">
                                                    <RowRupiahIcon
                                                        title={item.saldo_bank}
                                                        icon={<FiPocket size={25} color="#4669fa" />}
                                                        minWidth={200}
                                                    />
                                                </td>
                                                <td className="table-td py-2">
                                                    <RowRupiahIcon
                                                        title={item.saldo_tunai}
                                                        icon={<FiShoppingBag size={25} color="#FF2E63" />}
                                                        minWidth={200}
                                                    />
                                                </td>
                                                <td className="table-td py-2">
                                                    <RowRupiahIcon
                                                        title={item.saldo_total}
                                                        icon={<FiCodesandbox size={25} color="#2B2E4A" />}
                                                        minWidth={200}
                                                    />
                                                </td>
                                                <td className="table-td py-2">
                                                    {
                                                        Profile != null && Profile.id_role === ROLE_BENDAHARA_PENGELUARAN_PEMBANTU ?
                                                            null :
                                                            <Menu>

                                                                <MenuButton as={ChakraButton} rightIcon={<FiChevronsDown />}>
                                                                    <p className='text-sm font-semibold'>Aksi</p>
                                                                </MenuButton>
                                                                <MenuList>
                                                                    {
                                                                        Profile != null && Profile.id_role === ROLE_BENDAHARA_PENGELUARAN_PEMBANTU ?
                                                                            <>
                                                                            
                                                                            </> :
                                                                            <>
                                                                                {/* <MenuItem onClick={() => handleOpenTarikTunai(item)} icon={<FiSearch color='#CBD5E0' size={17} />} command='⌘T'>
                                                                                    <p className='text-md font-semibold'>Lihat Riwayat</p>
                                                                                </MenuItem>
                                                                                <MenuDivider /> */}
                                                                                <MenuItem onClick={() => handleOpenTarikTunai(item)} icon={<FiGitPullRequest color='#CBD5E0' size={17} />} command='⌘T'>
                                                                                    <p className='text-md font-semibold'>Tarik Tunai</p>
                                                                                </MenuItem>
                                                                                <MenuDivider />
                                                                                <MenuItem onClick={() => handleOpenPelimpahan(item)} icon={<FiFastForward color='#CBD5E0' size={17} />} command='⌘T'>
                                                                                    <p className='text-md font-semibold'>Limpahkan ke BPP</p>
                                                                                </MenuItem>
                                                                            </>
                                                                    }
                                                                </MenuList>
                                                            </Menu>
                                                    }

                                                </td>
                                            </tr>
                                        )
                                    })
                                }

                            </tbody>
                        </ScrollableTable>
                        : <NoDataFound />
                    : <TableShimmer />
            }
        </>
    )
};
export default TableBp;