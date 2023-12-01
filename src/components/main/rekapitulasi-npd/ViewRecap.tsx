import { getListRekapitulasiNpd, getListRekapitulasiNpdDetail } from '@/api/penatausahaan/rekapitulasi-npd';
import NoDataFound from '@/components/NoDataFound';
import TableShimmer from '@/components/skeleton/TableShimmer';
import Button from '@/components/ui/Button';
import useProfile from '@/hooks/useProfile';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import ScrollableTable from '../tables/ScrollableTable';
import RowImage from '../tables/RowImage';
import { DateTime } from 'luxon';
import RowIcon from '../tables/RowIcon';
import { FiCalendar, FiChevronsDown, FiPrinter, FiShoppingBag, FiTrash2 } from 'react-icons/fi';
import RowRupiahIcon from '../tables/RowRupiahIcon';
import SidebarTooltip from '@/components/ui/SidebarTooltip';
import { LimitString } from '@/utils/stringConverter';
import NominalFormat from '../NominalFormat';
import { Button as ChakraButton, Divider, Menu, MenuButton, MenuDivider, MenuItem, MenuList } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import DeleteConfirmationModal from '../DeleteConfirmationModal';

type Props = {
    SelectedData: ResponseNpdListTypes;
    ToogleViewRecapModal: boolean;
    setToogleViewRecapModal: (toogle: boolean) => void;
}

interface ResponseRekapitulasiList {
    id_npd_rekap: number
    nomor_npd_rekap: string
    tahun: number
    id_daerah: number
    id_unit: number
    id_skpd: number
    id_sub_skpd: number
    nilai_npd_rekap: number
    tanggal_npd_rekap: string
    keterangan_npd_rekap: string
    id_npd: number
    id_tbp: number
    tbp_at: string
    tbp_by: number
    id_jadwal: number
    id_tahap: number
    status_tahap: string
    kode_tahap: string
    created_at: string
    created_by: number
    updated_at: string
    updated_by: number
    deleted_at: string
    deleted_by: number
    kode_skpd: string
    nama_skpd: string
    kode_sub_skpd: string
    nama_sub_skpd: string
}


