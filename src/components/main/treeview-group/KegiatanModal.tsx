import Button from "@/components/ui/Button";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Portal } from "@chakra-ui/react";
import { useState, useEffect } from 'react'
import { getSppKegiatan } from "@/api/penatausahaan/spp";
import TableShimmer from "@/components/skeleton/TableShimmer";
import NoDataFound from "@/components/NoDataFound";
import PaginationFrontend from "@/components/ui/PaginationFrontend";
import { groupObject, removeDuplicateObjects } from "@/utils/arrayManupilation";
import { FiFilePlus } from "react-icons/fi";

export interface ListKegiatanType {
    id_daerah: number
    tahun: number
    id_unit: number
    id_skpd: number
    id_sub_skpd: number
    kode_sub_skpd: string
    nama_sub_skpd: string
    id_urusan: number
    id_bidang_urusan: number
    id_fungsi: number
    id_sub_fungsi: number
    id_program: number
    id_giat: number
    kode_giat: string
    nama_giat: string
    nilai_anggaran: number
}

type SppLsPageTypes = {
    code: "barang-jasa" | "gaji" | "tpp" | "kontraktual",
    title: "Barang dan Jasa" | "Gaji" | "TPP" | "Kontraktual"
}

interface SppLsTableGiat {
    id_daerah: number
    tahun: number
    id_unit: number
    id_skpd: number
    id_sub_skpd: number
    kode_sub_skpd: string
    nama_sub_skpd: string
    id_urusan: number
    id_bidang_urusan: number
    id_fungsi: number
    id_sub_fungsi: number
    id_program: number
    id_giat: number
    kode_giat: string
    nama_giat: string
    nilai_anggaran: number
}

interface SppLsGroupedKegiatanTypes {
    kode_sub_skpd: string
    nama_sub_skpd: string
    kegiatan: SppLsKegiatanItemTypes[]
}

interface SppLsKegiatanItemTypes {
    id_daerah: number
    tahun: number
    id_unit: number
    id_skpd: number
    id_sub_skpd: number
    kode_sub_skpd: string
    nama_sub_skpd: string
    id_urusan: number
    id_bidang_urusan: number
    id_fungsi: number
    id_sub_fungsi: number
    id_program: number
    id_giat: number
    kode_giat: string
    nama_giat: string
    nilai_anggaran: number
  }

type Props = {
    CurrentType: SppLsPageTypes;
    Payload: SppCreatePayload;
    ToogleKegiatanModal: boolean;
    setToogleKegiatanModal: (toogle: boolean) => void;
    SelectedKegiatanModal?: SppLsTableGiat;
    setSelectedKegiatanModal: (data?: SppLsTableGiat) => void;
}

