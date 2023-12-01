import { Button, Menu, MenuButton, MenuDivider, MenuItem, MenuList } from '@chakra-ui/react';
import { FiAlignLeft, FiChevronsDown, FiGrid, FiMoreVertical, FiSearch } from 'react-icons/fi';
import {useEffect} from 'react'

type Props = {
    activeField: string;
    setActiveField: (value: string) => void
    activeValue: string
    setActiveValue: (value: string) => void
    handleClearFilter: () => void
    handleGetUserList: (page: 1) => void
}

const FormFilter = (props: Props) => {
    const { activeField, setActiveField, activeValue, setActiveValue, handleClearFilter, handleGetUserList } = props

    useEffect(() => {
        const keyEnter = (event: any) => {
            if (event.key === 'Enter') {
                event.preventDefault()
                handleGetUserList(1)
            }
        }

        document.addEventListener('keydown', keyEnter)

        return () => {
            document.removeEventListener('keydown', keyEnter)
        }
    }, [activeValue])

    return (
        <div className="container-form-filter-table">
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12">
                    <div className="flex css-j-fn-awf1 items-stretch inputGroup has-append has-prepend">
                        <span className="flex-none css-j-fn-awf1 input-group-addon">
                            <div className="input-group-text css-j-fn-awf1  h-full prepend-slot">
                                <Menu>
                                    <MenuButton style={{ background: 'none' }} className='w-100' variant={'ghost'} as={Button} leftIcon={<FiAlignLeft size={20} />}>
                                        <p className='text-sm font-semibold'>{
                                            (activeField === '') ? 'Tanpa Filter' :
                                                (activeField === 'nama_user') ? 'Nama' :
                                                    (activeField === 'nip_user') ? 'NIP' :
                                                        (activeField === 'nik_user') ? 'NIK' :
                                                            (activeField === 'npwp_user') ? 'NPWP' : 'Alamat'
                                        }</p>
                                    </MenuButton>
                                    <MenuList>
                                        <MenuItem onClick={() => setActiveField('')} icon={<FiMoreVertical color='#CBD5E0' size={17} />} command='⌘T'>
                                            <p className='text-md font-semibold'>Tanpa Filter</p>
                                        </MenuItem>
                                        <MenuItem onClick={() => setActiveField('nama_user')} icon={<FiMoreVertical color='#CBD5E0' size={17} />} command='⌘T'>
                                            <p className='text-md font-semibold'>Nama</p>
                                        </MenuItem>
                                        <MenuItem onClick={() => setActiveField('nip_user')} icon={<FiMoreVertical color='#CBD5E0' size={17} />} command='⌘T'>
                                            <p className='text-md font-semibold'>NIP</p>
                                        </MenuItem>
                                        <MenuItem onClick={() => setActiveField('nik_user')} icon={<FiMoreVertical color='#CBD5E0' size={17} />} command='⌘T'>
                                            <p className='text-md font-semibold'>NIK</p>
                                        </MenuItem>
                                        <MenuItem onClick={() => setActiveField('npwp_user')} icon={<FiMoreVertical color='#CBD5E0' size={17} />} command='⌘T'>
                                            <p className='text-md font-semibold'>NPWP</p>
                                        </MenuItem>
                                        <MenuItem onClick={() => setActiveField('alamat')} icon={<FiMoreVertical color='#CBD5E0' size={17} />} command='⌘T'>
                                            <p className='text-md font-semibold'>Alamat</p>
                                        </MenuItem>
                                        <MenuDivider />
                                    </MenuList>
                                </Menu>
                                {/* <select onChange={(e: any) => setActiveField(e.target.value)} value={activeField} className="select-filter-table text-sm text-slate-800 dark:text-slate-300 capitalize font-bold">
                                    <option value="">Tanpa Filter</option>
                                    <option value="nama_user">Nama Lengkap</option>
                                    <option value="nip_user">NIP</option>
                                    <option value="nik_user">NIK</option>
                                    <option value="npwp_user">NPWP</option>
                                    <option value="alamat">Alamat</option>
                                    <option value="lahir_user">Tanggal Lahir</option>
                                    <option value="id_pang_gol">Pangkat dan Golongan</option>
                                </select> */}
                            </div>
                        </span>
                        <div className="flex-1">
                            <div className="relative fromGroup2">
                                <input disabled={activeField === '' ? true : false} onChange={(e: any) => setActiveValue(e.target.value)} value={activeValue} type="text" className="input-group-control css-j-fn-awf1 block w-full focus:outline-none py-2 input-group-with-prepend-append text-sm text-slate-800 dark:text-slate-300 font-bold" placeholder="Pencarian ..." />
                                <div className="flex text-xl absolute ltr:right-[14px] rtl:left-[14px] top-1/2 -translate-y-1/2  space-x-1 rtl:space-x-reverse" />
                            </div>
                        </div>
                        <span className="flex-none input-group-addon css-j-fn-awf1 right">
                            <div className="input-group-text css-j-fn-awf1 h-full append-slot">
                                <button disabled={activeField === '' ? true : false} onClick={() => handleClearFilter()} type="button" className={`btn btn clear-text-hover inline-flex justify-center button-with-prepend-append text-sm text-slate-800 dark:text-slate-300 capitalize font-bold ${activeField === '' && 'css-an-fanw-fa'}`}>
                                    Bersihkan
                                </button>
                                <div className="container-filter-table-icon">
                                    <svg
                                        onClick={() => handleGetUserList(1)}
                                        type='submit'
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={24}
                                        height={24}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        className="text-sm text-slate-800 dark:text-slate-300 capitalize font-bold"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <circle cx={11} cy={11} r={8} />
                                        <line x1={21} y1={21} x2="16.65" y2="16.65" />
                                    </svg>
                                </div>
                            </div>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
};
export default FormFilter;