import Button from '@/components/ui/Button';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { validasiSppPembuatan } from "@/api/penatausahaan/spp";
import toast from "react-hot-toast";
import { Controller, useForm } from "react-hook-form";
import { Radio, RadioGroup } from "@/components/ui/RadioGroup";
import { FiCheckCircle, FiInfo, FiXCircle } from "react-icons/fi";
import NominalFormat from "@/components/main/NominalFormat";
import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay } from '@chakra-ui/react';
import { LimitString } from "@/utils/stringConverter";
import { DateTime } from "luxon";
import Alert from '@/components/ui/Alert';

type Props = {
    SelectedSpp: SppPembuatanListType;
    ToogleValidationModal: boolean;
    handleGetSpp: (tab: DocumentTransactionBasicFilterType, type: DocumentTransactionBasicType) => void;
    setToogleValidationModal: (toogle: boolean) => void;
}

export interface ResponseSpm {
    keterangan: string
    nilai: number
    nomor: string
    tanggal: string
}


const VerifikasiModal = (props: Props) => {
    const { SelectedSpp, ToogleValidationModal, handleGetSpp, setToogleValidationModal } = props
    const [IsLoading, setIsLoading] = useState<boolean>(false);
    const [DrawerToogle, setDrawerToogle] = useState<boolean>(false);
    const [AutoCreateSpmResponse, setAutoCreateSpmResponse] = useState<ResponseSpm>();
    const [Payload, setPayload] = useState<VerifikasiSppPayloadType>({
        diterima: true,
        keterangan: '-',
        nilai: 0,
    });

    useEffect(() => {
        if (ToogleValidationModal) {
            setPayload((prevObject: any) => ({
                ...prevObject, ...{
                    nilai: SelectedSpp.nilai_spp
                }
            }))
        }
    }, [ToogleValidationModal, SelectedSpp])

    const { control } = useForm<any>()

    const handleValidation = () => {
        setIsLoading(true)

        const payload: VerifikasiSppPayloadType = Payload
        validasiSppPembuatan(SelectedSpp.id_spp, payload).then(function (res) {

            if (Payload.diterima === false) {
                toast.success('Woah!.. Surat Permintaan Pembayaran Berhasil Ditolak')
            } else {
                toast.success('Woah!.. Surat Permintaan Pembayaran Berhasil Disetujui')
                setAutoCreateSpmResponse(res.data)
                setDrawerToogle(true)
            }
            setToogleValidationModal(false)
        }).catch(function (error) {

        }).finally(function () {
            setIsLoading(false)
        })
    };

    const handleDrawerClose = () => {
        if (AutoCreateSpmResponse != null) {
            handleGetSpp('draft', '')
            setDrawerToogle(false)
        }
    };

    return (
        <>
            <Modal blockScrollOnMount={false} isOpen={ToogleValidationModal} onClose={() => setToogleValidationModal(false)}>
                <ModalOverlay />
                <ModalContent maxWidth={450}>
                    <ModalHeader>Verifikasi (SPP)</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <div>
                            <div className="grid grid-12">
                                <div className="col-span-12 mt-0">
                                    <div style={{ minWidth: 300 }}>
                                        <span className="inline-flex items-center">
                                            <span className="account-user-image ltr:mr-3 rtl:ml-3 flex-none">
                                                <img src="/assets/images/21948365_4300_7.webp" alt={SelectedSpp.nomor_spp} className="object-cover w-full h-full rounded-md" />
                                            </span>
                                            <div className="container-table-td-2-column">
                                                <span className="text-sm text-slate-800 dark:text-slate-300 capitalize font-bold">{LimitString(SelectedSpp.nomor_spp, 40) || '-'}</span>
                                                <div className='info-rak-belanja-header'>
                                                    <div className={`badge badge-primary me-2`}>
                                                        <span className='css-ncf-anw-fna-wa2'>Tanggal: {DateTime.fromISO(SelectedSpp.tanggal_spp).setLocale('id').toFormat('dd LLLL yyyy')}</span>
                                                    </div>
                                                    <div className={`badge badge-light-danger me-2`}>
                                                        <span className='css-ncf-anw-fna-wa2'>Belum Diverifikasi</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </span>
                                    </div>
                                </div>
                                <div className="col-span-12 mt-7">
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
                                    SelectedSpp.jenis_spp === 'UP' ?
                                        <div className="col-span-12 mt-4">
                                            <label className="block capitalize form-label">Nilai Surat Permintaan Pembayaran (SPP)</label>
                                            <NominalFormat onValueChange={(values) => {
                                                setPayload((prevObject: any) => ({ ...prevObject, ...{ nilai: values.floatValue } }))
                                            }} value={Payload.nilai} prefix="Rp" style={{ padding: '15px 10px' }} className={`form-control py-2 ${SelectedSpp.nilai_spp < Payload.nilai ? 'css-aw-input-snap' : ''}`} displayType="input" placeholder="Masukkan nilai SPP disini ..." />
                                            {
                                                SelectedSpp.nilai_spp < Payload.nilai ?
                                                    <>
                                                        <p className='font-12 mt-1 font-normal text-danger'>Melebihi anggaran!.. Nilai maksimal yang dapat diinputkan adalah <NominalFormat value={SelectedSpp.nilai_spp || 0} prefix="Rp" className="font-12 font-normal" displayType="text" /></p>
                                                    </> :
                                                    <p className='font-12 mt-1 font-normal'>Nilai maksimal yang dapat diinputkan adalah <NominalFormat value={SelectedSpp.nilai_spp || 0} prefix="Rp" className="font-12 font-normal" displayType="text" /></p>

                                            }
                                        </div> : null
                                }

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
                            {
                                Payload.diterima === true ?
                                    <>
                                        <div className='alert-light-danger mt-5'>
                                            <div className="css-noa_-2n-an-fa">
                                                <FiInfo color='#F1416C' size={30} />
                                                <p className='font-12 font-normal'>Jika menyetujui, maka proses verifikasi ini akan sekaligus membuat dokumen <span className='bold'>SPM</span>, dokumen <span className='bold'>Pernyataan SPM</span> dan dokumen <span className='bold'>SPTJM SPM</span> secara otomatis</p>
                                            </div>
                                        </div>
                                        {/* <p className="text-danger font-12 mt-3">*Proses verifikasi ini sekaligus membuat SPM dan SPTJM SPM secara otomatis</p> */}
                                    </> : null}
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        {
                            Payload.diterima ?
                                <Button
                                    type="button"
                                    isLoading={IsLoading}
                                    onClick={() => handleValidation()}
                                    className="btn btn-success me-2 border"
                                >Setujui Sekarang</Button> :
                                <Button
                                    type="button"
                                    isLoading={IsLoading}
                                    onClick={() => handleValidation()}
                                    className="btn btn-danger me-2 border"
                                >Tolak Sekarang</Button>
                        }

                        <Button
                            type="button"
                            onClick={() => setToogleValidationModal(false)}
                            className="btn border"
                        >Batalkan</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Drawer placement={'bottom'} onClose={() => handleDrawerClose()} isOpen={DrawerToogle}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton onClick={() => setDrawerToogle(false)} />
                    <DrawerHeader borderBottomWidth='1px'>Verifikasi SPP Berhasil</DrawerHeader>
                    <DrawerBody>
                        <div className='css-mi-nd-_2j-a-1cda'>
                            <div className={`border css-ni-n0cn920_apwa4`}>
                                <div className={`badge badge-light-success mb-2`}>
                                    <span className='css-ncf-anw-fna-wa2'>Berhasil Diverifikasi</span>
                                </div>
                                <div className='grid grid-cols-12'>
                                    <div className="col-span-12 mb-5">
                                        <p className="font-normal text-sm">Surat Permintaan Pembayaran (SPP) telah berhasil diverifikasi. Berikut terlampir Surat Perintah Membayar (SPM) yang otomatis dibuat:</p>
                                    </div>
                                    <div className="col-span-5">
                                        <div style={{ minWidth: 300 }}>
                                            <span className="inline-flex items-center">
                                                <span className="account-user-image ltr:mr-3 rtl:ml-3 flex-none">
                                                    <img src="/assets/images/21948365_4300_7.webp" alt={'12.00/02.0/000003/1.02.0.00.0.00.01.0000/M/10/2024'} className="object-cover w-full h-full rounded-md" />
                                                </span>
                                                <div className="container-table-td-2-column">
                                                    <span className="text-sm text-slate-800 dark:text-slate-300 capitalize font-bold">{AutoCreateSpmResponse?.nomor}</span>
                                                    <span className="txt-font-12 text-slate-300 dark:text-slate-300">Dibuat Pada: {(AutoCreateSpmResponse == null ? '' : DateTime.fromISO(AutoCreateSpmResponse.tanggal).setLocale('id').toFormat('dd LLLL yyyy'))}</span>

                                                </div>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col-start-7 col-span-3">
                                        <p className="text-sm text-slate-800 dark:text-slate-300 capitalize font-semibold">{(AutoCreateSpmResponse == null ? '' : DateTime.fromISO(AutoCreateSpmResponse.tanggal).setLocale('id').toFormat('dd LLLL yyyy'))}</p>
                                        <p className='txt-font-12 text-slate-300 dark:text-slate-300'>Tanggal</p>
                                    </div>
                                    <div className="col-span-3">
                                        <NominalFormat className="text-sm text-slate-800 dark:text-slate-300 capitalize font-semibold" displayType='text' prefix={'Rp'} value={AutoCreateSpmResponse?.nilai || 0} />
                                        <p className='txt-font-12 text-slate-300 dark:text-slate-300'>Nilai</p>
                                    </div>
                                    <div className="col-span-12 mt-5">
                                        <p className="text-sm text-slate-800 dark:text-slate-300 capitalize font-semibold">{AutoCreateSpmResponse?.keterangan}</p>
                                        <p className='txt-font-12 text-slate-300 dark:text-slate-300'>Keterangan</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
};
export default VerifikasiModal;