const KegiatanModal = (props: Props) => {
    const { CurrentType, Payload, ToogleKegiatanModal, setToogleKegiatanModal, SelectedKegiatanModal, setSelectedKegiatanModal } = props
    const [Response, setResponse] = useState<SppLsGroupedKegiatanTypes[]>([]);
    const [IsLoading, setIsLoading] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [PerPage, setPerPage] = useState<number>(5);

    useEffect(() => {
        if (ToogleKegiatanModal) {
            handleGetListKegiatan()
        }
    }, [ToogleKegiatanModal])

    const handleGetListKegiatan = () => {
        let jenis_ls_spp: 'barangjasa' | 'gaji' = 'barangjasa'
        if (CurrentType.code === 'gaji') {
            jenis_ls_spp = CurrentType.code
        }

        setIsLoading(true)
        getSppKegiatan(jenis_ls_spp, Payload.spp_ls?.id_bulan || 0, Payload.spp_ls?.id_bulan || 0).then(function (res) {
            const response = res.data
            const groupedSubSkpd = Array.from(groupObject(response, (item: any) => item.kode_sub_skpd))

            let cloneResponse: any = []
            for (let i = 0; i < groupedSubSkpd.length; i++) {
                cloneResponse.push({
                    kode_sub_skpd: groupedSubSkpd[i][1][0].kode_sub_skpd,
                    nama_sub_skpd: groupedSubSkpd[i][1][0].nama_sub_skpd,
                    kegiatan: removeDuplicateObjects(groupedSubSkpd[i][1])
                })
            }
            setResponse(cloneResponse)
        }).catch(function (error) {

        }).finally(function () {
            setIsLoading(false)
        })
    };

    const handleSelectedKegiatan = (item: SppLsTableGiat) => {
        setSelectedKegiatanModal(item)
        setToogleKegiatanModal(false)
    };

    return (
        <>
            <Modal isOpen={ToogleKegiatanModal} onClose={() => setToogleKegiatanModal(false)}>
                <ModalOverlay />
                <ModalContent maxWidth={800}>
                    <ModalHeader>Kegiatan</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <div className="container-delete-modal">
                            <div className="overflow-x-auto -mx-6">
                                <div className="inline-block min-w-full align-middle">
                                    {
                                        !IsLoading ?
                                            Response != null && Response.length > 0 ?
                                                <div className="overflow-hidden ">
                                                    <table className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700 ">
                                                        <thead>
                                                            <tr>
                                                                <th className="table-th table-thd">Kegiatan</th>
                                                                <th className="table-th"></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700 ">
                                                            {
                                                                Response && Response.map((item: SppLsGroupedKegiatanTypes, index: number) => {
                                                                    return (
                                                                        <div style={{ display: (index >= (currentPage - 1) * PerPage && index < currentPage * PerPage) ? '' : 'none' }}>
                                                                            <tr  >
                                                                                <td colSpan={2} className="table-td py-2">
                                                                                    <div >
                                                                                        <span className="inline-flex items-center">
                                                                                            <span className="account-user-image ltr:mr-3 rtl:ml-3 flex-none">
                                                                                                <img src="/assets/images/aMHhm8fp7D8EO347U.min.webp" alt={'--'} className="object-cover w-full h-full rounded-md" />
                                                                                            </span>
                                                                                            <div className="container-table-td-2-column">
                                                                                                <span className="text-sm text-slate-800 dark:text-slate-300 capitalize font-bold">{item.nama_sub_skpd}</span>
                                                                                                <span className="txt-font-12 text-slate-300 dark:text-slate-300">Kode: {item.kode_sub_skpd}</span>
                                                                                            </div>
                                                                                        </span>
                                                                                    </div>
                                                                                </td>
                                                                            </tr>
                                                                            {
                                                                                item.kegiatan.map((subItem: SppLsKegiatanItemTypes, subIndex: number) => {
                                                                                    return (
                                                                                        <tr key={subIndex}>
                                                                                            <td className="table-td py-2">

                                                                                                <div style={{ width: 350, marginLeft: 20 }}>
                                                                                                    <span className="inline-flex items-center">
                                                                                                        <span className="account-user-image ltr:mr-3 rtl:ml-3 flex-none">
                                                                                                            <FiFilePlus color="#FF6969" size={30} />
                                                                                                        </span>
                                                                                                        <div className="container-table-td-2-column">
                                                                                                            <span className="text-sm text-slate-800 dark:text-slate-300 capitalize font-bold">{subItem.nama_giat}</span>
                                                                                                            <span className="txt-font-12 text-slate-300 dark:text-slate-300">Kode: {subItem.kode_giat}</span>
                                                                                                        </div>
                                                                                                    </span>
                                                                                                </div>
                                                                                            </td>
                                                                                            <td className="table-td py-2">
                                                                                                <div style={{ width: 150 }}>
                                                                                                    {
                                                                                                        SelectedKegiatanModal?.id_giat === subItem.id_giat && SelectedKegiatanModal?.id_sub_skpd === subItem.id_sub_skpd ?
                                                                                                            <Button onClick={() => setSelectedKegiatanModal()} className="btn btn-sm btn-light">Batalkan</Button> :
                                                                                                            <Button onClick={() => handleSelectedKegiatan(subItem)} className="btn btn-sm btn-primary">Pilih Kegiatan Ini</Button>
                                                                                                    }
                                                                                                </div>
                                                                                            </td>
                                                                                        </tr>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                        </tbody>
                                                    </table>
                                                    <PaginationFrontend
                                                        currentPage={Number(currentPage)}
                                                        setCurrentPage={setCurrentPage}
                                                        perPage={PerPage}
                                                        setPerPage={setPerPage}
                                                        data={Response}
                                                    />
                                                </div> : <NoDataFound /> : <TableShimmer />
                                    }

                                </div>
                            </div>

                        </div>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={() => setToogleKegiatanModal(false)} className="me-2">Batalkan</Button>
                        {/* <Button isLoading={isLoading} onClick={() => handleValidation()} className="btn btn-success">Validasi Sekarang</Button> */}
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
};
export default KegiatanModal;