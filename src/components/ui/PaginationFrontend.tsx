import { Button, Menu, MenuButton, MenuDivider, MenuItem, MenuList } from '@chakra-ui/react';
import { FiChevronsDown, FiGrid, FiMoreVertical } from 'react-icons/fi';
import ReactPaginate from 'react-paginate';
import { useState, useEffect } from 'react';

type Props = {
    data: any[];
    currentPage: number;
    perPage: number;
    setCurrentPage: (page: number) => void;
    setPerPage?: (value: number) => void;
}

const PaginationFrontend = (props: Props) => {
    const { currentPage, data, setCurrentPage, setPerPage, perPage } = props
    const [TotalPage, setTotalPage] = useState<number>(0);

    const handlePerPageChange = (value: number) => {
        if (setPerPage != null) {
            setPerPage(value)
            setCurrentPage(1);
        }
    };

    useEffect(() => {
        setTotalPage(Math.ceil(data.length / perPage))
    }, [data, perPage])

    return (
        <>
            {
                TotalPage !== 0 && !isNaN(TotalPage) ?
                    <div className="container-pagination-table-list">
                        <ReactPaginate
                            breakLabel="..."
                            nextLabel={`Selanjutnya`}
                            marginPagesDisplayed={2}
                            forcePage={currentPage - 1}
                            className='pagination-custom'
                            onPageChange={(e) => {
                                setCurrentPage(e.selected + 1)
                            }}
                            pageRangeDisplayed={3}
                            pageCount={TotalPage === 0 ? 1 : TotalPage}
                            previousLabel="Sebelumnya"
                            renderOnZeroPageCount={null}
                        />
                        <div className='css-nac-9_c9am_DJ-Ds'>
                            {
                                perPage === 100000 ?
                                    <p className="font-12 font-normal">Menampilkan semua data dari total {data.length} data</p> :
                                    <p className="font-12 font-normal">Menampilkan data ke- {(currentPage === TotalPage ? data.length : perPage * currentPage)} dari {data.length} data</p>
                            }
                            {
                                setPerPage != null &&
                                <Menu>
                                    <MenuButton as={Button} rightIcon={<FiChevronsDown />}>
                                        <p className='text-sm font-semibold'>{perPage === 100000 ? 'Semua' : perPage + ' Data'} </p>
                                    </MenuButton>
                                    <MenuList>
                                        <MenuItem onClick={() => handlePerPageChange(5)} icon={<FiMoreVertical color='#CBD5E0' size={17} />} command='⌘T'>
                                            <p className='text-md font-semibold'>5 Data</p>
                                        </MenuItem>
                                        <MenuItem onClick={() => handlePerPageChange(10)} icon={<FiMoreVertical color='#CBD5E0' size={17} />} command='⌘T'>
                                            <p className='text-md font-semibold'>10 Data</p>
                                        </MenuItem>
                                        <MenuItem onClick={() => handlePerPageChange(25)} icon={<FiMoreVertical color='#CBD5E0' size={17} />} command='⌘T'>
                                            <p className='text-md font-semibold'>25 Data</p>
                                        </MenuItem>
                                        <MenuItem onClick={() => handlePerPageChange(50)} icon={<FiMoreVertical color='#CBD5E0' size={17} />} command='⌘T'>
                                            <p className='text-md font-semibold'>50 Data</p>
                                        </MenuItem>
                                        <MenuItem onClick={() => handlePerPageChange(100)} icon={<FiMoreVertical color='#CBD5E0' size={17} />} command='⌘T'>
                                            <p className='text-md font-semibold'>100 Data</p>
                                        </MenuItem>
                                        <MenuDivider />
                                        <MenuItem onClick={() => handlePerPageChange(100000)} icon={<FiGrid color='#CBD5E0' size={17} />} command='⌘T'>
                                            <p className='text-md font-semibold'>Tampilkan Semua</p>
                                        </MenuItem>
                                    </MenuList>
                                </Menu>
                            }

                        </div>
                    </div> : null
            }

        </>
    )
};
export default PaginationFrontend;