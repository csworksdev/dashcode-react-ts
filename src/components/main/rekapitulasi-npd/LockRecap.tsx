import { lockRekapitulasiNpd } from '@/api/penatausahaan/rekapitulasi-npd';
import Button from '@/components/ui/Button';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import { useState } from 'react';
import { registerPlugin } from "react-filepond";
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import NominalFormat from '../NominalFormat';
import toast from 'react-hot-toast';
import VideoPlayer from '@/components/partials/widget/VideoPlayer';
import LockAnimation from '@/assets/animation/animation_1700462931075.json';

registerPlugin(FilePondPluginFileValidateType);
registerPlugin(FilePondPluginFileValidateSize);
registerPlugin(FilePondPluginFileEncode);

type Props = {
    SelectedData: ResponseNpdListTypes;
    ToogleViewRecapModal: boolean;
    setToogleViewRecapModal: (toogle: boolean) => void;
    handleGetData: (tab: any) => void;
}

const LockRecap = (props: Props) => {
    const { SelectedData, ToogleViewRecapModal, setToogleViewRecapModal, handleGetData } = props
    const [IsLoading, setIsLoading] = useState<boolean>(false);

    const handleLockRekapitulasi = () => {
        setIsLoading(true)
        lockRekapitulasiNpd(SelectedData.id_npd).then(function (res) {
            toast.success('Woah!.. Rekapitulasi berhasil dikunci')
            setToogleViewRecapModal(false)
            handleGetData('data-npd-selesai')
        }).catch(function (error) {
            toast.error('Oops!.. Rekapitulasi tidak berhasil dikunci')

        }).finally(function () {
            setIsLoading(false)

        })
    };

    return (
        <>
            <Modal blockScrollOnMount={false} isOpen={ToogleViewRecapModal} onClose={() => setToogleViewRecapModal(false)}>
                <ModalOverlay />
                <ModalContent maxWidth={500}>
                    <ModalHeader>Kunci Rekapitulasi</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <div className="container-delete-modal">
                            <div className="container-delete-modal-player">
                                <VideoPlayer loop animationData={LockAnimation} play style={{ width: 350, height: 250 }} />
                            </div>
                            <p className='text-center text-md font-bold mt-2'>Total Rekapiluasi yang akan dibayarkan <span className='text-danger'>kurang</span> dari nilai NPD, Apakah Anda yakin ingin menyelesaikan rekapitulasi NPD ini?</p>
                            <div className="css-pf-w2-avca mt-5">
                                <div className='css-k-f9-2f-ac-2a'>
                                    <img src="https://cdn-icons-png.flaticon.com/512/1198/1198299.png" width={30} alt="" />
                                    <div>
                                        <NominalFormat className="text-md text-primary capitalize font-bold" displayType='text' prefix={'Rp'} value={SelectedData.nilai_npd_disetujui} />
                                        <p className='font-12 font-semibold'>Nilai NPD</p>
                                    </div>
                                </div>
                                {/* <FiMinus ></FiMinus> */}
                                <div className='css-k-f9-2f-ac-2a'>
                                    <img src="https://cdn-icons-png.flaticon.com/512/2510/2510743.png" width={30} alt="" />
                                    <div>
                                        <NominalFormat className="text-md text-danger capitalize font-bold" displayType='text' prefix={'Rp'} value={200000} />
                                        <p className='font-12 font-semibold'>Total Rekapitulasi</p>
                                    </div>
                                </div>
                            </div>
                            {/* <h1 className={`css-anwf-aw-f1 text-slate-800 dark:text-slate-300 font-bold`}>Rekapiluasi NPD yang dibayarkan kurang dari nilai NPD, Apakah Anda yakin ingin mengunci rekapiluasi NPD ini?</h1> */}
                            {/* <p className='text-center font-12 mt-2'>Rekapiluasi NPD yang telah dikunci akan dianggap selesai sehingga pembuatan tidak dapat dilakukan kembali</p> */}

                            {/* <div className="badge badge-danger">
                                <p>Kurang Bayar</p>
                            </div> */}
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button type="button" isLoading={IsLoading} className="btn btn-primary me-2 border">Tambah Rekapitulasi</Button>
                        <Button type="button" isLoading={IsLoading} onClick={() => handleLockRekapitulasi()} className="btn btn-danger me-2 border">Kunci Rekapitulasi</Button>
                        {/* <Button
                            type="button"
                            onClick={() => setToogleViewRecapModal(false)}
                            className="btn border"
                        >Batalkan</Button> */}
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
};
export default LockRecap;