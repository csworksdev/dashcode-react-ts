import { createRekapitulasiNpd } from '@/api/penatausahaan/rekapitulasi-npd';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import { useState } from 'react';
import Button from '@/components/ui/Button';
import toast from 'react-hot-toast';
import { FiCalendar, FiCloud, FiInfo, FiOctagon } from 'react-icons/fi';
import NominalFormat from '../NominalFormat';
import _ from 'lodash';
import { DateTime } from 'luxon';

type Props = {
    SelectedData: ResponseNpdListTypes
    Payload: MainPayloadCreateRecapType
    setPayload: (data: any) => void
    ToogleConfirmationModal: boolean
    setToogleConfirmationModal: (toogle: boolean) => void
}

const ConfirmationCreateRecap = (props: Props) => {
    const { SelectedData, Payload, setPayload, ToogleConfirmationModal, setToogleConfirmationModal } = props
    const [IsLoading, setIsLoading] = useState<boolean>(false);

    const handleCreateRekapitulasi = () => {
        setIsLoading(true)
        createRekapitulasiNpd(SelectedData.id_npd, Payload).then(function (res) {
            toast.success('Woah!.. Rekapitulasi berhasil dibuat')
            setToogleConfirmationModal(false)
        }).catch(function () {
            toast.error('Oops!.. Rekapitulasi tidak berhasil dibuat')
        }).finally(function () {
            setIsLoading(false)
        })
    };

    const removeRekening = (index: number, name: string, value: any) => {
        let data: any[] = [...Payload.items];
        data[index][name] = value;
        setPayload((prevObject: any) => ({
            ...prevObject, ...{
                ...prevObject.items,
                items: data
            }
        }))
    };

    return (
        <>
            <Modal blockScrollOnMount={false} isOpen={ToogleConfirmationModal} onClose={() => setToogleConfirmationModal(false)}>
                <ModalOverlay />
                <ModalContent maxWidth={700}>
                    <ModalHeader>Konfirmasi</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <div className="grid grid-cols-12 gap-3">
                            <div className="col-span-6">
                                <div className="mb-5">
                                    <div className="css-npa-nw-_2n-anga4">
                                        <FiCalendar color="#4669FA" strokeWidth={2} size={20} />
                                        <div>
                                            <p className="bold text-sm">Tanggal</p>
                                            <p className="font-normal mt-2 text-md">{Payload.tanggal_npd_rekap != null && Payload.tanggal_npd_rekap !== '' ? DateTime.fromISO(Payload.tanggal_npd_rekap).setLocale('id').toFormat('dd LLLL yyyy') : '-'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-6">
                                <div className="mb-5">
                                    <div className="css-npa-nw-_2n-anga4">
                                        <FiCloud color="#4669FA" strokeWidth={2} size={20} />
                                        <div>
                                            <p className="bold text-sm">Lampiran</p>
                                            <p className="font-normal mt-2 text-md">Terlampir</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12">
                                {
                                    Payload.items.map((item: MainPayloadCreateRecapItemsType, index: number) => {

                                        if (item.nilai_rekap === 0) {
                                            return
                                        }

                                        return (
                                            <div key={index} className='css-k-f9-2f-ac-34'>
                                                <div className='css-k-f9-2f-ac-3h' style={{ marginLeft: 0, minWidth: 250 }}>
                                                    <span className="inline-flex items-center">
                                                        <div className="container-icon-table-list">
                                                            <FiOctagon size={35} color="#FFCD4B" />
                                                        </div>
                                                        <div className="container-table-td-2-column">
                                                            <span className="text-sm text-slate-800 dark:text-slate-300 capitalize font-bold">{item.nama_akun}</span>
                                                            <span className="txt-font-12 text-slate-300 dark:text-slate-300">Kode: {item.kode_akun}</span>
                                                        </div>
                                                    </span>
                                                    <div className=''>
                                                        <NominalFormat className="text-sm text-slate-800 dark:text-slate-300 capitalize font-bold" displayType='text' prefix={'Rp'} value={item.nilai_rekap} />
                                                        <p className="text-right txt-font-12 text-slate-300 dark:text-slate-300">Nilai</p>
                                                    </div>
                                                </div>
                                                <Button onClick={() => removeRekening(index, 'nilai_rekap', 0)} className='btn btn-sm mt-3 btn-danger'>Hapus</Button>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className="col-span-12 mt-3">
                                <div className="mb-5">
                                    <div className="css-npa-nw-_2n-anga4">
                                        <FiInfo color="#4669FA" strokeWidth={2} size={20} />
                                        <div>
                                            <p className="bold text-sm">Keterangan</p>
                                            <p className="font-normal mt-2 text-md">{Payload.keterangan}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </ModalBody>
                    <ModalFooter>
                        <Button type="button" isLoading={IsLoading} onClick={() => handleCreateRekapitulasi()} className="btn btn-success me-2 border">Tambah Rekapitulasi</Button>
                        <Button type="button" onClick={() => setToogleConfirmationModal(false)} className="btn border">Batalkan</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
};
export default ConfirmationCreateRecap;