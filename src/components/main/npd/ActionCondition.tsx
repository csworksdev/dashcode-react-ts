import Button from '@/components/ui/Button';
import { ROLE_BENDAHARA_PENGELUARAN, ROLE_BENDAHARA_PENGELUARAN_PEMBANTU, ROLE_KUASA_PENGGUNA_ANGGARAN, ROLE_PENGGUNA_ANGGARAN, ROLE_PPTK } from '@/constant/data';
import useProfile from '@/hooks/useProfile';
import { Button as ChakraButton, Menu, MenuButton, MenuDivider, MenuItem, MenuList } from '@chakra-ui/react';
import { FiCheck, FiCheckCircle, FiChevronsDown, FiPlay, FiPrinter, FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';

type Props = {
    SelectedTab: DocumentTransactionBasicFilterType
    SelectedSubTab: NpdDocumentFilterType
    item: ResponseNpdListTypes;
    handleDeleteModal: (data: ResponseNpdListTypes) => void;
    handleVerificationModal: (data: ResponseNpdListTypes) => void;
    handleLockModal: (data: ResponseNpdListTypes) => void;
    handleTransferModal: (data: ResponseNpdListTypes) => void;
}

const ActionCondition = (props: Props) => {
    const { SelectedTab, SelectedSubTab, item, handleDeleteModal, handleVerificationModal, handleTransferModal, handleLockModal } = props
    const [Profile] = useProfile();

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
                                (Profile != null && Profile.id_role === ROLE_PENGGUNA_ANGGARAN || Profile.id_role === ROLE_KUASA_PENGGUNA_ANGGARAN) && item.is_verifikasi_npd === 0 && item.is_validasi_npd === 0 && handleVerificationModal != null ?
                                    <>
                                        <MenuItem onClick={() => handleVerificationModal(item)} icon={<FiCheckCircle color='#CBD5E0' size={17} />} command='⌘T'>
                                            <p className='text-md font-semibold'>Persetujuan</p>
                                        </MenuItem>
                                        <MenuDivider />
                                    </>
                                    :
                                    (Profile != null && Profile.id_role === ROLE_BENDAHARA_PENGELUARAN_PEMBANTU || Profile.id_role === ROLE_BENDAHARA_PENGELUARAN) && item.is_verifikasi_npd === 1 && item.is_validasi_npd === 0 && handleVerificationModal != null ?
                                        <>
                                            <MenuItem onClick={() => handleVerificationModal(item)} icon={<FiCheck color='#CBD5E0' size={17} />} command='⌘T'>
                                                <p className='text-md font-semibold'>Validasi</p>
                                            </MenuItem>
                                            <MenuDivider />
                                        </>
                                        : null
                            }
                            {
                                Profile != null && Profile.id_role === ROLE_PPTK && item.is_verifikasi_npd === 0 && item.is_validasi_npd === 0 && handleDeleteModal != null ?
                                    <>
                                        <MenuItem onClick={() => handleDeleteModal(item)} icon={<FiTrash2 color='#CBD5E0' size={17} />} command='⌘T'>
                                            <p className='text-md font-semibold'>Hapus</p>
                                        </MenuItem>
                                        <MenuDivider />
                                    </> : null
                            }
                            {
                                (Profile != null && Profile.id_role === ROLE_BENDAHARA_PENGELUARAN || Profile.id_role === ROLE_BENDAHARA_PENGELUARAN_PEMBANTU) && item.is_verifikasi_npd === 1 && item.is_validasi_npd === 1 && item.is_npd_panjar === 1 && item.kondisi_selesai === 1 && item.nomor_kurang_lebih !== '' && item.nomor_selesai === '' && handleVerificationModal != null ?
                                    <>
                                        <MenuItem onClick={() => handleTransferModal(item)} icon={<FiPlay color='#CBD5E0' size={17} />} command='⌘T'>
                                            <p className='text-md font-semibold'>Transfer Kekurangan</p>
                                        </MenuItem>
                                        <MenuDivider />
                                    </>
                                    : null
                            }
                            {
                                (Profile != null && Profile.id_role === ROLE_BENDAHARA_PENGELUARAN || Profile.id_role === ROLE_BENDAHARA_PENGELUARAN_PEMBANTU) && item.is_verifikasi_npd === 1 && item.is_validasi_npd === 1 && item.is_npd_panjar === 1 && (item.kondisi_selesai === 2 || item.kondisi_selesai === 3) && item.nomor_kurang_lebih !== '' && item.nomor_selesai === '' && handleVerificationModal != null ?
                                    <>
                                        <MenuItem icon={<FiPlay color='#CBD5E0' size={17} />} command='⌘T'>
                                            <p className='text-md font-semibold'>Kunci NPD</p>
                                        </MenuItem>
                                        <MenuDivider />
                                    </> : null
                            }
                            {
                                handleDeleteModal != null ?
                                    <MenuItem as={Link} to={'/penatausahaan/pengeluaran/pengajuan/npd/cetak/1'} icon={<FiPrinter color='#CBD5E0' size={17} />} command='⌘T'>
                                        <p className='text-md font-semibold'>Cetak</p>
                                    </MenuItem> : null
                            }

                            {
                                (Profile != null && Profile.id_role === ROLE_BENDAHARA_PENGELUARAN || Profile.id_role === ROLE_BENDAHARA_PENGELUARAN_PEMBANTU) && item.is_verifikasi_npd === 1 && item.is_validasi_npd === 1 && item.is_npd_panjar === 1 && item.kondisi_selesai === 2 && handleVerificationModal != null ?
                                    <MenuItem icon={<FiPrinter color='#CBD5E0' size={17} />} command='⌘D'>
                                        <p className='text-md font-semibold'>Cetak Pengembalian</p>
                                    </MenuItem> : null
                            }

                            {
                                (Profile != null && Profile.id_role === ROLE_BENDAHARA_PENGELUARAN || Profile.id_role === ROLE_BENDAHARA_PENGELUARAN_PEMBANTU) && item.is_verifikasi_npd === 1 && item.is_validasi_npd === 1 && item.is_npd_panjar === 1 && item.kondisi_selesai === 1 && handleVerificationModal != null ?
                                    <MenuItem icon={<FiPrinter color='#CBD5E0' size={17} />} command='⌘C'>
                                        <p className='text-md font-semibold'>Cetak Permintaan Kurang Bayar</p>
                                    </MenuItem> : null
                            }

                            {
                                (Profile != null && Profile.id_role === ROLE_BENDAHARA_PENGELUARAN || Profile.id_role === ROLE_BENDAHARA_PENGELUARAN_PEMBANTU) && item.is_verifikasi_npd === 1 && item.is_validasi_npd === 1 && item.is_npd_panjar === 1 && (item.kondisi_selesai === 2 || item.kondisi_selesai === 3) && handleVerificationModal != null ?
                                    <MenuItem icon={<FiPrinter color='#CBD5E0' size={17} />} command='⌘T'>
                                        <p className='text-md font-semibold'>Cetak NPD Nihil</p>
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