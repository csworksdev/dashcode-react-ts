import { getReportSp2d, transferSp2dManual } from '@/api/penatausahaan/sp2d';
import Button from '@/components/ui/Button';
import { LimitString, ToTitleCase } from '@/utils/stringConverter';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea } from '@chakra-ui/react';
import { DateTime } from 'luxon';
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast';
import { FiCalendar, FiCodesandbox, FiCpu, FiCreditCard, FiFileText, FiGrid, FiMinus, FiShoppingBag, FiUserCheck } from 'react-icons/fi';
import NominalFormat from '../NominalFormat';
import CheckboxCustomSmallMargin from '@/components/ui/CheckboxCustomSmallMargin';

type Props = {
    SelectedData: ListSp2dResponseType;
    ToogleModal: boolean;
    IsLoading: boolean;
    setIsLoading: (loading: boolean) => void;
    setToogleModal: (toogle: boolean) => void;
    handleGetData: (tab: DocumentTransactionBasicFilterType, type: DocumentTransactionBasicType) => void
    setSelectedTab: (tab: DocumentTransactionBasicFilterType) => void
}

const TransferModal = (props: Props) => {
    const { SelectedData, ToogleModal, setToogleModal, handleGetData, IsLoading, setIsLoading, setSelectedTab } = props
    const [ResponseDetail, setResponseDetail] = useState<ResponseSp2dReportType>();
    const [PencairanInfo, setPencairanInfo] = useState<PencairanInformasiType>();
    const [CheckboxChecked, setCheckboxChecked] = useState<boolean>(false);

    useEffect(() => {
        if (ToogleModal && SelectedData != null) {
            getDetailModal()
        }
    }, [ToogleModal, SelectedData])

    const getDetailModal = () => {
        setIsLoading(true)

        getReportSp2d(SelectedData.id_sp_2_d).then(function (res) {
            const response: ResponseSp2dReportType = res.data

            let pencairanMock: any = {}
            if (response.jenis === 'UP') {
                pencairanMock = {
                    no_rek_pengirim: response.up.nomor_rekening,
                    nama_bank_pengirim: response.up.nama_bank,
                    no_rek_penerima: response.up.no_rek_bp_bpp,
                    nama_bank_penerima: response.up.bank_bp_bpp,
                    nama_penerima: response.up.nama_rek_bp_bpp,
                    bulan: DateTime.fromISO(response.up.tanggal_sp_2_d).setLocale('id').toFormat('LLLL'),
                    tahun: DateTime.fromISO(response.up.tanggal_sp_2_d).setLocale('id').toFormat('yyyy'),
                    jenis: response.jenis,
                    nama_skpd: response.up.nama_skpd,
                    nomor_sp2d: response.up.nomor_sp_2_d,
                    npwp: response.up.npwp_bp_bpp,
                    nilai: response.up.nilai_sp2d,
                    netto: 0,
                    potongan: []
                }
            } else if (response.jenis === 'LS') {
                pencairanMock = {
                    no_rek_pengirim: response.ls.header.nomor_rekening,
                    nama_bank_pengirim: response.ls.header.nama_bank,
                    nama_penerima: response.ls.header.nama_rek_pihak_ketiga,
                    no_rek_penerima: response.ls.header.no_rek_pihak_ketiga,
                    nama_bank_penerima: response.ls.header.bank_pihak_ketiga,
                    bulan: DateTime.fromISO(response.ls.header.tanggal_sp_2_d).setLocale('id').toFormat('LLLL'),
                    tahun: DateTime.fromISO(response.ls.header.tanggal_sp_2_d).setLocale('id').toFormat('yyyy'),
                    jenis: response.jenis,
                    nama_skpd: response.ls.header.nama_skpd,
                    nomor_sp2d: response.ls.header.nomor_sp_2_d,
                    npwp: response.ls.header.npwp_pihak_ketiga,
                    nilai: response.ls.header.nilai_sp2d,
                    netto: countNetto(response.ls.pajak_potongan, response.ls.header.nilai_sp2d),
                    potongan: response.ls.pajak_potongan
                }
            }
            setPencairanInfo(pencairanMock)

            setResponseDetail(res.data)
        }).catch(function (error) {

        }).finally(function () {
            setIsLoading(false)
        })
    };

    const countNetto = (pajak_potongan: PajakPotonganSp2dReportLsType[], nilai_sp2d: number) => {
        let sum = 0
        for (let i = 0; i < pajak_potongan.length; i++) {
            sum += pajak_potongan[i].nilai_sp2d_pajak_potongan
        }
        return nilai_sp2d - sum
    };

    const handleTransferSp2d = () => {

        if (SelectedData == null) {
            return
        }

        setIsLoading(true)
        transferSp2dManual(SelectedData.id_sp_2_d).then(function (res) {
            toast.success('Woah!.. SP2D Berhasil di Transfer')
            setToogleModal(false)
            handleGetData('ditransfer', '')
        }).finally(function () {
            setIsLoading(false)
        })
    };

    return (
        <>
            <Modal blockScrollOnMount={false} isOpen={ToogleModal} onClose={() => setToogleModal(false)}>
                <ModalOverlay />
                <ModalContent maxWidth={450}>
                    <ModalHeader>Konfirmasi</ModalHeader>
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
                                            </div>
                                        </div>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="mb-10">
                            <p className="font-bold text-sm mt-4 mb-2">Informasi Pengirim</p>
                            <div className="css-nc--2-qa-c1a">
                                <div className="grid css-n0-bA0-ac-a pb-2 grid-cols-12 mb-3 w-100">
                                    <div className="col-span-6">
                                        <div className="css-j9caf-_q2-af">
                                            <FiCreditCard strokeWidth={1.5} size={16} />
                                            <p className="font-semibold font-12 css-j-c9a-A_af text-left">Nomor Rekening</p>
                                        </div>
                                    </div>
                                    <div className="col-span-6">
                                        {
                                            PencairanInfo != null ?
                                                <p className="font-bold font-12 text-right">{PencairanInfo.no_rek_pengirim}</p> :
                                                <div className=" animate-pulse">
                                                    <div className="animate" style={{ height: 20, width: '100%', borderRadius: 7 }}></div>
                                                </div>
                                        }
                                    </div>
                                </div>
                                <div className="grid grid-cols-12 w-100">
                                    <div className="col-span-6">
                                        <div className="css-j9caf-_q2-af">
                                            <FiCpu strokeWidth={1.5} size={16} />
                                            <p className="font-semibold css-j-c9a-A_af font-12 text-left">Nama Bank</p>
                                        </div>
                                    </div>
                                    <div className="col-span-6">
                                        {
                                            PencairanInfo != null ?
                                                <p className="font-bold font-12 text-right">{PencairanInfo.nama_bank_pengirim}</p> :
                                                <div className=" animate-pulse">
                                                    <div className="animate" style={{ height: 20, width: '100%', borderRadius: 7 }}></div>
                                                </div>
                                        }
                                    </div>
                                </div>
                            </div>

                            <p className="font-bold text-sm mt-4 mb-2">Informasi Penerima</p>
                            <div className="css-nc--2-qa-c1a">
                                <div className="grid css-n0-bA0-ac-a pb-2 grid-cols-12 mb-3 w-100">
                                    <div className="col-span-6">
                                        <div className="css-j9caf-_q2-af">
                                            <FiCodesandbox strokeWidth={1.5} size={16} />
                                            <p className="font-semibold font-12 css-j-c9a-A_af text-left">Nama Rekening</p>
                                        </div>
                                    </div>
                                    <div className="col-span-6">
                                        {
                                            PencairanInfo != null ?
                                                <p className="font-bold font-12 text-right">{PencairanInfo.nama_penerima}</p> :
                                                <div className=" animate-pulse">
                                                    <div className="animate" style={{ height: 20, width: '100%', borderRadius: 7 }}></div>
                                                </div>
                                        }
                                    </div>
                                </div>
                                <div className="grid css-n0-bA0-ac-a pb-2 grid-cols-12 mb-3 w-100">
                                    <div className="col-span-6">
                                        <div className="css-j9caf-_q2-af">
                                            <FiCreditCard strokeWidth={1.5} size={16} />
                                            <p className="font-semibold font-12 css-j-c9a-A_af text-left">Nomor Rekening</p>
                                        </div>
                                    </div>
                                    <div className="col-span-6">
                                        {
                                            PencairanInfo != null ?
                                                <p className="font-bold font-12 text-right">{PencairanInfo.no_rek_penerima}</p> :
                                                <div className=" animate-pulse">
                                                    <div className="animate" style={{ height: 20, width: '100%', borderRadius: 7 }}></div>
                                                </div>
                                        }
                                    </div>
                                </div>
                                <div className="grid grid-cols-12 w-100">
                                    <div className="col-span-6">
                                        <div className="css-j9caf-_q2-af">
                                            <FiCpu strokeWidth={1.5} size={16} />
                                            <p className="font-semibold css-j-c9a-A_af font-12 text-left">Nama Bank</p>
                                        </div>
                                    </div>
                                    <div className="col-span-6">
                                        {
                                            PencairanInfo != null ?
                                                <p className="font-bold font-12 text-right">{PencairanInfo.nama_bank_penerima}</p> :
                                                <div className=" animate-pulse">
                                                    <div className="animate" style={{ height: 20, width: '100%', borderRadius: 7 }}></div>
                                                </div>
                                        }
                                    </div>
                                </div>
                            </div>

                            <p className="font-bold text-sm mt-4 mb-2">Informasi Detail SP2D</p>
                            <div className="css-nc--2-qa-c1a">
                                <div className="grid css-n0-bA0-ac-a pb-2 grid-cols-12 mb-3 w-100">
                                    <div className="col-span-6">
                                        <div className="css-j9caf-_q2-af">
                                            <FiCreditCard strokeWidth={1.5} size={16} />
                                            <p className="font-semibold font-12 css-j-c9a-A_af text-left">Bulan</p>
                                        </div>
                                    </div>
                                    <div className="col-span-6">
                                        {
                                            PencairanInfo != null ?
                                                <p className="font-bold font-12 text-right">{PencairanInfo.bulan}</p> :
                                                <div className=" animate-pulse">
                                                    <div className="animate" style={{ height: 20, width: '100%', borderRadius: 7 }}></div>
                                                </div>
                                        }
                                    </div>
                                </div>
                                <div className="grid css-n0-bA0-ac-a pb-2 grid-cols-12 mb-3 w-100">
                                    <div className="col-span-6">
                                        <div className="css-j9caf-_q2-af">
                                            <FiCalendar strokeWidth={1.5} size={16} />
                                            <p className="font-semibold css-j-c9a-A_af font-12 text-left">Tahun</p>
                                        </div>
                                    </div>
                                    <div className="col-span-6">
                                        {
                                            PencairanInfo != null ?
                                                <p className="font-bold font-12 text-right">{PencairanInfo.tahun}</p> :
                                                <div className=" animate-pulse">
                                                    <div className="animate" style={{ height: 20, width: '100%', borderRadius: 7 }}></div>
                                                </div>
                                        }
                                    </div>
                                </div>
                                <div className="grid css-n0-bA0-ac-a pb-2 grid-cols-12 mb-3 w-100">
                                    <div className="col-span-6">
                                        <div className="css-j9caf-_q2-af">
                                            <FiFileText strokeWidth={1.5} size={16} />
                                            <p className="font-semibold css-j-c9a-A_af font-12 text-left">Jenis</p>
                                        </div>
                                    </div>
                                    <div className="col-span-6">
                                        {
                                            PencairanInfo != null ?
                                                <p className="font-bold font-12 text-right">{PencairanInfo.jenis === 'UP' ? 'Uang Persediaan' : 'Langsung'}</p> :
                                                <div className=" animate-pulse">
                                                    <div className="animate" style={{ height: 20, width: '100%', borderRadius: 7 }}></div>
                                                </div>
                                        }
                                    </div>
                                </div>
                                <div className="grid css-n0-bA0-ac-a pb-2 grid-cols-12 mb-3 w-100">
                                    <div className="col-span-6">
                                        <div className="css-j9caf-_q2-af">
                                            <FiUserCheck strokeWidth={1.5} size={16} />
                                            <p className="font-semibold css-j-c9a-A_af font-12 text-left">Nama SKPD</p>
                                        </div>
                                    </div>
                                    <div className="col-span-6">
                                        {
                                            PencairanInfo != null ?
                                                <p className="font-bold font-12 text-right">{ToTitleCase(PencairanInfo.nama_skpd)}</p> :
                                                <div className=" animate-pulse">
                                                    <div className="animate" style={{ height: 20, width: '100%', borderRadius: 7 }}></div>
                                                </div>
                                        }
                                    </div>
                                </div>
                                <div className="grid css-n0-bA0-ac-a pb-2 grid-cols-12 mb-3 w-100">
                                    <div className="col-span-6">
                                        <div className="css-j9caf-_q2-af">
                                            <FiGrid strokeWidth={1.5} size={16} />
                                            <p className="font-semibold css-j-c9a-A_af font-12 text-left">Nomor SP2D</p>
                                        </div>
                                    </div>
                                    <div className="col-span-6">
                                        {
                                            PencairanInfo != null ?
                                                <p className="font-bold font-12 text-right">{PencairanInfo.nomor_sp2d}</p> :
                                                <div className=" animate-pulse">
                                                    <div className="animate" style={{ height: 20, width: '100%', borderRadius: 7 }}></div>
                                                </div>
                                        }
                                    </div>
                                </div>
                                {/* <div className="grid css-n0-bA0-ac-a pb-2 grid-cols-12 mb-3 w-100">
                                    <div className="col-span-6">
                                        <div className="css-j9caf-_q2-af">
                                            <FiUsers strokeWidth={1.5} size={16} />
                                            <p className="font-semibold css-j-c9a-A_af font-12 text-left">Nama NPWP SKPD</p>
                                        </div>
                                    </div>
                                    <div className="col-span-6">
                                        {
                                            ResponseDetail != null ?
                                                <p className="font-bold font-12 text-right">{LimitString(ResponseDetail.up.nama_bp_bpp, 20)}</p> :
                                                <div className=" animate-pulse">
                                                    <div className="animate" style={{ height: 20, width: '100%', borderRadius: 7 }}></div>
                                                </div>
                                        }
                                    </div>
                                </div> */}
                                <div className="grid css-n0-bA0-ac-a pb-2 grid-cols-12 mb-3 w-100">
                                    <div className="col-span-6">
                                        <div className="css-j9caf-_q2-af">
                                            <FiCodesandbox strokeWidth={1.5} size={16} />
                                            <p className="font-semibold css-j-c9a-A_af font-12 text-left">Nomor NPWP SKPD</p>
                                        </div>
                                    </div>
                                    <div className="col-span-6">
                                        {
                                            PencairanInfo != null ?
                                                <p className="font-bold font-12 text-right">{LimitString(PencairanInfo.npwp, 20)}</p> :
                                                <div className=" animate-pulse">
                                                    <div className="animate" style={{ height: 20, width: '100%', borderRadius: 7 }}></div>
                                                </div>
                                        }
                                    </div>
                                </div>
                                <div className="grid css-n0-bA0-ac-a pb-2 grid-cols-12 mb-3 w-100">
                                    <div className="col-span-6">
                                        <div className="css-j9caf-_q2-af">
                                            <FiShoppingBag strokeWidth={1.5} size={16} />
                                            <p className="font-semibold css-j-c9a-A_af font-12 text-left">Nilai SP2D</p>
                                        </div>
                                    </div>
                                    <div className="col-span-6 text-right">
                                        <div className="css-na-0aena-nca">
                                            {
                                                PencairanInfo != null ?
                                                    <NominalFormat prefix="Rp" className="font-bold font-12 text-right" displayType="text" value={PencairanInfo.nilai} /> :
                                                    <div className=" animate-pulse">
                                                        <div className="animate" style={{ height: 20, width: '100%', borderRadius: 7 }}></div>
                                                    </div>
                                            }

                                        </div>
                                    </div>
                                </div>
                                {
                                    PencairanInfo != null && PencairanInfo.jenis === 'LS' ?
                                        <>
                                            <div className="grid css-n0-bA0-ac-a pb-2 grid-cols-12 mb-3 w-100">
                                                <div className="col-span-6">
                                                    <div className="css-j9caf-_q2-af">
                                                        <FiMinus strokeWidth={1.5} size={16} />
                                                        <p className="font-semibold css-j-c9a-A_af font-12 text-left">Netto</p>
                                                    </div>
                                                </div>
                                                <div className="col-span-6 text-right">
                                                    <div className="css-na-0aena-nca">
                                                        <NominalFormat prefix="Rp" className="font-bold font-12 text-right" displayType="text" value={PencairanInfo.netto} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="grid css-n0-bA0-ac-a pb-2 grid-cols-12 mb-3 w-100">
                                                <div className="col-span-6">
                                                    <div className="css-j9caf-_q2-af">
                                                        <FiMinus strokeWidth={1.5} size={16} />
                                                        <p className="font-semibold css-j-c9a-A_af font-12 text-left">Potongan</p>
                                                    </div>
                                                </div>
                                                <div className="col-span-6 text-right">
                                                    {
                                                        PencairanInfo.potongan.map((item: PajakPotonganSp2dReportLsType, index: number) => {
                                                            return (
                                                                <div key={index} className="css-na-0aena-nca mb-1">
                                                                    <span className='font-bold font-8 text-right me-2'>({item.nama_pajak_potongan})</span>
                                                                    <NominalFormat prefix="- Rp" className="font-bold font-8 text-right" displayType="text" value={item.nilai_sp2d_pajak_potongan} />
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        </> : null
                                }

                            </div>
                            <div>
                                <div className="css-dnia-n-qa-a css-moan-w-zam04a mt-5">
                                    <CheckboxCustomSmallMargin onChange={(e) => setCheckboxChecked(e.target.checked)} value={CheckboxChecked}></CheckboxCustomSmallMargin>
                                    <div className="css-nc-na-d-2sc2">
                                        <div className="css-8c-m2-cf-ak">
                                            <div className="css-anwf-awn-2_d">
                                                <p className="font-12 font-semibold text-slate-600 dark:text-slate-300 css-oc-a3-C-wa">Semua data sudah sesuai dan benar</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            type="button"
                            isLoading={IsLoading}
                            disabled={!CheckboxChecked}
                            onClick={() => handleTransferSp2d()}
                            className={`btn ${CheckboxChecked ? 'btn-success' : 'btn-light'} me-2 border`}
                        >Transfer Sekarang</Button>

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
export default TransferModal;