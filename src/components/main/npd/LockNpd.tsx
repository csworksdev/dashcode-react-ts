import { lockRekapitulasiNpd } from '@/api/penatausahaan/rekapitulasi-npd';
import Button from '@/components/ui/Button';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea } from '@chakra-ui/react';
import { useState } from 'react';
import { registerPlugin } from "react-filepond";
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import toast from 'react-hot-toast';
import VideoPlayer from '@/components/partials/widget/VideoPlayer';
import LockAnimation from '@/assets/animation/animation_1700474056583.json';

registerPlugin(FilePondPluginFileValidateType);
registerPlugin(FilePondPluginFileValidateSize);
registerPlugin(FilePondPluginFileEncode);

type Props = {
    SelectedData: ResponseNpdListTypes;
    ToogleViewRecapModal: boolean;
    setToogleViewRecapModal: (toogle: boolean) => void;
}

const LockNpd = (props: Props) => {
    const { SelectedData, ToogleViewRecapModal, setToogleViewRecapModal } = props
    const [IsLoading, setIsLoading] = useState<boolean>(false);

    const handleLockRekapitulasi = () => {
        setIsLoading(true)
        lockRekapitulasiNpd(SelectedData.id_npd).then(function (res) {
            toast.success('Woah!.. Rekapitulasi berhasil dikunci')
            setToogleViewRecapModal(false)
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
                    <ModalHeader>Kunci NPD</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <div className="container-delete-modal">
                            <div className="container-delete-modal-player">
                                <VideoPlayer loop animationData={LockAnimation} play style={{ width: 350, height: 250 }} />
                            </div>
                            <h1 className={`css-anwf-aw-f1 text-slate-800 dark:text-slate-300 font-bold`}>Apakah Anda yakin ingin mengunci NPD ini?</h1>
                            <p className='text-center font-12 mt-2'>NPD yang telah dikunci akan dianggap selesai sehingga transaksi tidak dapat dilakukan kembali</p>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button type="button" isLoading={IsLoading} onClick={() => handleLockRekapitulasi()} className="btn btn-danger me-2 border">Kunci Sekarang</Button>
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
export default LockNpd;