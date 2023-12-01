import Button from '@/components/ui/Button';
import { ROLE_BENDAHARA_PENGELUARAN, ROLE_BENDAHARA_PENGELUARAN_PEMBANTU, ROLE_BENDAHARA_UMUM_DAERAH, ROLE_KUASA_BENDAHARA_UMUM_DAERAH, ROLE_KUASA_PENGGUNA_ANGGARAN, ROLE_PENGGUNA_ANGGARAN, ROLE_PPK_SKPD, ROLE_PPTK } from '@/constant/data';
import useProfile from '@/hooks/useProfile';
import { Button as ChakraButton, Divider, Menu, MenuButton, MenuDivider, MenuItem, MenuList } from '@chakra-ui/react';
import { FiCheck, FiCheckCircle, FiChevronsDown, FiEdit2, FiLock, FiPlay, FiPlusCircle, FiPrinter, FiSearch, FiTrash2, FiXCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';

type Props = {
    SelectedTab: DocumentTransactionBasicFilterType
    SelectedSubTab: NpdDocumentFilterType
    item: ResponseNpdListTypes;
    handleDeleteModal: (data: ResponseNpdListTypes) => void;
    handleVerificationModal: (data: ResponseNpdListTypes) => void;
    setToogleViewRecapModal: (toogle: boolean) => void;
    setToogleCreateRecapModal: (toogle: boolean) => void;
    setToogleLockModal: (toogle: boolean) => void;
    setSelectedData: (data: ResponseNpdListTypes) => void;
}

const ActionCondition = (props: Props) => {
    const { SelectedTab, SelectedSubTab, item, handleDeleteModal, handleVerificationModal, setToogleViewRecapModal, setSelectedData, setToogleCreateRecapModal, setToogleLockModal } = props
    const [Profile] = useProfile();

    const handleViewRecap = (item: ResponseNpdListTypes) => {
        console.log('item', item)
        setSelectedData(item)
        setToogleViewRecapModal(true)
    };

    const handleCreateRecap = (item: ResponseNpdListTypes) => {
        setSelectedData(item)
        setToogleCreateRecapModal(true)
    };

    const handleLockRecap = (item: ResponseNpdListTypes) => {
        
        setSelectedData(item)
        setToogleLockModal(true)
    };

    return (
        <div className="container-action-button" style={{ minWidth: 150 }}>
            {
                SelectedTab !== 'dihapus' ?
                    <Menu>
                        <MenuButton as={ChakraButton} rightIcon={<FiChevronsDown />}>
                            <p className='text-sm font-semibold'>Aksi</p>
                        </MenuButton>
                        <MenuList>
                            {
                                (Profile != null && Profile.id_role === ROLE_PPTK) && item.is_verifikasi_npd === 1 && item.is_validasi_npd === 1 && item.is_npd_panjar === 1 && item.kondisi_selesai === 0 && handleVerificationModal != null ?
                                    <>
                                        <MenuItem onClick={() => handleCreateRecap(item)} icon={<FiPlusCircle color='#CBD5E0' size={17} />} command='⌘T'>
                                            <p className='text-md font-semibold'>Buat Pertanggungjawaban</p>
                                        </MenuItem>

                                        <Divider />
                                        <MenuItem onClick={() => handleLockRecap(item)} icon={<FiPlusCircle color='#CBD5E0' size={17} />} command='⌘T'>
                                            <p className='text-md font-semibold'>Kunci</p>
                                        </MenuItem>
                                    </>

                                    : null
                            }

                            <MenuItem onClick={() => handleViewRecap(item)} icon={<FiSearch color='#CBD5E0' size={17} />} command='⌘T'>
                                <p className='text-md font-semibold'>Lihat Rekapitulasi</p>
                            </MenuItem>
                            <Divider />

                            {
                                (Profile != null && Profile.id_role === ROLE_PPTK) && item.is_verifikasi_npd === 1 && item.is_validasi_npd === 1 && item.is_npd_panjar === 1 && item.kondisi_selesai === 2 && handleVerificationModal != null ?
                                    <MenuItem icon={<FiPrinter color='#CBD5E0' size={17} />} command='⌘A'>
                                        <p className='text-md font-semibold'>Cetak Pengembalian</p>
                                    </MenuItem> : null
                            }

                            {
                                (Profile != null && Profile.id_role === ROLE_PPTK) && item.is_verifikasi_npd === 1 && item.is_validasi_npd === 1 && item.is_npd_panjar === 1 && item.kondisi_selesai === 1 && handleVerificationModal != null ?
                                    <MenuItem icon={<FiPrinter color='#CBD5E0' size={17} />} command='⌘D'>
                                        <p className='text-md font-semibold'>Cetak Permintaan Kurang Bayar</p>
                                    </MenuItem> : null
                            }

{
                                (Profile != null && Profile.id_role === ROLE_PPTK) && item.is_verifikasi_npd === 1 && item.is_validasi_npd === 1 && item.is_npd_panjar === 1 && (item.kondisi_selesai === 2 || item.kondisi_selesai === 3) && handleVerificationModal != null ?
                                    <MenuItem icon={<FiPrinter color='#CBD5E0' size={17} />} command='⌘C'>
                                        <p className='text-md font-semibold'>Cetak Nihil</p>
                                    </MenuItem> : null
                            }
                        </MenuList>
                    </Menu> :
                    <Button disabled className="btn btn-light">Aksi</Button>
            }
        </div>
    )
};
export default ActionCondition;