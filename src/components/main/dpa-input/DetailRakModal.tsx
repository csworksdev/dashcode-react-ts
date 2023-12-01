import { useEffect, useState } from 'react';
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { FiBox, FiCreditCard, FiDivideCircle, FiFileText, FiInfo, FiLayers, FiLock, FiMoon } from "react-icons/fi";
import { RakFormType } from '../../../pages/penatausahaan/types';
import { createPendapatan } from '@/api/penatausahaan/dpa/penerimaan/Pendapatan';
import toast from 'react-hot-toast';
import NominalFormat from '@/components/main/NominalFormat';
import { createDpaPenarikanBelanja } from '@/api/penatausahaan/dpa/penarikan/Belanja';
import Alert from '@/components/ui/Alert';
import { createPenerimaanPembiayaan } from '@/api/penatausahaan/dpa/penerimaan/PenerimaanPembiayaan';
import { createPengeluaranPembiayaan } from '@/api/penatausahaan/dpa/penarikan/PengeluaranPembiayaan';
import useProfile from '@/hooks/useProfile';
import { ROLE_KASUBAG_PROGRAM, ROLE_OPERATOR_OPD, ROLE_PPTK } from '@/constant/data';
import RakFormMonthModal from './RakFormMonthModal';
import RakFormSemesterModal from './RakFormSemesterModal';
import RakFormTriwulanModal from './RakFormTriwulanModal';

type Props = {
    idSkpd: Number;
    type?: string;
    SelectedPendapatan: any;
    KebijakanDetail: any;
    ToogleOpenUpdateModal: boolean;
    handleGetDetail: (sa?: any) => void;
    setToogleOpenUpdateModal: (toogle: boolean) => void;
}

