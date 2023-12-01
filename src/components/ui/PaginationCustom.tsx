import { Button, Menu, MenuButton, MenuDivider, MenuItem, MenuList } from '@chakra-ui/react';
import { FiChevronsDown, FiGrid, FiMoreVertical } from 'react-icons/fi';
import ReactPaginate from 'react-paginate';

type Props = {
    totalPages: number;
    currentPage: number;
    perPage: number;
    totalData: number;
    handlePageChange: (e: any) => void;
    setPerPage?: (perPage: number) => void;
}

const PaginationCustom = (props: Props) => {
    const { totalPages, currentPage, handlePageChange, setPerPage, perPage, totalData } = props
    const handlePerPageChange = (value: number) => {
        if (setPerPage != null) {
            setPerPage(value)
            // handlePageChange(1)
        }
    };

    return (
        <>
            {
                totalPages !== 0 && !isNaN(totalPages) ?
                    <div className="container-pagination-table-list">
                        <ReactPaginate
                            breakLabel="..."
                            nextLabel={`Selanjutnya`}
                            marginPagesDisplayed={2}
                            forcePage={currentPage - 1}
                            className='pagination-custom'
                            onPageChange={(e) => {
                                handlePageChange(e.selected + 1)
                            }}
                            pageRangeDisplayed={3}
                            pageCount={totalPages === 0 ? 1 : totalPages}
                            previousLabel="Sebelumnya"
                            renderOnZeroPageCount={null}
                        />
                        <div className='css-nac-9_c9am_DJ-Ds'>
                            {
                                perPage === 100000 ?
                                    <p className="font-12 font-normal">Menampilkan semua data dari total {totalData} data</p> :
                                    <p className="font-12 font-normal">Menampilkan data ke- {(currentPage === totalPages ? totalData : perPage * currentPage)} dari {totalData} data</p>
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
export default PaginationCustom;