import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea } from '@chakra-ui/react';
import { Controller, useForm } from "react-hook-form";
import { RadioGroup, Radio } from "@/components/ui/RadioGroup";
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';
import Button from '@/components/ui/Button';
import { persetujuanSpm, validasiSpm } from '@/api/penatausahaan/spm';
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast';
import { DateTime } from 'luxon';
import { LimitString } from '@/utils/stringConverter';
import useProfile from '@/hooks/useProfile';
import { ROLE_KUASA_BENDAHARA_UMUM_DAERAH, ROLE_KUASA_PENGGUNA_ANGGARAN, ROLE_PENGGUNA_ANGGARAN, ROLE_PPK_SKPD } from '@/constant/data';

type Props = {
    SelectedData: SpmPembuatanListType;
    ToogleModal: boolean;
    IsLoading: boolean;
    setIsLoading: (loading: boolean) => void;
    setToogleModal: (toogle: boolean) => void;
    handleGetData: (tab: DocumentTransactionBasicFilterType, type: DocumentTransactionBasicType) => void
    setSelectedTab: (tab: DocumentTransactionBasicFilterType) => void
}

const ValidationModal = (props: Props) => {
    const { SelectedData, ToogleModal, setToogleModal, handleGetData, IsLoading, setIsLoading, setSelectedTab } = props
    const { control } = useForm<any>()
    const [Profile] = useProfile();
    const [Payload, setPayload] = useState<VerifikasiSppPayloadType>({
        diterima: true,
        keterangan: '',
        nilai: 0,
    });

    useEffect(() => {
        if (ToogleModal && SelectedData != null) {
            setPayload((prevObject: any) => ({ ...prevObject, ...{ nilai: SelectedData.nilai_spm } }))
        }
    }, [ToogleModal, SelectedData])

    const handleValidation = () => {
        if (SelectedData == null) {
            return
        }

        setIsLoading(true)
        const payload: VerifikasiSppPayloadType = Payload
        validasiSpm(SelectedData.id_spm, payload).then(function (res) {
            toast.success('Woah!.. Surat Perintah Membayar Berhasil Diverifikasi')
            setToogleModal(false)
            handleGetData('diterima', '')
            setSelectedTab('diterima')
        }).finally(function () {
            setIsLoading(false)
        })
    };

    const handlePersetujuan = () => {
        if (SelectedData == null) {
            return
        }

        setIsLoading(true)
        persetujuanSpm(SelectedData.id_spm).then(function (res) {
            toast.success('Woah!.. Surat Perintah Membayar Berhasil Disetujui')
            setToogleModal(false)
            handleGetData('diterima', '')
            setSelectedTab('diterima')
        }).finally(function () {
            setIsLoading(false)
        })
    };

    return (
        <>
            <Modal isOpen={ToogleModal} onClose={() => setToogleModal(false)}>
                <ModalOverlay />
                <ModalContent maxWidth={450}>
                    <ModalHeader>{Profile != null && (Profile.id_role === ROLE_PENGGUNA_ANGGARAN || Profile.id_role === ROLE_KUASA_PENGGUNA_ANGGARAN) ? 'Persetujuan SPM' : 'Verifikasi SPM'}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <div>
                            <div className="grid grid-12">
                                <div className="col-span-12 mt-0">
                                    <div style={{ minWidth: 300 }}>
                                        <span className="inline-flex items-center">
                                            <span className="account-user-image ltr:mr-3 rtl:ml-3 flex-none">
                                                <img src="/assets/images/spm-min.webp" alt={SelectedData.nomor_spm} className="object-cover w-full h-full rounded-md" />
                                            </span>
                                            <div className="container-table-td-2-column">
                                                <span className="text-sm text-slate-800 dark:text-slate-300 capitalize font-bold">{LimitString(SelectedData.nomor_spm, 40) || '-'}</span>
                                                <div className='info-rak-belanja-header'>
                                                    <div className={`badge badge-primary me-2`}>
                                                        <span className='css-ncf-anw-fna-wa2'>Tanggal: {DateTime.fromISO(SelectedData.tanggal_spm).setLocale('id').toFormat('dd LLLL yyyy')}</span>
                                                    </div>
                                                    <div className={`badge badge-light-danger me-2`}>
                                                        <span className='css-ncf-anw-fna-wa2'>Belum {Profile != null && (Profile.id_role === ROLE_PENGGUNA_ANGGARAN || Profile.id_role === ROLE_KUASA_PENGGUNA_ANGGARAN) ? 'Disetujui' : 'Diverifikasi'}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </span>
                                    </div>
                                </div>

                                {
                                    Profile != null && (Profile.id_role === ROLE_KUASA_BENDAHARA_UMUM_DAERAH) ?
                                        <div className="col-span-12 mt-4">
                                            <Controller
                                                name={'kategori_rekanan'}
                                                control={control}
                                                render={({ field: { name } }) => (
                                                    <RadioGroup>
                                                        <Radio checked={Payload.diterima === true} value={0} onChange={(e) => {
                                                            setPayload((prevObject: any) => ({ ...prevObject, ...{ diterima: true } }))

                                                        }} id="pns" name={name}>
                                                            <div className="css-noc-e_c-ja-fw">
                                                                <FiCheckCircle color="#50C793" strokeWidth={3} />
                                                                <p className="text-md css-nicW_aj-j2wqa-a capitalize font-bold">Setujui</p>
                                                            </div>
                                                        </Radio>
                                                        <Radio checked={Payload.diterima === false} value={1} onChange={(e) => {
                                                            setPayload((prevObject: any) => ({ ...prevObject, ...{ diterima: false } }))
                                                        }} id="non-pns" name={name}>
                                                            <div className="css-noc-e_c-ja-fw">
                                                                <FiXCircle color="#FF2E63" strokeWidth={3} />
                                                                <p className="text-md css-nicW_aj-j2wqa-3 capitalize font-bold">Tolak</p>
                                                            </div>
                                                        </Radio>
                                                    </RadioGroup>
                                                )}
                                            />
                                        </div> : null
                                }

                                {
                                    Payload.diterima === false ?
                                        <div className="col-span-12 mt-4">
                                            <label htmlFor="" className="block capitalize form-label">Keterangan</label>
                                            <Textarea value={Payload.keterangan} placeholder="Masukkan alasan penolakan disini ..." onChange={(e) => {
                                                setPayload((prevObject: any) => ({ ...prevObject, ...{ keterangan: e.target.value } }))
                                            }} />
                                        </div> : null
                                }

                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        {
                            Profile != null && (Profile.id_role === ROLE_PENGGUNA_ANGGARAN || Profile.id_role === ROLE_KUASA_PENGGUNA_ANGGARAN) ?
                                <Button
                                    type="button"
                                    isLoading={IsLoading}
                                    onClick={() => handlePersetujuan()}
                                    className="btn btn-success me-2 border"
                                >Setujui Sekarang</Button> :
                                <Button
                                    type="button"
                                    isLoading={IsLoading}
                                    onClick={() => handleValidation()}
                                    className="btn btn-success me-2 border"
                                >Verifikasi Sekarang</Button>
                        }

                        <Button
                            type="button"
                            onClick={() => setToogleModal(false)}
                            className="btn border"
                        >Batalkan</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
};
export default ValidationModal;