const DetailRakModal = (props: Props) => {

    const { KebijakanDetail, idSkpd, type, SelectedPendapatan, ToogleOpenUpdateModal, handleGetDetail, setToogleOpenUpdateModal } = props

    const [Selisih, setSelisih] = useState<number>(SelectedPendapatan.nilai);
    const [TotalFormRak, setTotalFormRak] = useState<number>(SelectedPendapatan.total_rak);
    const [IsLoading, setIsLoading] = useState<boolean>(false);
    const [Profile] = useProfile();
    const [CanEdit, setCanEdit] = useState<boolean>(true);
    const fullMonth = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

    const yearsMonth = [
        ["Januari", "Februari", "Maret", "April", "Mei", "Juni"],
        ["Juli", "Agustus", "September", "Oktober", "November", "Desember"],
    ]

    const semesterMonth = [
        ["Januari", "Februari", "Maret", "April", "Mei", "Juni"],
        ["Juli", "Agustus", "September", "Oktober", "November", "Desember"],
    ]

    const triwulanMonth = [
        ["Januari", "Februari", "Maret"],
        ["April", "Mei", "Juni"],
        ["Juli", "Agustus", "September"],
        ["Oktober", "November", "Desember"]
    ]

    const [RakForms, setRakForms] = useState<RakFormType>({
        januari: 0,
        februari: 0,
        maret: 0,
        april: 0,
        mei: 0,
        juni: 0,
        juli: 0,
        agustus: 0,
        september: 0,
        oktober: 0,
        november: 0,
        desember: 0,
    });

    useEffect(() => {
        if (ToogleOpenUpdateModal) {
            if ((Profile!= null && Profile.id_role === ROLE_PPTK || Profile.id_role === ROLE_KASUBAG_PROGRAM || Profile.id_role === ROLE_OPERATOR_OPD) && SelectedPendapatan.is_valid_bud === 1) {
                setCanEdit(false)
            }
            setTotalFormRak(SelectedPendapatan.total_rak)
            setRakForms({
                januari: SelectedPendapatan.bulan[0],
                februari: SelectedPendapatan.bulan[1],
                maret: SelectedPendapatan.bulan[2],
                april: SelectedPendapatan.bulan[3],
                mei: SelectedPendapatan.bulan[4],
                juni: SelectedPendapatan.bulan[5],
                juli: SelectedPendapatan.bulan[6],
                agustus: SelectedPendapatan.bulan[7],
                september: SelectedPendapatan.bulan[8],
                oktober: SelectedPendapatan.bulan[9],
                november: SelectedPendapatan.bulan[10],
                desember: SelectedPendapatan.bulan[11],
            })
        }

    }, [ToogleOpenUpdateModal])

    useEffect(() => {
        const total = RakForms.januari + RakForms.februari + RakForms.maret + RakForms.april + RakForms.mei + RakForms.juni + RakForms.juli + RakForms.agustus + RakForms.september + RakForms.oktober + RakForms.november + RakForms.desember
        const count = total
        setTotalFormRak(count)
        handleAllFormValue()
    }, [RakForms])

    const handleAllFormValue = () => {
        let mockForm: any = RakForms
        let total = 0
        for (let i = 0; i < fullMonth.length; i++) {
            let value = mockForm[fullMonth[i].toLowerCase()]
            if (!isNaN(value)) {
                total += value
            }
        }
        const mockSelisih = SelectedPendapatan.nilai - total
        setSelisih(mockSelisih)
    };

    const handleRakFormsChange = (month: string, value: number) => {
        setRakForms(prevForms => ({
            ...prevForms,
            [month.toLowerCase()]: value,
        }));
    };
    const handleCreateUpdateRak = () => {
        const payload = {
            "b1": RakForms.januari,
            "b2": RakForms.februari,
            "b3": RakForms.maret,
            "b4": RakForms.april,
            "b5": RakForms.mei,
            "b6": RakForms.juni,
            "b7": RakForms.juli,
            "b8": RakForms.agustus,
            "b9": RakForms.september,
            "b10": RakForms.oktober,
            "b11": RakForms.november,
            "b12": RakForms.desember,
            "id_akun": SelectedPendapatan.id_akun,
            "id_sub_skpd": SelectedPendapatan.id_sub_skpd,
            "id_unit": SelectedPendapatan.id_unit,
            "id_skpd": idSkpd,
        }

        setIsLoading(true)

        if (type === 'pendapatan') {
            createPendapatan(SelectedPendapatan.id_rak_pendapatan, payload).then(function (res: any) {
                if (SelectedPendapatan.id_rak_pendapatan === 0) {
                    toast.success('Woah!.. RAK berhasil dibuat')
                } else {
                    toast.success('Woah!.. RAK berhasil diperbarui')
                }
                setToogleOpenUpdateModal(false)
                handleGetDetail()
            }).catch(function (error: any) {

            }).finally(function () {
                setIsLoading(false)
            })
        } else if (type === 'pembiayaan') {
            createPenerimaanPembiayaan(SelectedPendapatan.id_rak_pendapatan, payload).then(function (res: any) {
                if (SelectedPendapatan.id_rak_pendapatan === 0) {
                    toast.success('Woah!.. RAK berhasil dibuat')
                } else {
                    toast.success('Woah!.. RAK berhasil diperbarui')
                }
                setToogleOpenUpdateModal(false)
                handleGetDetail()
            }).catch(function (error: any) {

            }).finally(function () {
                setIsLoading(false)
            })
        } else if (type === 'penarikan-pembiayaan') {
            createPengeluaranPembiayaan(SelectedPendapatan.id_rak_pendapatan, payload).then(function (res: any) {
                if (SelectedPendapatan.id_rak_pendapatan === 0) {
                    toast.success('Woah!.. RAK berhasil dibuat')
                } else {
                    toast.success('Woah!.. RAK berhasil diperbarui')
                }
                setToogleOpenUpdateModal(false)
                handleGetDetail()
            }).catch(function (error: any) {

            }).finally(function () {
                setIsLoading(false)
            })
        } else if (type === 'belanja') {

            const payloadBelanja = {
                "b1": RakForms.januari,
                "b2": RakForms.februari,
                "b3": RakForms.maret,
                "b4": RakForms.april,
                "b5": RakForms.mei,
                "b6": RakForms.juni,
                "b7": RakForms.juli,
                "b8": RakForms.agustus,
                "b9": RakForms.september,
                "b10": RakForms.oktober,
                "b11": RakForms.november,
                "b12": RakForms.desember,
                "id_akun": SelectedPendapatan.id_akun,
                "id_giat": SelectedPendapatan.id_giat,
                "id_program": SelectedPendapatan.id_program,
                "id_skpd": idSkpd,
                "id_sub_skpd": SelectedPendapatan.id_sub_skpd,
                "id_sub_giat": SelectedPendapatan.id_sub_giat,
                "id_unit": SelectedPendapatan.id_unit,
                //   "id_skpd": SelectedPendapatan.id_akun,
                "id_urusan": SelectedPendapatan.id_urusan,
                "idbidang_urusan": SelectedPendapatan.idbidang_urusan,
            }

            createDpaPenarikanBelanja(SelectedPendapatan.id_rak_belanja, payloadBelanja).then(function (res: any) {
                if (SelectedPendapatan.id_rak_belanja === 0) {
                    toast.success('Woah!.. RAK berhasil dibuat')
                } else {
                    toast.success('Woah!.. RAK berhasil diperbarui')
                }
                setToogleOpenUpdateModal(false)
                handleGetDetail()
            }).catch(function (error: any) {

            }).finally(function () {
                setIsLoading(false)
            })
        } else {
            return
        }

    };

    // handleCreateUpdateRak()
    return (
        <>
            <Modal
                title="Detail Rencana Anggaran Kas (RAK)"
                label="Extra large modal"
                labelClass="btn-outline-dark"
                className="css-rak-cna-a-wf9-wa"
                activeModal={ToogleOpenUpdateModal}
                onClose={() => setToogleOpenUpdateModal(false)}
                footerContent={
                    <>
                        {
                            Selisih !== 0 &&
                            <div className='container-notification-selisih'>
                                <FiInfo color='#FF2E63' className='me-2' />
                                <p className='text-sm text-slate-800 dark:text-slate-300 text-danger css-fa-a-wjf2'>Selisih antara nilai anggaran dan RAK tidak diperbolehkan</p>
                            </div>
                        }
                        <Button
                            text={`${SelectedPendapatan.id_rak_pendapatan === 0 ? 'Simpan' : 'Simpan'}`}
                            className="btn-dark "
                            disabled={Selisih !== 0 || !CanEdit}
                            isLoading={IsLoading}
                            onClick={() => handleCreateUpdateRak()}
                        />
                        <Button
                            type="button"
                            isLoading={IsLoading}
                            text={`Batalkan`}
                            className="btn-border border mr-3 btn-base "
                            onClick={() => setToogleOpenUpdateModal(false)}
                        />
                    </>
                }
            >
                {
                    CanEdit === false ?
                <div className='alert-light-danger css-nan-_aw0-a mb-10'>
                    <FiLock size={30} color='#FF2E63' />
                    <div>
                        <p className='text-danger font-bold font-12'>Rencana Anggaran Kas (RAK) Sudah Terkunci</p>
                        <p className='font-12'>Dokumen ini sudah divalidasi oleh SKPD, SEKDA dan BUD sehingga perubahan sudah tidak dapat dilakukan</p>
                    </div>
                </div> : null
                }
                <div className="css-na-fnaw-fnaw-1">
                    <div className="container-icon-table-rak-list">
                        <FiFileText size={20} color="#4669fa" />
                    </div>
                    <h4 className="font-medium text-lg mb-0 text-slate-900">
                        {SelectedPendapatan.nama_akun}
                    </h4>
                </div>
                <div className="css-na-fa-3f0c">

                    <div className="container-card-detail-rak-modal">
                        <div className="card-detail-rak-modal">
                            <div className="css-k-caw-3rf">
                                <FiBox size={20} strokeWidth='1' className='me-2' />
                                <p className='label'>Total Nilai Anggaran</p>
                            </div>
                            <NominalFormat className='value' displayType={'text'} value={SelectedPendapatan.nilai} prefix={'Rp'} />
                        </div>
                        <div className="card-detail-rak-modal">
                            <div className="css-k-caw-3rf">
                                <FiCreditCard size={20} strokeWidth='1' className='me-2' />
                                <p className='label'>Total RAK</p>
                            </div>
                            <NominalFormat className='value' displayType={'text'} value={TotalFormRak} prefix={'Rp'} />
                        </div>
                    </div>
                    <div className="container-card-detail-rak-modal">
                        <div className="card-detail-rak-modal">
                            <div className="css-k-caw-3rf">
                                <FiDivideCircle size={20} strokeWidth='1' className='me-2' />
                                <p className='label'>Total Selisih</p>
                            </div>
                            <NominalFormat className='value' displayType={'text'} value={Selisih} prefix={'Rp'} />
                        </div>
                        <div className="card-detail-rak-modal">
                            <div className="css-k-caw-3rf">
                                <FiLayers size={20} strokeWidth='1' className='me-2' />
                                <p className='label'>Total Realisasi</p>
                            </div>
                            <NominalFormat className='value' displayType={'text'} value={0} prefix={'Rp'} />
                        </div>
                    </div>
                </div>
                {
                    Selisih < 0 &&
                    <div className='css-na-fn-awfj-wa'>
                        <FiInfo className='me-3' />
                        <p>Melebihi anggaran</p>
                    </div>
                }

                
                {/* <p className='mt-10' style={{ fontSize: 10 }}>Debug</p> */}
                {/* <Button onClick={() => setDebug(1)} className='btn btn-sm btn-light me-2'>Triwulan UI</Button>
                <Button onClick={() => setDebug(2)} className='btn btn-sm btn-light me-2'>Semester UI</Button>
                <Button onClick={() => setDebug(3)} className='btn btn-sm btn-light me-2'>Bulan UI</Button> */}

                <div className="text-base text-slate-600 dark:text-slate-300 mt-10">
                    {
                        KebijakanDetail != null ?
                            KebijakanDetail.nama_periode === 'Triwulan' ?
                                <RakFormTriwulanModal
                                    CanEdit={CanEdit}
                                    triwulanMonth={triwulanMonth}
                                    RakForms={RakForms}
                                    handleRakFormsChange={handleRakFormsChange}
                                /> :
                                KebijakanDetail.nama_periode === 'Semester' ?
                                    <RakFormSemesterModal
                                        CanEdit={CanEdit}
                                        semesterMonth={semesterMonth}
                                        RakForms={RakForms}
                                        handleRakFormsChange={handleRakFormsChange}
                                    /> :
                                    <RakFormMonthModal
                                        CanEdit={CanEdit}
                                        yearsMonth={yearsMonth}
                                        RakForms={RakForms}
                                        handleRakFormsChange={handleRakFormsChange}
                                    />
                            :
                            <Alert className='alert-danger'>Periode SPD tidak diketahui sehingga penginputan DPA tidak dapat dilakukan. Mohon pastikan bahwa Anda telah menentukan Periode SPD yang tersedia pada halaman Kebijakan SPD.</Alert>
                    }

                </div>
            </Modal>
        </>
    )
};
export default DetailRakModal;