const ViewRecap = (props: Props) => {
    const { SelectedData, ToogleViewRecapModal, setToogleViewRecapModal } = props
    const [Response, setResponse] = useState<ResponseRekapitulasiList[]>();
    const [ToogleDeleteModal, setToogleDeleteModal] = useState<boolean>(false);
    const [SelectedRekapitulasiNpd, setSelectedRekapitulasiNpd] = useState<ResponseRekapitulasiList>();
    const [IsLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        setResponse([])
        if (SelectedData != null && ToogleViewRecapModal === true) {
            handleGetData()
        }
    }, [SelectedData, ToogleViewRecapModal])

    const handleGetData = () => {
        setIsLoading(true)
        getListRekapitulasiNpdDetail(SelectedData.id_npd).then(function (res) {
            console.log('res', res)
            setResponse(res.data)
        }).finally(function () {
            setIsLoading(false)
        })
    };

    const handleDelete = (item: ResponseRekapitulasiList) => {
        setSelectedRekapitulasiNpd(item)
        setToogleDeleteModal(true)
    };

    return (
        <>
            <Modal blockScrollOnMount={false} isOpen={ToogleViewRecapModal} onClose={() => setToogleViewRecapModal(false)}>
                <ModalOverlay />
                <ModalContent maxWidth={800}>
                    <ModalHeader>Lihat Rekapitulasi</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <div className="col-span-12 mt-0 border-bottom pb-5">
                            <div className="col-span-12 mt-0">
                                <div style={{ minWidth: 300 }}>
                                    <span className="inline-flex items-center">
                                        <span className="account-user-image ltr:mr-3 rtl:ml-3 flex-none">
                                            <img src="/assets/images/general/npd.png" alt={SelectedData.nomor_npd} className="object-cover w-full h-full rounded-md" />
                                        </span>
                                        <div className="container-table-td-2-column">
                                            <span className="text-sm text-slate-800 dark:text-slate-300 capitalize font-bold">{SelectedData.nomor_npd}</span>
                                            <div className='info-rak-belanja-header'>
                                                <div className={`badge badge-primary me-2`}>
                                                    <span className='css-ncf-anw-fna-wa2'>Tanggal: {DateTime.fromISO(SelectedData.tanggal_npd).setLocale('id').toFormat('dd LLLL yyyy')}</span>
                                                </div>
                                                <div className={`badge badge-dark me-2`}>
                                                    <span className='css-ncf-anw-fna-wa2'>Nilai: <NominalFormat className="css-ncf-anw-fna-wa2" displayType='text' prefix={'Rp'} value={SelectedData.nilai_npd_disetujui} /></span>
                                                </div>
                                            </div>
                                        </div>
                                    </span>
                                </div>
                            </div>
                        </div>
                        {
                            !IsLoading ?
                                Response != null && Response.length > 0 ?
                                    <ScrollableTable>
                                        <thead>
                                            <tr>
                                                <th className="table-th table-thd">NOMOR NPD REKAP</th>
                                                <th className="table-th table-thd">TANGGAL</th>
                                                <th className="table-th table-thd">NILAI</th>
                                                <th className="table-th table-thd">KETERANGAN</th>
                                                <th className="table-th"></th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700 ">
                                            {
                                                Response.map((item: ResponseRekapitulasiList, index: number) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td className="table-td py-2">
                                                                <RowImage
                                                                    title={item.nomor_npd_rekap}
                                                                    desc={`Dibuat Pada: ${DateTime.fromISO(item.created_at).setLocale('id').toFormat('dd LLLL yyyy')}`}
                                                                    image={"/assets/images/general/rekapitulasi-npd.png"}
                                                                />
                                                            </td>
                                                            <td className="table-td py-2">
                                                                <RowIcon
                                                                    title={`${DateTime.fromISO(item.tanggal_npd_rekap).setLocale('id').toFormat('dd LLLL yyyy')}`}
                                                                    icon={<FiCalendar size={25} color="#00ADB5" />}
                                                                    minWidth={200}
                                                                />
                                                            </td>
                                                            <td className="table-td py-2">
                                                                <RowRupiahIcon
                                                                    title={item.nilai_npd_rekap}
                                                                    icon={<FiShoppingBag size={25} color="#4669fa" />}
                                                                    minWidth={200}
                                                                />
                                                            </td>
                                                            <td className="table-td py-2" >
                                                                {
                                                                    item.keterangan_npd_rekap.length > 47 ?
                                                                        <SidebarTooltip
                                                                            title={
                                                                                <span className="inline-flex items-center" style={{ width: 250 }}>
                                                                                    <div className="container-table-td-2-column">
                                                                                        <span className="text-sm text-slate-800 dark:text-slate-300 capitalize font-bold">{LimitString(item.keterangan_npd_rekap, 47)}</span>
                                                                                    </div>
                                                                                </span>
                                                                            }
                                                                            className=""
                                                                            content={item.keterangan_npd_rekap}
                                                                            placement="top"
                                                                            arrow
                                                                        /> :
                                                                        <span className="inline-flex items-center" style={{ width: 250 }}>
                                                                            <div className="container-table-td-2-column">
                                                                                <span className="text-sm text-slate-800 dark:text-slate-300 capitalize font-bold">{item.keterangan_npd_rekap}</span>
                                                                            </div>
                                                                        </span>
                                                                }
                                                            </td>
                                                            <td>
                                                                <Menu>
                                                                    <MenuButton as={ChakraButton} rightIcon={<FiChevronsDown />}>
                                                                        <p className='text-sm font-semibold'>Aksi</p>
                                                                    </MenuButton>
                                                                    <MenuList>
                                                                        <MenuItem as={Link} to={'/penatausahaan/pengeluaran/pengajuan/npd/cetak/1'} icon={<FiPrinter color='#CBD5E0' size={17} />} command='⌘T'>
                                                                            <p className='text-md font-semibold'>Cetak</p>
                                                                        </MenuItem>

                                                                        <Divider />
                                                                        <MenuItem onClick={() => handleDelete(item)} icon={<FiTrash2 color='#CBD5E0' size={17} />} command='⌘T'>
                                                                            <p className='text-md font-semibold'>Hapus</p>
                                                                        </MenuItem>

                                                                    </MenuList>
                                                                </Menu>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }

                                        </tbody>
                                    </ScrollableTable>
                                    : <NoDataFound /> : <TableShimmer />
                        }

                        {
                            SelectedRekapitulasiNpd != null ?
                            <DeleteConfirmationModal
                                params={SelectedRekapitulasiNpd}
                                ToogleModal={ToogleDeleteModal}
                                setToogleModal={setToogleDeleteModal}
                                deleteAction={handleDelete}
                                title="Apakah anda yakin ingin menghapus Rekapitulasi NPD ini?"
                                deletedText={SelectedRekapitulasiNpd?.nomor_npd_rekap}
                                isLoding={IsLoading}
                            /> : null
                        }


                    </ModalBody>
                    <ModalFooter>
                        {/* <Button type="button" isLoading={IsLoading} onClick={() => handleValidasi()} className="btn btn-success me-2 border">Validasi Sekarang</Button> */}
                        <Button
                            type="button"
                            onClick={() => setToogleViewRecapModal(false)}
                            className="btn border"
                        >Batalkan</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
};
export default ViewRecap;