import Button from '@/components/ui/Button';
import toast from "react-hot-toast";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { LimitString } from "@/utils/stringConverter";
import { DateTime } from "luxon";
import { validasiPengajuanNpd, verifikasiPengajuanNpd } from '@/api/penatausahaan/pengajuan/npd';
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

const VerifikasiModal = (props: Props) => {
    const { Profile, SelectedData, ToogleValidationModal, handleGetData, setToogleValidationModal } = props
    const [IsLoading, setIsLoading] = useState<boolean>(false);
    const { control } = useForm<any>()
    const [Payload, setPayload] = useState<PayloadPersetujuanNpd>({
        verifikasi_disetujui: false,
        validasi_disetujui: false,
        tanggal_validasi_npd: '',
    });

    const handlePersetujuan = () => {
        setIsLoading(true)
        verifikasiPengajuanNpd(SelectedData.id_npd, Payload).then(function () {
            toast.success('Woah!.. Pengajuan NPD Berhasil Disetujui')
            handleGetData('diterima')
            setToogleValidationModal(false)
        }).finally(function () {
            setIsLoading(false)
        })
    };

    const handleValidasi = () => {
        setIsLoading(true)
        validasiPengajuanNpd(SelectedData.id_npd, Payload).then(function () {
            toast.success('Woah!.. Pengajuan NPD Berhasil Divalidasi')
            handleGetData('diterima')
            setToogleValidationModal(false)
        }).finally(function () {
            setIsLoading(false)
        })
    };

    useEffect(() => {
        console.log('Payload', Payload)
    }, [Payload])

    return (
        <>
            <Modal blockScrollOnMount={false} isOpen={ToogleValidationModal} onClose={() => setToogleValidationModal(false)}>
                <ModalOverlay />
                <ModalContent maxWidth={450}>
                    <ModalHeader>
                        {
                            Profile.id_role === ROLE_PENGGUNA_ANGGARAN || Profile.id_role === ROLE_KUASA_PENGGUNA_ANGGARAN ?
                                <span>Setujui Pengajuan (NPD)</span> :
                                <span>Validasi Pengajuan (NPD)</span>
                        }

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
                                <div className="col-span-12 mt-3">
                                    {
                                        (Profile != null && Profile.id_role === ROLE_PENGGUNA_ANGGARAN || Profile.id_role === ROLE_KUASA_PENGGUNA_ANGGARAN) ? 
                                        <Controller
                                        name={'kategori_rekanan'}
                                        control={control}
                                        render={({ field: { name } }) => (
                                            <RadioGroup>
                                                <Radio checked={Payload.verifikasi_disetujui === true} value={0} onChange={(e) => {
                                                    setPayload((prevObject: any) => ({ ...prevObject, ...{ verifikasi_disetujui: true } }))
                                                }} id="pns" name={name}>
                                                    <div className="css-noc-e_c-ja-fw">
                                                        <FiCheckCircle color="#50C793" strokeWidth={3} />
                                                        <p className="text-md css-nicW_aj-j2wqa-a capitalize font-bold">Setujui</p>
                                                    </div>
                                                </Radio>
                                                <Radio checked={Payload.verifikasi_disetujui === false} value={1} onChange={(e) => {
                                                    setPayload((prevObject: any) => ({ ...prevObject, ...{ verifikasi_disetujui: false } }))
                                                }} id="non-pns" name={name}>
                                                    <div className="css-noc-e_c-ja-fw">
                                                        <FiXCircle color="#FF2E63" strokeWidth={3} />
                                                        <p className="text-md css-nicW_aj-j2wqa-3 capitalize font-bold">Tolak</p>
                                                    </div>
                                                </Radio>
                                            </RadioGroup>
                                        )}
                                    /> :
                                    <Controller
                                        name={'kategori_rekanan'}
                                        control={control}
                                        render={({ field: { name } }) => (
                                            <RadioGroup>
                                                <Radio checked={Payload.validasi_disetujui === true} value={0} onChange={(e) => {
                                                        setPayload((prevObject: any) => ({ ...prevObject, ...{ validasi_disetujui: true } }))
                                                }} id="pns" name={name}>
                                                    <div className="css-noc-e_c-ja-fw">
                                                        <FiCheckCircle color="#50C793" strokeWidth={3} />
                                                        <p className="text-md css-nicW_aj-j2wqa-a capitalize font-bold">Setujui</p>
                                                    </div>
                                                </Radio>
                                                <Radio checked={Payload.validasi_disetujui === false} value={1} onChange={(e) => {
                                                        setPayload((prevObject: any) => ({ ...prevObject, ...{ validasi_disetujui: false } }))
                                                }} id="non-pns" name={name}>
                                                    <div className="css-noc-e_c-ja-fw">
                                                        <FiXCircle color="#FF2E63" strokeWidth={3} />
                                                        <p className="text-md css-nicW_aj-j2wqa-3 capitalize font-bold">Tolak</p>
                                                    </div>
                                                </Radio>
                                            </RadioGroup>
                                        )}
                                    />
                                    }
                                    
                                </div>
                                <div className="col-span-12 mt-3">
                                    <label htmlFor="tgl_lahir" className="block capitalize form-label">Tanggal</label>
                                    <Flatpickr
                                        data-enable-time={false}
                                        className='css-nc-c_DatePicker-C_a'
                                        placeholder='Pilih tanggal disini'
                                        // value={value}
                                        onChange={([date]) => {
                                            const originalDate = new Date(date);
                                            const year = originalDate.getFullYear();
                                            const month = (originalDate.getMonth() + 1).toString().padStart(2, '0');
                                            const day = originalDate.getDate().toString().padStart(2, '0');
                                            const supportDate = year + '-' + month + '-' + day
                                            // setTanggal(supportDate)
                                            setPayload((prevObject: any) => ({ ...prevObject, ...{ tanggal_validasi_npd: supportDate } }))
                                        }}
                                    />

                                </div>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        {
                            Profile.id_role === ROLE_PENGGUNA_ANGGARAN || Profile.id_role === ROLE_KUASA_PENGGUNA_ANGGARAN ?
                                <Button type="button" isLoading={IsLoading} onClick={() => handlePersetujuan()} className="btn btn-success me-2 border">Setujui Sekarang</Button> :
                                <Button type="button" isLoading={IsLoading} onClick={() => handleValidasi()} className="btn btn-success me-2 border">Validasi Sekarang</Button>
                        }


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
export default VerifikasiModal;