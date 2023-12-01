import Button from '@/components/ui/Button';
import { ROLE_KUASA_BENDAHARA_UMUM_DAERAH, ROLE_PPK_SKPD } from '@/constant/data';
import useProfile from '@/hooks/useProfile';
import { Button as ChakraButton, Menu, MenuButton, MenuDivider, MenuItem, MenuList } from '@chakra-ui/react';
import { FiCheck, FiChevronsDown, FiEdit2, FiPlay, FiPrinter, FiTrash2, FiXCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';

type Props = {
    ActiveTab: DocumentTransactionBasicFilterType;
    item: ListSp2dResponseType;
    handleDeleteModal?: (data: ListSp2dResponseType) => void;
    handleOpenUnverifikasiModal?: (data: ListSp2dResponseType) => void;
    handleOpenVerifikasiModal?: (data: ListSp2dResponseType) => void;
    handleOpenTransferModal?: (data: ListSp2dResponseType) => void;
}

const ActionCondition = (props: Props) => {
    const { ActiveTab, item, handleDeleteModal, handleOpenUnverifikasiModal, handleOpenVerifikasiModal, handleOpenTransferModal } = props
    const [Profile] = useProfile();

    return (
        <div className="container-action-button" style={{ minWidth: 150 }}>
            {
                item.is_verifikasi_sp_2_d === 1 && item.is_transfer_sp_2_d === 0 && handleOpenTransferModal != null ?
                    <Button onClick={() => handleOpenTransferModal(item)} icon={<FiPlay size={15} />} className="btn btn-success btn-sm me-2">Transfer Dana</Button> :
                    null
            }
            {
                ActiveTab !== 'dihapus' && item.is_verifikasi_sp_2_d !== 3 ?
                    <Menu>
                        <MenuButton as={ChakraButton} variant='outline' rightIcon={<FiChevronsDown />}>
                            <p className='text-sm font-semibold'>Aksi</p>
                        </MenuButton>
                        <MenuList>

                            {
                                Profile != null && Profile.id_role === ROLE_KUASA_BENDAHARA_UMUM_DAERAH && item.is_verifikasi_sp_2_d === 0 ?
                                    <>
                                        <Link to={'/penatausahaan/pengeluaran/sp2d/pembuatan/update/' + item.id_sp_2_d}>
                                            <MenuItem icon={<FiEdit2 color='#CBD5E0' size={17} />} command='⌘T'>
                                                <p className='text-md font-semibold'>Perbarui</p>
                                            </MenuItem>
                                        </Link>
                                        {
                                            handleDeleteModal != null ?
                                                <MenuItem onClick={() => handleDeleteModal(item)} icon={<FiTrash2 color='#CBD5E0' size={17} />} command='⌘T'>
                                                    <p className='text-md font-semibold'>Hapus</p>
                                                </MenuItem> : null
                                        }
                                        {/* <MenuDivider /> */}
                                    </> : null
                            }

                            {
                                item.jenis_sp_2_d === 'LS' ?
                                    <>
                                        <MenuItem as={Link} to={'/penatausahaan/pengeluaran/sp2d/cetak/ls/barang-jasa/' + item.id_sp_2_d} icon={<FiPrinter color='#CBD5E0' size={17} />} command='⌘T'>
                                            <p className='text-md font-semibold'>Cetak</p>
                                        </MenuItem>
                                    </> :
                                    <MenuItem as={Link} to={'/penatausahaan/pengeluaran/sp2d/cetak/up/' + item.id_sp_2_d} icon={<FiPrinter color='#CBD5E0' size={17} />} command='⌘T'>
                                        <p className='text-md font-semibold'>Cetak</p>
                                    </MenuItem>
                            }
                            {
                                Profile != null && Profile.id_role === ROLE_KUASA_BENDAHARA_UMUM_DAERAH && window.location.pathname === '/penatausahaan/pengeluaran/sp2d/validasi' ?
                                    <>
                                        <>
                                            {
                                                item.is_verifikasi_sp_2_d === 1 ?
                                                    <MenuItem onClick={() => handleOpenUnverifikasiModal != null ? handleOpenUnverifikasiModal(item) : null} icon={<FiXCircle color='#CBD5E0' size={17} />} command='⌘T'>
                                                        <p className='text-md font-semibold'>Batalkan Verifikasi</p>
                                                    </MenuItem> :
                                                    <MenuItem onClick={() => handleOpenVerifikasiModal != null ? handleOpenVerifikasiModal(item) : null} icon={<FiCheck color='#CBD5E0' size={17} />} command='⌘T'>
                                                        <p className='text-md font-semibold'>Verifikasi</p>
                                                    </MenuItem>
                                            }
                                        </>
                                    </> : null
                            }
                        </MenuList>
                    </Menu> :
                    <Button disabled className="btn btn-light">Aksi</Button>
            }
        </div>
    )
};
export default ActionCondition;