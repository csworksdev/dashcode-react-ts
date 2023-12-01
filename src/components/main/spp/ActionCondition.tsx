import Button from '@/components/ui/Button';
import { ROLE_BENDAHARA_PENGELUARAN, ROLE_BENDAHARA_PENGELUARAN_PEMBANTU, ROLE_PPK_SKPD } from '@/constant/data';
import useProfile from '@/hooks/useProfile';
import { Button as ChakraButton, Menu, MenuButton, MenuDivider, MenuItem, MenuList } from '@chakra-ui/react';
import { FiCheckCircle, FiChevronsDown, FiPrinter, FiTrash2, FiXCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';

type Props = {
    ActivePage: DocumentTransactionBasicType;
    ActiveTab: DocumentTransactionBasicFilterType;
    item: SppPembuatanListType;
    handleDeleteModal?: (data: SppPembuatanListType) => void;
    handleOpenUnverifikasiModal?: (data: SppPembuatanListType) => void;
    handleOpenVerifikasiModal?: (data: SppPembuatanListType) => void;
}

const ActionCondition = (props: Props) => {
    const { ActivePage, ActiveTab, item, handleDeleteModal, handleOpenUnverifikasiModal, handleOpenVerifikasiModal } = props
    const [Profile] = useProfile();

    return (
        <div className="container-action-button" style={{ width: 150 }}>
            {
                ActiveTab !== 'ditolak' && ActiveTab !== 'dihapus' ?
                    <Menu>
                        <MenuButton as={ChakraButton} variant='outline' rightIcon={<><FiChevronsDown /></>}>
                            <p className='text-sm font-semibold'>Aksi</p>
                        </MenuButton>
                        <MenuList>
                            {
                                Profile != null && Profile.id_role === ROLE_PPK_SKPD ?
                                    item.is_verifikasi_spp === 1 && handleOpenUnverifikasiModal != null ?
                                        <MenuItem onClick={() => handleOpenUnverifikasiModal(item)} icon={<FiXCircle color='#CBD5E0' size={17} />} command='⌘T'>
                                            <p className='text-md font-semibold'>Batalkan Verifikasi</p>
                                        </MenuItem>
                                        :
                                        (item.is_verifikasi_spp === 2 || item.is_verifikasi_spp === 3) ?
                                            null :
                                            <MenuItem onClick={() => handleOpenVerifikasiModal != null ? handleOpenVerifikasiModal(item) : null} icon={<FiCheckCircle color='#CBD5E0' size={17} />} command='⌘T'>
                                                <p className='text-md font-semibold'>Verifikasi</p>
                                            </MenuItem> : null
                            }

                            {
                                Profile != null && (Profile.id_role === ROLE_BENDAHARA_PENGELUARAN_PEMBANTU || Profile.id_role === ROLE_BENDAHARA_PENGELUARAN) && item.is_verifikasi_spp === 0 ?
                                    <>
                                        {
                                            handleDeleteModal != null ?
                                                <MenuItem onClick={() => handleDeleteModal(item)} icon={<FiTrash2 color='#CBD5E0' size={17} />} command='⌘T'>
                                                    <p className='text-md font-semibold'>Hapus</p>
                                                </MenuItem> : null
                                        }
                                        <MenuDivider />
                                    </> : null
                            }
                            {
                                ActivePage === 'LS' ?
                                    <>
                                        <MenuItem as={Link} to={'/penatausahaan/pengeluaran/spp/cetak/ls/barang-jasa/' + item.id_spp} icon={<FiPrinter color='#CBD5E0' size={17} />} command='⌘T'>
                                            <p className='text-md font-semibold'>Cetak LS ({item.jenis_ls_spp === 'barangjasa' ? 'Barang dan Jasa' : 'Gaji'})</p>
                                        </MenuItem>
                                    </> :
                                    ActivePage === 'TU' ?
                                        <MenuItem as={Link} to={'/penatausahaan/pengeluaran/spp/cetak/tu/' + item.id_spp} icon={<FiPrinter color='#CBD5E0' size={17} />} command='⌘T'>
                                            <p className='text-md font-semibold'>Cetak</p>
                                        </MenuItem> :
                                        <MenuItem as={Link} to={'/penatausahaan/pengeluaran/spp/cetak/up/' + item.id_spp} icon={<FiPrinter color='#CBD5E0' size={17} />} command='⌘T'>
                                            <p className='text-md font-semibold'>Cetak</p>
                                        </MenuItem>
                            }
                        </MenuList>
                    </Menu> :
                    <Button disabled className="btn btn-light">Aksi</Button>
            }
        </div>
    )
};
export default ActionCondition;