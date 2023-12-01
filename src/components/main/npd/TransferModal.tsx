import Button from '@/components/ui/Button';
import toast from "react-hot-toast";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { LimitString } from "@/utils/stringConverter";
import { DateTime } from "luxon";
import { transferPengajuanNpd, validasiPengajuanNpd, verifikasiPengajuanNpd } from '@/api/penatausahaan/pengajuan/npd';
import { ROLE_KUASA_PENGGUNA_ANGGARAN, ROLE_PENGGUNA_ANGGARAN } from '@/constant/data';
import { Controller, useForm } from "react-hook-form";
import { RadioGroup, Radio } from "@/components/ui/RadioGroup";
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';
import Flatpickr from "react-flatpickr";

type Props = {
    Profile: ProfileResponseType;
    SelectedData: ResponseNpdListTypes;
    ToogleValidationModal: boolean;
    handleGetData: (tab: DocumentTransactionBasicFilterType) => void;
    setToogleValidationModal: (toogle: boolean) => void;
}

export interface ResponseSpm {
    keterangan: string
    nilai: number
    nomor: string
    tanggal: string
}

type PayloadPersetujuanNpd = {
    verifikasi_disetujui: boolean
    validasi_disetujui: boolean
    tanggal_validasi_npd: string
}

const TransferModal = (props: Props) => {
    const { Profile, SelectedData, ToogleValidationModal, handleGetData, setToogleValidationModal } = props
    const [IsLoading, setIsLoading] = useState<boolean>(false);
    const { control } = useForm<any>()
    const [Payload, setPayload] = useState<PayloadPersetujuanNpd>({
        verifikasi_disetujui: false,
        validasi_disetujui: false,
        tanggal_validasi_npd: '',
    });

    const handleValidasi = () => {
        setIsLoading(true)
        transferPengajuanNpd(SelectedData.id_npd).then(function () {
            toast.success('Woah!.. Pengajuan NPD Berhasil Ditransfer')
            handleGetData('diterima')
            setToogleValidationModal(false)
        }).finally(function () {
            setIsLoading(false)
        })
    };

    return (
        <>
            <Modal blockScrollOnMount={false} isOpen={ToogleValidationModal} onClose={() => setToogleValidationModal(false)}>
                <ModalOverlay />
                <ModalContent maxWidth={450}>
                    <ModalHeader>
                    <span>Transfer Kekurangan</span>

                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <div>
                            <div className="grid grid-12">
                                <div className="col-span-12 mt-0">
                                    <div style={{ minWidth: 300 }}>
                                        <span className="inline-flex items-center">
                                            <span className="account-user-image ltr:mr-3 rtl:ml-3 flex-none">
                                                <img src="/assets/images/general/npd.png" alt={SelectedData.nomor_npd} className="object-cover w-full h-full rounded-md" />
                                            </span>
                                            <div className="container-table-td-2-column">
                                                <span className="text-sm text-slate-800 dark:text-slate-300 capitalize font-bold">{LimitString(SelectedData.nomor_npd, 40) || '-'}</span>
                                                <div className='info-rak-belanja-header'>
                                                    <div className={`badge badge-primary me-2`}>
                                                        <span className='css-ncf-anw-fna-wa2'>Tanggal: {DateTime.fromISO(SelectedData.tanggal_npd).setLocale('id').toFormat('dd LLLL yyyy')}</span>
                                                    </div>
                                                    <div className={`badge badge-light-danger me-2`}>
                                                        {
                                                            Profile.id_role === ROLE_PENGGUNA_ANGGARAN || Profile.id_role === ROLE_KUASA_PENGGUNA_ANGGARAN ?
                                                                <span className='css-ncf-anw-fna-wa2'>Belum Disetujui</span> :
                                                                <span className='css-ncf-anw-fna-wa2'>Belum Divalidasi</span>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </span>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button type="button" isLoading={IsLoading} onClick={() => handleValidasi()} className="btn btn-success me-2 border">Transfer Sekarang</Button>


                        <Button
                            type="button"
                            onClick={() => setToogleValidationModal(false)}
                            className="btn border"
                        >Batalkan</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
};
export default TransferModal;