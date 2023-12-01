import Button from "@/components/ui/Button";
import { useState, useEffect } from 'react';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import NoDataFound from "@/components/NoDataFound";
import TableShimmer from "@/components/skeleton/TableShimmer";
import PaginationCustom from "@/components/ui/PaginationCustom";
import { getSkpd } from "@/api/settings/skpd";
import useProfile from "@/hooks/useProfile";
import ScrollableTable from "../main/tables/ScrollableTable";
import InputGroup from "./InputGroup";
import { Icon } from "@iconify/react";
import PaginationFrontend from "./PaginationFrontend";

type Props = {
    setSelectedSkpd: (data: SkpdResponseListType) => void
}

const ChooseSkpdDropwdown = (props: Props) => {
    const { setSelectedSkpd } = props
    const [ToogleSkpdModal, setToogleSkpdModal] = useState<boolean>(false);
    const [Response, setResponse] = useState<SkpdResponseListType[]>([]);
    const [IsLoading, setIsLoading] = useState<boolean>(false);
    // const [PerPage, setPerPage] = useState<number>(5);
    const [SelectedSkpdInside, setSelectedSkpdInside] = useState<SkpdResponseListType>();
    // const [currentPage, setCurrentPage] = useState<number>(1);
    const [FilteredData, setFilteredData] = useState<SkpdResponseListType[]>();
    const [PerPage, setPerPage] = useState<number>(5);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [Profile] = useProfile();

    useEffect(() => {
        if (Profile != null) {
            handleGetSkpd()
        }
    }, [])

    const handleSelectedSkpd = (skpd: SkpdResponseListType) => {
        setSelectedSkpd(skpd)
        setSelectedSkpdInside(skpd)
        setToogleSkpdModal(false)
    };

    const handleGetSkpd = () => {
        setIsLoading(true)
        getSkpd(Profile.id_daerah, Profile.tahun).then(function (res) {
            const response = res.data
            setResponse(response)
            setFilteredData(response)
        }).finally(function () {
            setIsLoading(false)
        })
    };

    const handleSearchValue = (value: string) => {
        if (Response == null) {
            return
        }

        const filtered = Response.filter((item: SkpdResponseListType) =>
            item.nama_skpd.toLowerCase().includes(value.toLowerCase())
        );

        setFilteredData(filtered);
    };

    return (
        <>
            {
                SelectedSkpdInside != null ?
                    <div className="css-j08f-ag-wjas ps-4">
                        <div className="css-na-fa0f-a">
                            <div className="inline-flex items-center">
                                <span className="account-user-image ltr:mr-3 rtl:ml-3 flex-none">
                                    <img src="/assets/images/aMHhm8fp7D8EO347U.min.webp" alt="" className="object-cover w-full h-full rounded-md" />
                                </span>
                                <div className="container-table-td-2-column">
                                    <span className="text-sm text-slate-800 dark:text-slate-300 capitalize font-bold">{SelectedSkpdInside.nama_skpd}</span>
                                    <span className="txt-font-12 text-slate-300 dark:text-slate-300">{SelectedSkpdInside.kode_skpd}</span>
                                </div>
                            </div>
                        </div>
                        <Button className="btn btn-light btn-sm" onClick={() => setToogleSkpdModal(true)}>Ubah</Button>
                    </div> :
                    <div onClick={() => setToogleSkpdModal(true)} className="css-ci-em3-ac">
                        <div className="css-j08f-ag-wjas ps-4 w-100">
                            <div className="css-na-fa0f-a css-9o-cj09-2ava">
                                <div className="inline-flex items-center">
                                    <span className="account-user-image ltr:mr-3 rtl:ml-3 flex-none">
                                        <img src="/assets/images/aMHhm8fp7D8EO347U.min.webp" alt="" className="object-cover w-full h-full rounded-md" />
                                    </span>
                                    <div className="container-table-td-2-column">
                                        <span className="text-sm text-slate-800 dark:text-slate-300 capitalize font-bold">Nama SKPD</span>
                                        <span className="txt-font-12 text-slate-300 dark:text-slate-300">Kode SKPD</span>
                                    </div>
                                </div>
                            </div>
                            <Button className="btn btn-light btn-sm" onClick={() => setToogleSkpdModal(true)}>Pilih SKPD</Button>
                        </div>
                    </div>
            }

            <Modal
                isOpen={ToogleSkpdModal}
                onClose={() => setToogleSkpdModal(false)}
                blockScrollOnMount={false}
            >
                <ModalOverlay />
                <ModalContent maxWidth={800}>
                    <ModalHeader>Daftar SKPD</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <div className="col-span-12 mt-5">
                            <div className="col-span-5">
                                <InputGroup
                                    id="search-access-control"
                                    type="text"
                                    onChange={(e: any) => handleSearchValue(e.target.value)}
                                    placeholder="Pencarian ..."
                                    prepend={<Icon icon="heroicons-outline:search" />}
                                    merged
                                />
                            </div>
                            {
                                !IsLoading ? FilteredData != null && FilteredData.length > 0 ?
                                    <ScrollableTable>
                                        <tbody className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700 ">
                                            {
                                                FilteredData.map((item: any, index: number) => {
                                                    return (
                                                        <tr key={index} style={{ display: (index >= (currentPage - 1) * PerPage && index < currentPage * PerPage) ? 'table-row' : 'none' }}>
                                                            <td className="table-td py-2">
                                                                <div>
                                                                    <span className="inline-flex items-center">
                                                                        <span className="account-user-image ltr:mr-3 rtl:ml-3 flex-none">
                                                                            <img src="/assets/images/aMHhm8fp7D8EO347U.min.webp" alt="" className="object-cover w-full h-full rounded-md" />
                                                                        </span>
                                                                        <div className="container-table-td-2-column">
                                                                            <span className="text-sm text-slate-800 dark:text-slate-300 capitalize font-bold">{item.nama_skpd}</span>
                                                                            <span className="txt-font-12 text-slate-300 dark:text-slate-300">{item.kode_skpd}</span>
                                                                        </div>
                                                                    </span>
                                                                </div>
                                                            </td>
                                                            <td className="table-td py-2 text-right">
                                                                <Button className="btn btn-sm btn-primary" isLoading={IsLoading} onClick={() => handleSelectedSkpd(item)}>Pilih SKPD Ini</Button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </ScrollableTable>
                                    :
                                    <NoDataFound />
                                    :
                                    <TableShimmer />
                            }
                            
                            {
                                FilteredData != null ?
                                    <PaginationFrontend
                                        currentPage={Number(currentPage)}
                                        setCurrentPage={setCurrentPage}
                                        perPage={PerPage}
                                        setPerPage={setPerPage}
                                        data={FilteredData}
                                    />
                                    : null
                            }
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            type="button"
                            onClick={() => setToogleSkpdModal(false)}
                            className="btn border"
                        >Batalkan</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </>
    )
};
export default ChooseSkpdDropwdown;