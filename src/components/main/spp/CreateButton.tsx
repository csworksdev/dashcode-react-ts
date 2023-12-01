import SidebarTooltip from '@/components/ui/SidebarTooltip';
import { Button as ChakraButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import useProfile from '@/hooks/useProfile';
import { ROLE_BENDAHARA_PENGELUARAN, ROLE_BENDAHARA_PENGELUARAN_PEMBANTU } from '@/constant/data';
import Button from '@/components/ui/Button';

type Props = {
    Response: any
    SelectedTab: DocumentTransactionBasicFilterType
    ActivePage: DocumentTransactionBasicType
    handleCreateModal: () => void
}

const CreateButton = (props: Props) => {
    const { Response, SelectedTab, ActivePage, handleCreateModal } = props
    const [Profile] = useProfile();

    return (
        <>
            {
                Profile != null && (Profile.id_role === ROLE_BENDAHARA_PENGELUARAN_PEMBANTU || Profile.id_role === ROLE_BENDAHARA_PENGELUARAN) ?
                    ActivePage === 'LS' ?
                        <>
                            <Menu>
                                <MenuButton as={ChakraButton} className='btn btn-primary'>
                                    <p className='text-sm font-semibold'>Tambah Surat Permintaan Pembayaran</p>
                                </MenuButton>
                                <MenuList>
                                    <MenuItem as={Link} to={'/penatausahaan/pengeluaran/spp/pembuatan/ls/create?type=barang-jasa'} icon={<FiPlus color='#CBD5E0' size={17} />} command='⌘T'>
                                        <p className='text-md font-semibold'>SPP LS (Barang & Jasa)</p>
                                    </MenuItem>
                                    <MenuItem as={Link} to={'/penatausahaan/pengeluaran/spp/pembuatan/ls/create?type=gaji'} icon={<FiPlus color='#CBD5E0' size={17} />} command='⌘T'>
                                        <p className='text-md font-semibold'>SPP LS Gaji</p>
                                    </MenuItem>
                                    <MenuItem as={Link} to={'/penatausahaan/pengeluaran/spp/pembuatan/ls/create?type=tpp'} icon={<FiPlus color='#CBD5E0' size={17} />} command='⌘T'>
                                        <p className='text-md font-semibold'>SPP LS TPP</p>
                                    </MenuItem>
                                    <MenuItem as={Link} to={'/penatausahaan/pengeluaran/spp/pembuatan/ls/create?type=kontraktual'} icon={<FiPlus color='#CBD5E0' size={17} />} command='⌘T'>
                                        <p className='text-md font-semibold'>SPP LS (Kontraktual)</p>
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                        </>
                        :
                        ActivePage === 'TU' ?
                            <Link to={'/penatausahaan/pengeluaran/spp/pembuatan/tu/create'}>
                                <Button onClick={() => handleCreateModal()}>Tambah Surat Permintaan Pembayaran (TU)</Button>
                            </Link>
                            :
                            ActivePage === 'UP' ?
                                SelectedTab === 'aktif' && Response != null && Response.length > 0 ?
                                    <SidebarTooltip
                                        title={
                                            <Button disabled className="btn btn-light">Tambah Surat Permintaan Pembayaran</Button>
                                        }
                                        className=""
                                        content={
                                            <>
                                                <span className="inline-flex items-center" style={{ width: 250 }}>
                                                    <div className="container-table-td-2-column">
                                                        <span className="text-sm capitalize">Surat Permintaan Pembayaran (SPP) Uang Persediaan Sudah Tersedia</span>
                                                    </div>
                                                </span>

                                            </>
                                        }
                                        placement="left"
                                        arrow
                                    />
                                    :
                                    SelectedTab === 'aktif' ?
                                        <Button onClick={() => handleCreateModal()}>Tambah Surat Permintaan Pembayaran</Button> : null
                                : null : null
            }
        </>
    )
};
export default CreateButton;