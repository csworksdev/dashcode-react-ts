import Button from '@/components/ui/Button';
import useProfile from '@/hooks/useProfile';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import NominalFormat from '../NominalFormat';
import FormRekanan from './FormRekanan';
import Flatpickr from "react-flatpickr";
import ScrollableTable from '../tables/ScrollableTable';
import ConfirmationCreateRecap from './ConfirmationCreateRecap';
import { getListDetailNpd } from '@/api/penatausahaan/rekapitulasi-npd';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { FilePond, registerPlugin } from "react-filepond";
import { DateTime } from 'luxon';
import { FiArrowDownRight, FiArrowUpRight, FiFilePlus, FiFileText, FiOctagon } from 'react-icons/fi';

registerPlugin(FilePondPluginFileValidateType);
registerPlugin(FilePondPluginFileValidateSize);
registerPlugin(FilePondPluginFileEncode);

type Props = {
    SelectedData: ResponseNpdListTypes;
    ToogleViewRecapModal: boolean;
    setToogleViewRecapModal: (toogle: boolean) => void;
}

const CreateRecap = (props: Props) => {
    const { SelectedData, ToogleViewRecapModal, setToogleViewRecapModal } = props
    const [Response, setResponse] = useState<ResponseListDetailNpd[]>([]);
    const [IsLoading, setIsLoading] = useState<boolean>(false);
    const [Profile] = useProfile();
    // const acceptedFileTypes = ['image/png', 'image/jpg', 'image/jpeg'];
    const [TotalPertanggungjawaban, setTotalPertanggungjawaban] = useState<number>(0);
    const acceptedFileTypes = ['application/pdf'];
    const [ToogleConfirmationModal, setToogleConfirmationModal] = useState<boolean>(false);
    const [Payload, setPayload] = useState<MainPayloadCreateRecapType>({
        tanggal_npd_rekap: '',
        keterangan: '',
        lampiran_base64: '',
        no_rek_rekanan: '',
        items: [],
    });

    useEffect(() => {
        if (Profile != null && ToogleViewRecapModal === true) {
            handleGetData()
        }
    }, [Profile, ToogleViewRecapModal])

    const handleGetData = () => {
        setIsLoading(true)
        getListDetailNpd(SelectedData.id_npd).then(function (res) {
            const response: ResponseListDetailNpd[] = res.data
            setResponse(response)

            let mockPayloadItem: MainPayloadCreateRecapType = {
                tanggal_npd_rekap: '',
                keterangan: '',
                lampiran_base64: '',
                no_rek_rekanan: '',
                items: [],
            }

            let sumPertanggungjawaban = 0
            for (let i = 0; i < response.length; i++) {
                mockPayloadItem.items.push({
                    id_npd_detail: response[i].id_npd_detail,
                    nilai_rekap: 0,
                    nama_akun: response[i].nama_akun,
                    kode_akun: response[i].kode_akun,
                })
                sumPertanggungjawaban += response[i].total_pertanggungjawaban
            }
            setTotalPertanggungjawaban(sumPertanggungjawaban)
            setPayload(mockPayloadItem)
        }).finally(function () {
            setIsLoading(false)
        })
    };

    useEffect(() => {
        console.log('Payload', Payload)
    }, [Payload])

    const handleFileChange = (index: number, files: any) => {
        let reader = new FileReader();
        reader.readAsDataURL(files[0].file);
        reader.onload = function () {
            let result = String(reader.result)
            let newResult = result.split(',').pop();
            setPayload((prevObject: any) => ({ ...prevObject, ...{ lampiran_base64: newResult } }))
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    };

    const handleFormChange = (index: number, name: string, value: any) => {
        let data: any[] = [...Payload.items];
        data[index][name] = value;
        setPayload((prevObject: any) => ({ ...prevObject, ...{ 
            ...prevObject.items,
            items: data
         } }))
    }

    // const handleCreateRekapitulasi = () => {
    //     let mockPayload = Payload
    //     mockPayload.items = PayloadItem
    //     setIsLoading(true)
    //     createRekapitulasiNpd(SelectedData.id_npd, mockPayload).then(function (res) {
    //         toast.success('Woah!.. Rekapitulasi berhasil dibuat')
    //         setToogleViewRecapModal(false)
    //     }).catch(function (error) {
    //         toast.error('Oops!.. Rekapitulasi tidak berhasil dibuat')

    //     }).finally(function () {
    //         setIsLoading(false)

    //     })
    // };

    const DateOptions = {
        weekNumbers: true,
        altFormat: "F j, Y",
        maxDate: "today",
        dateFormat: "d F Y - H:i K",
    }

    return (
        <>
            <Modal blockScrollOnMount={false} isOpen={ToogleViewRecapModal} onClose={() => setToogleViewRecapModal(false)}>
                <ModalOverlay />
                <ModalContent maxWidth={700}>
                    <ModalHeader>Buat Pertanggungjawaban</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <div className="grid grid-cols-12">
                            <div className="col-span-12 mt-0 border-bottom pb-5">
                                <div className="grid grid-cols-12 gap-5">
                                    <div className="col-span-12 mt-0">
                                        <div style={{ minWidth: 300 }}>
                                            <span className="inline-flex items-center">
                                                <span className="account-user-image ltr:mr-3 rtl:ml-3 flex-none">
                                                    <img src="/assets/images/general/rekapitulasi-npd.png" alt={SelectedData.nomor_npd} className="object-cover w-full h-full rounded-md" />
                                                </span>
                                                <div className="container-table-td-2-column">
                                                    <span className="text-sm text-slate-800 dark:text-slate-300 capitalize font-bold">{SelectedData.nomor_npd}</span>
                                                    <div className='info-rak-belanja-header'>
                                                        <div className={`badge badge-primary me-2`}>
                                                            <span className='css-ncf-anw-fna-wa2'>Tanggal: {DateTime.fromISO(SelectedData.tanggal_npd).setLocale('id').toFormat('dd LLLL yyyy')}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col-span-6 mt-0">
                                        <div className='css-k-f9-2f-ac-2h'>
                                            <img src="/assets/images/general/npd.png" className='rounded-md' width={40} alt="" />
                                            <div>
                                                <NominalFormat className="text-sm text-slate-800 dark:text-slate-300 capitalize font-bold" displayType='text' prefix={'Rp'} value={SelectedData.nilai_npd_disetujui} />
                                                <p className='font-12 font-semibold text-slate-600 dark:text-slate-300'>Total NPD</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-6 mt-0">
                                        <div className='css-k-f9-2f-ac-2h'>
                                            <img src="/assets/images/general/rekapitulasi-npd.png" className='rounded-md' width={40} alt="" />
                                            <div>
                                                <NominalFormat className="text-sm text-slate-800 dark:text-slate-300 capitalize font-bold" displayType='text' prefix={'Rp'} value={TotalPertanggungjawaban} />
                                                <p className='font-12 font-semibold text-slate-600 dark:text-slate-300'>Total Rekapitulasi</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 mt-5">
                                <div className="grid grid-cols-12 gap-5">
                                    <div className="col-span-12 mt-5">
                                        <label className="block capitalize form-label">Kegiatan</label>
                                        {
                                            Response != null && Response.length > 0 ?
                                                <div className="border w-100 p-3" style={{ borderRadius: 5 }}>
                                                    <div >
                                                        <span className="inline-flex items-center">
                                                            <span className="ltr:mr-3 rtl:ml-3 flex-none">
                                                                <FiFilePlus color="#FF6969" size={30} />
                                                            </span>
                                                            <div className="container-table-td-2-column">
                                                                <span className="text-sm text-slate-800 dark:text-slate-300 capitalize font-bold">{Response[0].nama_giat}</span>
                                                                <span className="txt-font-12 text-slate-300 dark:text-slate-300">{Response[0].kode_giat}</span>
                                                            </div>
                                                        </span>
                                                    </div>
                                                </div> : null
                                        }
                                    </div>
                                    <div className="col-span-12 mt-5">
                                        <label className="block capitalize form-label">Sub Kegiatan</label>
                                        {
                                            Response != null && Response.length > 0 ?
                                                <div className="border w-100 p-3" style={{ borderRadius: 5 }}>
                                                    <div >
                                                        <span className="inline-flex items-center">
                                                            <span className="ltr:mr-3 rtl:ml-3 flex-none">
                                                                <FiFileText color="#4669fa" size={30} />
                                                            </span>
                                                            <div className="container-table-td-2-column">
                                                                <span className="text-sm text-slate-800 dark:text-slate-300 capitalize font-bold">{Response[0].nama_sub_giat}</span>
                                                                <span className="txt-font-12 text-slate-300 dark:text-slate-300">{Response[0].kode_sub_giat}</span>
                                                            </div>
                                                        </span>
                                                    </div>
                                                </div> : null
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-12 mt-5">
                                <label htmlFor="" className="block capitalize form-label">Tanggal</label>
                                <Flatpickr
                                    data-enable-time={false}
                                    className='css-nc-c_DatePicker-C_a'
                                    placeholder='Pilih tanggal disini ...'
                                    options={DateOptions}
                                    onChange={([date]) => {
                                        const originalDate = new Date(date);
                                        const year = originalDate.getFullYear();
                                        const month = (originalDate.getMonth() + 1).toString().padStart(2, '0');
                                        const day = originalDate.getDate().toString().padStart(2, '0');
                                        const supportDate = year + '-' + month + '-' + day
                                        setPayload((prevObject: any) => ({ ...prevObject, ...{ tanggal_npd_rekap: supportDate } }))
                                    }}
                                />
                            </div>

                            <div className="col-span-12 mt-7">
                                <label className="block capitalize form-label">Lampiran</label>
                                <FilePond
                                    allowReorder={true}
                                    allowFileSizeValidation={true}
                                    maxFileSize={'1MB'}
                                    allowFileEncode={true}
                                    labelMaxFileSizeExceeded={'File terlalu besar'}
                                    labelMaxFileSize={'Ukuran maksimal file yang dapat diunggah adalah 1MB'}
                                    acceptedFileTypes={acceptedFileTypes}
                                    onupdatefiles={fileItems => {
                                        handleFileChange(0, fileItems)
                                    }}
                                    instantUpload={false}
                                    labelFileTypeNotAllowed={'File Tidak Valid'}
                                    labelIdle='Seret dan Lepaskan file Anda atau <span class="filepond--label-action">Pilih Disini</span>'
                                />
                            </div>
                            <div className="col-span-12 mt-0">
                                <div className="mb-3">
                                    <FormRekanan
                                        mainIndex={0}
                                        setPayload={setPayload}
                                    />
                                </div>
                            </div>

                            <div className="col-span-12 mt-3">
                                <label className="block capitalize form-label">Belanja</label>
                                <div className='border p-2 rounded-md'>
                                    <ScrollableTable>
                                        <thead>
                                            <tr>
                                                <th className="table-th table-thd">Belanja</th>
                                                <th className="table-th table-thd">Nilai NPD</th>
                                                <th className="table-th table-thd">Nilai</th>
                                                <th className="table-th table-thd">Total Pertanggungjawaban</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700 ">
                                            {
                                                Response && Response.map((item: any, index: number) => {
                                                    return (
                                                        <>
                                                            <tr>
                                                                <td className="table-td py-2" >
                                                                    <div style={{ marginLeft: 0, minWidth: 250 }}>
                                                                        <span className="inline-flex items-center">
                                                                            <div className="container-icon-table-list">
                                                                                <FiOctagon size={35} color="#FFCD4B" />
                                                                            </div>
                                                                            <div className="container-table-td-2-column">
                                                                                <span className="text-sm text-slate-800 dark:text-slate-300 capitalize font-bold">{item.nama_akun}</span>
                                                                                <span className="txt-font-12 text-slate-300 dark:text-slate-300">Kode: {item.kode_akun}</span>
                                                                            </div>
                                                                        </span>
                                                                    </div>
                                                                </td>
                                                                <td className="table-td py-2">
                                                                    <div style={{ minWidth: 100 }}>
                                                                        <span className="inline-flex">
                                                                            <div className="container-icon-table-list">
                                                                                <FiArrowUpRight size={25} color="#FF4B91" />
                                                                            </div>
                                                                            <div className="container-table-td-2-column">
                                                                                <NominalFormat className="text-sm text-slate-800 dark:text-slate-300 capitalize font-bold" displayType='text' prefix={'Rp'} value={item.nilai_npd_detail_disetujui} />
                                                                            </div>
                                                                        </span>
                                                                    </div>
                                                                </td>
                                                                <td className="table-td py-2">
                                                                    <div style={{ minWidth: 200 }}>
                                                                        <div className="mb-3">
                                                                            <NominalFormat className="form-control p-3 bold" displayType='input' prefix={'Rp'} value={Payload.items[index].nilai_rekap} onValueChange={(e) => {
                                                                                handleFormChange(index, 'nilai_rekap', e.floatValue)
                                                                            }} />
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className="table-td py-2">
                                                                    <div style={{ width: 200 }}>
                                                                        <span className="inline-flex">
                                                                            <div className="container-icon-table-list">
                                                                                <FiArrowDownRight size={25} color="#4669fa" />
                                                                            </div>
                                                                            <div className="container-table-td-2-column">
                                                                                <NominalFormat className="text-sm text-slate-800 dark:text-slate-300 capitalize font-bold" displayType='text' prefix={'Rp'} value={item.total_pertanggungjawaban} />
                                                                            </div>
                                                                        </span>
                                                                    </div>
                                                                </td>
                                                            </tr>

                                                        </>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </ScrollableTable>
                                </div>
                            </div>
                            <div className="col-span-12 mt-7">
                                <label htmlFor="" className="block capitalize form-label">Keterangan</label>
                                <Textarea onChange={(e: any) => {
                                    setPayload((prevObject: any) => ({ ...prevObject, ...{ keterangan: e.target.value } }))
                                }} />
                            </div>
                        </div>

                        <ConfirmationCreateRecap
                            SelectedData={SelectedData}
                            Payload={Payload}
                            setPayload={setPayload}
                            ToogleConfirmationModal={ToogleConfirmationModal}
                            setToogleConfirmationModal={setToogleConfirmationModal}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button type="button" isLoading={IsLoading} onClick={() => setToogleConfirmationModal(true)} className="btn btn-primary me-2 border">Konfirmasi</Button>
                        <Button
                            type="button"
                            onClick={() => setToogleViewRecapModal(false)}
                            className="btn border"
                        >Batalkan</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
};
export default CreateRecap;