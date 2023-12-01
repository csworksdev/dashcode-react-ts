import Button from "@/components/ui/Button";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Portal } from "@chakra-ui/react";
import { useState, useEffect } from 'react'
import { getDaftarRekanan } from "@/api/penatausahaan/daftar-rekanan";

type Props = {
    setToogleModal: (toogle: boolean) => void;
    mainIndex: number;
    ToogleModal?: any;
    SelectedRekananModal?: any;
    setSelectedRekananModal: (data?: any) => void;
    setPayload: (data: any) => void;

    
}

interface ResponseRekananType {
  tahun: number
  id_daerah: number
  id_skpd: number
  nomor_rekening: string
  nama_rekening: string
  id_bank: number
  nama_bank: string
  cabang_bank: string
  nama_tujuan: string
  nama_perusahaan: string
  alamat_perusahaan: string
  telepon_perusahaan: string
  npwp: string
  nik: string
  jenis_rekanan: string
  kategori_rekanan: string
  is_valid: number
  is_locked: number
  created_at: string
  created_by: number
  updated_at: string
  updated_by: number
  deleted_at: string
  deleted_by: number
}


const data = [
    {
        "id_daerah": 141,
        "tahun": 2024,
        "id_unit": 12,
        "id_skpd": 12,
        "id_sub_skpd": 12,
        "kode_sub_skpd": "1.02.0.00.0.00.01.0000",
        "nama_sub_skpd": "Dinas Kesehatan",
        "id_urusan": 11,
        "id_bidang_urusan": 202,
        "id_fungsi": 1,
        "id_sub_fungsi": 1,
        "id_program": 1397,
        "id_giat": 9700,
        "kode_giat": "1.02.01.1.02",
        "nama_giat": "Administrasi Keuangan Perangkat Daerah",
        "nilai_anggaran": 2.0322E8
    }
]

const ListRekanan = (props: Props) => {
    const { mainIndex, ToogleModal, setToogleModal, SelectedRekananModal, setSelectedRekananModal, setPayload } = props
    const [Response, setResponse] = useState<ResponseRekananType[]>();

    useEffect(() => {
        if (ToogleModal) {
            handleGetListRekanan()
        }
    }, [ToogleModal])

    const handleSelectedKegiatan = (item: ResponseRekananType) => {
        setPayload((prevObject: any) => ({ ...prevObject, ...{ no_rek_rekanan: item.nomor_rekening } }))
        // handleFormChange(mainIndex, 'no_rek_rekanan', item.nomor_rekening)
        setSelectedRekananModal(item)
        setToogleModal(false)
    };

    const handleGetListRekanan = () => {
        getDaftarRekanan().then(function (res) {
            setResponse(res.data)
        }).catch(function (error) {
            
        }).finally(function () {
            
        })
    };

    return (
        <>
            <Modal isOpen={ToogleModal} onClose={() => setToogleModal(false)}>
                <ModalOverlay />
                <ModalContent minWidth={700}>
                    <ModalHeader>Rekanan</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <div className="container-delete-modal">
                            <div className="overflow-x-auto -mx-6">
                                <div className="inline-block min-w-full align-middle">
                                    <div className="overflow-hidden ">
                                        <table className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700 ">
                                            <thead>
                                                <tr>
                                                    <th className="table-th table-thd">Perusahaan</th>
                                                    <th className="table-th table-thd">Bank</th>
                                                    <th className="table-th"></th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700 ">
                                                {
                                                    Response && Response.map((item: ResponseRekananType, index: number) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td className="table-td py-2">
                                                                    <div style={{ width: 200 }}>
                                                                        <span className="inline-flex items-center">
                                                                            {/* <span className="account-user-image ltr:mr-3 rtl:ml-3 flex-none">
                                                                                <img src="/assets/images/aMHhm8fp7D8EO347U.min.webp" alt={'--'} className="object-cover w-full h-full rounded-md" />
                                                                            </span> */}
                                                                            <div className="container-table-td-2-column">
                                                                                <span className="text-sm text-slate-800 dark:text-slate-300 capitalize font-bold">{item.nama_perusahaan}</span>
                                                                                <span className="txt-font-12 text-slate-300 dark:text-slate-300">Jenis: {item.jenis_rekanan}</span>
                                                                            </div>
                                                                        </span>
                                                                    </div>
                                                                </td>
                                                                <td className="table-td py-2">
                                                                    <div style={{ width: 200 }}>
                                                                        <span className="inline-flex items-center">
                                                                            {/* <span className="account-user-image ltr:mr-3 rtl:ml-3 flex-none">
                                                                                <img src="/assets/images/aMHhm8fp7D8EO347U.min.webp" alt={'--'} className="object-cover w-full h-full rounded-md" />
                                                                            </span> */}
                                                                            <div className="container-table-td-2-column">
                                                                                <span className="text-sm text-slate-800 dark:text-slate-300 capitalize font-bold">{item.nomor_rekening}</span>
                                                                                <span className="txt-font-12 text-slate-300 dark:text-slate-300">Atas Nama: {item.nama_tujuan}</span>
                                                                            </div>
                                                                        </span>
                                                                    </div>
                                                                </td>
                                                                <td className="table-td py-2">
                                                                    <div style={{ width: 150 }}>
                                                                        {
                                                                            SelectedRekananModal?.nomor_rekening === item.nomor_rekening ?
                                                                                <Button onClick={() => setSelectedRekananModal()} className="btn btn-sm btn-light">Batalkan</Button> :
                                                                                <Button onClick={() => handleSelectedKegiatan(item)} className="btn btn-sm btn-primary">Pilih Rekanan Ini</Button>
                                                                        }
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                        {/* <PaginationCustom
                                            totalPages={5}
                                            currentPage={Number(1)}
                                            perPage={10}
                                            totalData={20}
                                            handlePageChange={(e) => getData(e)}
                                        /> */}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={() => setToogleModal(false)} className="me-2">Batalkan</Button>
                        {/* <Button isLoading={isLoading} onClick={() => handleValidation()} className="btn btn-success">Validasi Sekarang</Button> */}
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
};
export default ListRekanan;