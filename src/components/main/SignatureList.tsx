import Button from "@/components/ui/Button";
import { useState, useEffect } from 'react'
import TableShimmer from "@/components/skeleton/TableShimmer";
import NoDataFound from "@/components/NoDataFound";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Portal } from "@chakra-ui/react";
import { ToTitleCase } from "@/utils/stringConverter";
import PaginationCustom from "@/components/ui/PaginationCustom";
import { getUserDetail } from "@/api/settings/user";
import { getPegawaiBudKbud, getPegawaiPptk } from "@/api/penatausahaan/sp2d";
import useProfile from "@/hooks/useProfile";

interface SelectedPenandatanganType {
    id: number
    id_daerah: number
    id_skpd: number
    id_user: number
    id_role: number
    nama_role: string
    tahun_pegawai: number
    id_pegawai_kpa: number
    status: string
    id_pegawai_ref: string
    id_user_kpa: number
    nama_user: string
    nip_user: string
}

type Props = {
    type: 'PPTK' | 'BUD-KBUD'
    SelectedSignature: SelectedPenandatanganType | null
    setSelectedSignature: (item: SelectedPenandatanganType | null) => void
    ToogleSignature: boolean
    setToogleSignature: (toogle: boolean) => void
}

const SignatureList = (props: Props) => {
    const { type, SelectedSignature, setSelectedSignature, ToogleSignature, setToogleSignature } = props
    const [PegawaiResponse, setPegawaiResponse] = useState<PegawaiListType[]>([]);
    const [PaginationResponse, setPaginationResponse] = useState<HeaderServiceResponsePagination>();
    const [ActiveFieldFilter, setActiveFieldFilter] = useState<string>('');
    const [ActiveValueFilter, setActiveValueFilter] = useState<string>('');
    const [IsLoading, setIsLoading] = useState<boolean>(false);
    const [Profile] = useProfile();

    useEffect(() => {
        handleGetPegawai(1)
    }, [])

    const handleGetPegawai = (page: number, clearFilter?: boolean) => {
        const params: UserListEndpointParams = {
            page: page,
            limit: 10,
        }

        if (clearFilter == null) {
            clearFilter = false
        }

        if (!clearFilter && ActiveFieldFilter != null && ActiveFieldFilter != '' && ActiveValueFilter != null) {
            params.filter = ActiveFieldFilter + '.' + ActiveValueFilter
        }

        setIsLoading(true)
        setPegawaiResponse([])

        if (type === 'PPTK') {
            getPegawaiPptk(Profile.id_skpd || 0).then(function (res: any) {
                const response = res.data
                setPegawaiResponse(response)
            }).finally(function () {
                setIsLoading(false)
            })
        } else if (type === 'BUD-KBUD') {
            getPegawaiBudKbud().then(function (res: any) {
                const response = res.data
                setPegawaiResponse(response)
            }).finally(function () {
                setIsLoading(false)
            })
        }
    };

    // const handleGetUserDetail = (length: number, data: any) => {
    //     setIsLoading(true)
    //     getUserDetail(data[length].id_user).then(function (res: any) {
    //         if (res.data.id_user === data[length].id_user) {
    //             data[length]['name'] = res.data.nama_user
    //             data[length]['nip_user'] = res.data.nip_user
    //             data[length]['nik_user'] = res.data.nik_user
    //             data[length]['npwp_user'] = res.data.npwp_user
    //         }

    //         if ((length + 1) === data.length) {
    //             setIsLoading(false)
    //             setPegawaiResponse(data)
    //         } else {
    //             handleGetUserDetail(length + 1, data)
    //         }
    //     }).catch(function (error: any) {

    //     }).finally(function () {

    //     })
    // };

    const handleSelectedSignature = (item: SelectedPenandatanganType) => {
        setToogleSignature(false)
        setSelectedSignature(item)
    };

    return (
        <>
            <Modal closeOnOverlayClick={false} isOpen={ToogleSignature} onClose={() => setToogleSignature(false)}>
                <ModalOverlay />
                <ModalContent maxWidth={800}>
                    <ModalHeader>Pilih Penandatangan</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <div className="overflow-x-auto -mx-6">
                            <div className="inline-block min-w-full align-middle">
                                <div className="overflow-hidden ">
                                    {/* <FormFilter
                                activeField={ActiveFieldFilter}
                                setActiveField={setActiveFieldFilter}
                                activeValue={ActiveValueFilter}
                                setActiveValue={setActiveValueFilter}
                                handleClearFilter={handleClearFilter}
                                handleGetUserList={handleGetPegawai}
                            /> */}
                                    {
                                        !IsLoading ? PegawaiResponse != null && PegawaiResponse.length > 0 ?
                                            <table className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700 ">
                                                <thead>
                                                    <tr>
                                                        <th className="table-th">Nama</th>
                                                        <th className="table-th">NIP</th>
                                                        <th className="table-th">Jabatan</th>
                                                        <th className="table-th"></th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700 ">
                                                    {
                                                        PegawaiResponse.map((item: any, index: number) => {
                                                            return (
                                                                <tr key={index}>
                                                                    <td className="table-td py-2">
                                                                        <div>
                                                                            <span className="inline-flex items-center">
                                                                                <span className="account-user-image ltr:mr-3 rtl:ml-3 flex-none">
                                                                                    <img src="/assets/images/tMkNdxbELY.min.webp" alt="" className="object-cover w-full h-full rounded-md" />
                                                                                </span>
                                                                                <div className="container-table-td-2-column">
                                                                                    <span className="text-sm text-slate-800 dark:text-slate-300 capitalize font-bold">{item.nama_user}</span>
                                                                                    <span className="txt-font-12 text-slate-300 dark:text-slate-300">Nama</span>
                                                                                </div>
                                                                            </span>
                                                                        </div>
                                                                    </td>
                                                                    <td className="table-td py-2">
                                                                        <div className="container-table-td-2-column">
                                                                            <span className="text-sm text-slate-800 dark:text-slate-300 capitalize font-bold">{item.nip_user}</span>
                                                                            <span className="txt-font-12 text-slate-300 dark:text-slate-300">NIP</span>
                                                                        </div>
                                                                    </td>
                                                                    <td className="table-td py-2">
                                                                        <div className="container-table-td-2-column">
                                                                            <span className="text-sm text-slate-800 dark:text-slate-300 capitalize font-bold">{ToTitleCase(item.nama_role)}</span>
                                                                            <span className="txt-font-12 text-slate-300 dark:text-slate-300">Jabatan</span>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="container-action-button">
                                                                            <div className="frontline-table-action-gap">
                                                                                {
                                                                                    SelectedSignature != null && SelectedSignature.id === item.id ?
                                                                                        <Button onClick={() => setSelectedSignature(null)} className="btn btn-sm btn-light mr-2" type="button">Batalkan</Button> :
                                                                                        <Button onClick={() => handleSelectedSignature(item)} className="btn btn-sm btn-primary mr-2" type="button">Pilih Pegawai Ini</Button>
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                            :
                                            <NoDataFound reloadActionParams={1} reloadAction={handleGetPegawai} />
                                            :
                                            <TableShimmer />
                                    }
                                </div>
                            </div>
                            {
                                PaginationResponse != null ?
                                    <PaginationCustom
                                        totalPages={PaginationResponse.pageCount}
                                        currentPage={Number(PaginationResponse.currentPage)}
                                        perPage={PaginationResponse.pageSize}
                                        totalData={PaginationResponse.totalCount}
                                        handlePageChange={(e) => handleGetPegawai(e)}
                                    />
                                    : null
                            }
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button className="btn btn-light" onClick={() => setToogleSignature(false)}>Batalkan</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
};
export default SignatureList;