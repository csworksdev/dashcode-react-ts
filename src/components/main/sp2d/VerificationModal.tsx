import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea } from '@chakra-ui/react';
import { Controller, useForm } from "react-hook-form";
import { RadioGroup, Radio } from "@/components/ui/RadioGroup";
import { FiCheckCircle, FiPocket, FiXCircle } from 'react-icons/fi';
import Button from '@/components/ui/Button';
import { validasiSpm } from '@/api/penatausahaan/spm';
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast';
import { DateTime } from 'luxon';
import { LimitString } from '@/utils/stringConverter';
import NominalFormat from '../NominalFormat';
import { validasiSp2d } from '@/api/penatausahaan/sp2d';

type Props = {
    SelectedData: ListSp2dResponseType;
    ToogleModal: boolean;
    IsLoading: boolean;
    setIsLoading: (loading: boolean) => void;
    setToogleModal: (toogle: boolean) => void;
    handleGetData: (tab: DocumentTransactionBasicFilterType, type: DocumentTransactionBasicType) => void
    setSelectedTab: (tab: DocumentTransactionBasicFilterType) => void
}

const VerificationModal = (props: Props) => {
    const { SelectedData, ToogleModal, setToogleModal, handleGetData, IsLoading, setIsLoading, setSelectedTab } = props
    const { control } = useForm<any>()
    const [Payload, setPayload] = useState<VerifikasiSppPayloadType>({
        diterima: true,
        keterangan: '',
        nilai: 0,
    });

    const handleValidation = () => {
        if (SelectedData == null) {
            return
        }

        setIsLoading(true)
        const payload: VerifikasiSppPayloadType = Payload
        validasiSp2d(SelectedData.id_sp_2_d, payload).then(function (res) {
            toast.success('Woah!.. Surat Perintah Pencarian Dana Berhasil Diverifikasi')
            setToogleModal(false)
            handleGetData('diterima', '')
            setSelectedTab('diterima')
        }).finally(function () {
            setIsLoading(false)
        })
    };
    
    return (
        <>
            <Modal blockScrollOnMount={false} isOpen={ToogleModal} onClose={() => setToogleModal(false)}>
                <ModalOverlay />
                <ModalContent maxWidth={450}>
                    <ModalHeader>Verifikasi SP2D</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                        <div className="grid grid-12">
                            <div className="col-span-12 mt-0">
                                <div style={{ minWidth: 300 }}>
                                    <span className="inline-flex items-center">
                                        <span className="account-user-image ltr:mr-3 rtl:ml-3 flex-none">
                                            <img src="/assets/images/sp2d-min.webp" alt={SelectedData.nomor_sp_2_d} className="object-cover w-full h-full rounded-md" />
                                        </span>
                                        <div className="container-table-td-2-column">
                                            <span className="text-sm text-slate-800 dark:text-slate-300 capitalize font-bold">{LimitString(SelectedData.nomor_sp_2_d || '-', 40)}</span>
                                            <div className='info-rak-belanja-header'>
                                                <div className={`badge badge-primary me-2`}>
                                                    <span className='css-ncf-anw-fna-wa2'>Tanggal: {DateTime.fromISO(SelectedData.tanggal_sp_2_d || '-').setLocale('id').toFormat('dd LLLL yyyy')}</span>
                                                </div>
                                                <div className={`badge badge-light-danger me-2`}>
                                                    <span className='css-ncf-anw-fna-wa2'>Belum Diverifikasi</span>
                                                </div>
                                            </div>
                                        </div>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="mb-10">
                            <div className="grid grid-12">
                                <div className="col-span-12 mt-4">
                                    <div className="css-naw-c-an-_cf-1a css-9c-aw-aj-_wi91JD-1">
                                        <div className="css-noc-w_-v-w1">
                                            <FiPocket size={25} color="#4669fa" />
                                        </div>
                                        <div className="css-nc-_q2j0d-cm0a1">
                                            <NominalFormat value={SelectedData.nilai_sp_2_d || 0} className="css-anfa_awf-1fmv-a2w text-md" prefix="Rp" displayType="text" />
                                            <p className="txt-font-12 text-slate-300 dark:text-slate-300">Nilai Surat Perintah Pencairan Dana</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-12 mt-4">
                                    <p className="font-semibold txt-font-12 text-slate-300 dark:text-slate-300">Keperluan:</p>
                                    <p className="font-12 font-semibold">{SelectedData.keterangan_sp_2_d || '-'}</p>
                                </div>
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
                                </div>

                                {
                                    Payload.diterima === false ?
                                        <div className="col-span-12 mt-4">
                                            <label htmlFor="" className="block form-label">Berikan alasan mengapa pengajuan ini ditolak:</label>
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
                            Payload.diterima === true ?
                                <Button
                                    type="button"
                                    isLoading={IsLoading}
                                    onClick={() => handleValidation()}
                                    className="btn btn-success me-2 border"
                                >Setujui</Button> :
                                <Button
                                    type="button"
                                    isLoading={IsLoading}
                                    onClick={() => handleValidation()}
                                    className="btn btn-danger me-2 border"
                                >Tolak</Button>
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
export default VerificationModal;