import Button from '@/components/ui/Button';
import { ROLE_KUASA_BENDAHARA_UMUM_DAERAH, ROLE_KUASA_PENGGUNA_ANGGARAN, ROLE_PENGGUNA_ANGGARAN, ROLE_PPK_SKPD } from '@/constant/data';
import useProfile from '@/hooks/useProfile';
import { Button as ChakraButton, Menu, MenuButton, MenuDivider, MenuItem, MenuList } from '@chakra-ui/react';
import { FiCheck, FiChevronsDown, FiEdit2, FiPrinter, FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';

type Props = {
    ActiveTab: DocumentTransactionBasicFilterType;
    item: SpmPembuatanListType;
    handleDeleteModal?: (data: SpmPembuatanListType) => void;
    handleOpenUnverifikasiModal?: (data: SpmPembuatanListType) => void;
    handleOpenVerifikasiModal?: (data: SpmPembuatanListType) => void;
}

const ActionCondition = (props: Props) => {
    const { ActiveTab, item, handleDeleteModal, handleOpenUnverifikasiModal, handleOpenVerifikasiModal } = props
    const [Profile] = useProfile();

    return (
        <div className="container-action-button" style={{ width: 150 }}>
            {
                ActiveTab !== 'dihapus' && item.is_verifikasi_spm !== 3 ?
                    <Menu>
                        <MenuButton as={ChakraButton} variant='outline' rightIcon={<FiChevronsDown />}>
                            <p className='text-sm font-semibold'>Aksi</p>
                        </MenuButton>
                        <MenuList>
                            {
                                Profile != null && (Profile.id_role === ROLE_PENGGUNA_ANGGARAN || Profile.id_role === ROLE_KUASA_PENGGUNA_ANGGARAN) && item.is_verifikasi_spm === 0 && item.is_sptjm_spm === 0 ?
                                    <>
                                        <MenuItem onClick={() => handleOpenVerifikasiModal != null ? handleOpenVerifikasiModal(item) : ''} icon={<FiCheck color='#CBD5E0' size={17} />} command='⌘T'>
                                            <p className='text-md font-semibold'>Persetujuan</p>
                                        </MenuItem>
                                        <MenuDivider />
                                    </> : null
                            }

                            {
                                Profile != null && Profile.id_role === ROLE_PPK_SKPD && item.is_verifikasi_spm === 0 ?
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
                                Profile != null && Profile.id_role === ROLE_KUASA_BENDAHARA_UMUM_DAERAH ?
                                    <>
                                        <>
                                            {
                                                item.is_verifikasi_spm === 1 ?
                                                    <MenuItem onClick={() => handleOpenUnverifikasiModal != null ? handleOpenUnverifikasiModal(item) : null} icon={<FiEdit2 color='#CBD5E0' size={17} />} command='⌘T'>
                                                        <p className='text-md font-semibold'>Batalkan Verifikasi</p>
                                                    </MenuItem> :
                                                    <MenuItem onClick={() => handleOpenVerifikasiModal != null ? handleOpenVerifikasiModal(item) : null} icon={<FiEdit2 color='#CBD5E0' size={17} />} command='⌘T'>
                                                        <p className='text-md font-semibold'>Verifikasi</p>
                                                    </MenuItem>
                                            }
                                        </>
                                        <MenuDivider />
                                    </> : null
                            }

                            {
                                item.jenis_spm === 'LS' ?
                                    <>
                                        <MenuItem as={Link} to={'/penatausahaan/pengeluaran/spm/pembuatan/cetak/' + item.id_spm} icon={<FiPrinter color='#CBD5E0' size={17} />} command='⌘T'>
                                            <p className='text-md font-semibold'>Cetak SPM</p>
                                        </MenuItem>
                                        {
                                            item.is_sptjm_spm === 1 ?
                                                <MenuItem as={Link} to={'/penatausahaan/pengeluaran/spm/pembuatan/cetak/sptjm-spm-up/' + item.id_spm + '?type=LS'} icon={<FiPrinter color='#CBD5E0' size={17} />} command='⌘T'>
                                                    <p className='text-md font-semibold'>Cetak SPTJM SPM LS</p>
                                                </MenuItem> : null
                                        }
                                        <MenuItem as={Link} to={'/penatausahaan/pengeluaran/spm/pembuatan/cetak/pernyataan-spm/' + item.id_spm + '?type=LS'} icon={<FiPrinter color='#CBD5E0' size={17} />} command='⌘T'>
                                            <p className='text-md font-semibold'>Cetak Pernyataan SPM</p>
                                        </MenuItem>
                                        {
                                            item.jenis_ls_spm === 'gaji' ?
                                                <MenuItem as={Link} to={'/penatausahaan/pengeluaran/pengajuan/data-pegawai/cetak/219'} icon={<FiPrinter color='#CBD5E0' size={17} />} command='⌘T'>
                                                    <p className='text-md font-semibold'>Cetak Data Gaji</p>
                                                </MenuItem> : null
                                        }
                                    </>
                                    :
                                    <>
                                        <MenuItem as={Link} to={'/penatausahaan/pengeluaran/spm/pembuatan/cetak/' + item.id_spm + '?type=UP'} icon={<FiPrinter color='#CBD5E0' size={17} />} command='⌘T'>
                                            <p className='text-md font-semibold'>Cetak SPM</p>
                                        </MenuItem>
                                        {
                                            item.is_sptjm_spm === 1 ?
                                                <MenuItem as={Link} to={'/penatausahaan/pengeluaran/spm/pembuatan/cetak/sptjm-spm-up/' + item.id_spm + '?type=UP'} icon={<FiPrinter color='#CBD5E0' size={17} />} command='⌘T'>
                                                    <p className='text-md font-semibold'>Cetak SPTJM SPM UP</p>
                                                </MenuItem> : null
                                        }
                                        <MenuItem as={Link} to={'/penatausahaan/pengeluaran/spm/pembuatan/cetak/pernyataan-spm/' + item.id_spm + '?type=UP'} icon={<FiPrinter color='#CBD5E0' size={17} />} command='⌘T'>
                                            <p className='text-md font-semibold'>Cetak Pernyataan SPM</p>
                                        </MenuItem>
                                    </>
                            }


                        </MenuList>
                    </Menu> :
                    <Button disabled className="btn btn-light">Aksi</Button>
            }
        </div>
    )
};
export default ActionCondition;