
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Portal } from "@chakra-ui/react";
import ValidationAnimation from '@/assets/animation/animation_ln1edddw.json'
import VideoPlayer from "@/components/partials/widget/VideoPlayer";
import Button from "@/components/ui/Button";


type Props = {
    totalDpa: number;
    isLoading: boolean;
    toogleModal: boolean;
    setToogleModal: (toogle: boolean) => void;
    handleValidation: () => void;
}

const ValidasiConfirmationModal = (props: Props) => {
    const { totalDpa, toogleModal, isLoading, setToogleModal, handleValidation } = props
    

    return (
        <>
            <Modal closeOnOverlayClick={false} isOpen={toogleModal} onClose={() => setToogleModal(false)}>
                <ModalOverlay />
                <ModalContent maxWidth={500}>
                    <ModalHeader>Konfirmasi</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <div className="container-delete-modal">
                            <div className="container-delete-modal-player">
                                <VideoPlayer loop animationData={ValidationAnimation} play style={{ width: 450, height: 200 }} />
                            </div>
                            <h1 className={`mb-5 mt-3 css-anwf-aw-f1 text-slate-800 dark:text-slate-300 font-bold`}>Apakah anda yakin ingin memvalidasi {totalDpa} Rekening ini?</h1>
                            <p className="text-sm font-semibold mb-0 text-center">Perlu diperhatikan bahwa Rekening yang sudah di validasi tidak dapat dikembalikan lagi</p>
                        </div>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={() => setToogleModal(false)} className="me-2">Batalkan</Button>
                        <Button isLoading={isLoading} onClick={() => handleValidation()} className="btn btn-success">Validasi Sekarang</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
};
export default ValidasiConfirmationModal;