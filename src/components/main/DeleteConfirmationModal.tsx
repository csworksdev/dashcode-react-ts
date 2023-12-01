import VideoPlayer from "../partials/widget/VideoPlayer";
import Button from "../ui/Button";
// import Modal from "../ui/Modal";
import TrashAnimation from '@/assets/animation/animation_lmno4rc3.json';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Portal } from "@chakra-ui/react";
type Props = {
    title?: string;
    deletedText?: string;
    buttonText?: string;
    params: any; // Pass to deleteAction params
    ToogleModal: boolean;
    setToogleModal: (toogle: boolean) => void;
    deleteAction: (params: any) => any;
    isLoding: boolean
}

const DeleteConfirmationModal = (props: Props) => {
    const { title, buttonText = 'Hapus Sekarang', deletedText, params, ToogleModal, setToogleModal, deleteAction, isLoding } = props
    return (
        <>
            <Modal isOpen={ToogleModal} onClose={() => setToogleModal(false)}>
                <ModalOverlay />
                <ModalContent maxWidth={500}>
                    <ModalHeader>Konfirmasi</ModalHeader>
                    <ModalCloseButton />
                    <div className="container-delete-modal">
                        <div className="container-delete-modal-player">
                            <VideoPlayer loop animationData={TrashAnimation} play style={{ width: 200, height: 200 }} />
                        </div>
                        <h1 className={`${deletedText != null ? 'mb-5' : 'mb-10'} css-anwf-aw-f1 text-slate-800 dark:text-slate-300 font-bold`}>{title == null ? 'Apakah anda yakin ingin menghapus data ini?' : title}</h1>
                        {
                            deletedText != null &&
                            <div className="label-deleted-text-modal mb-10">
                                <p className="text-sm dark:text-slate-300 font-medium text-center">{deletedText}</p>
                            </div>
                        }
                    </div>
                    <ModalFooter>
                        <div className="container-delete-action-modal">
                            <Button
                                type="button"
                                isLoading={isLoding}
                                text={`Batalkan`}
                                className="btn-border border mr-3 btn-base "
                                onClick={() => setToogleModal(false)}
                            />
                            <Button
                                type="button"
                                isLoading={isLoding}
                                text={buttonText}
                                className="btn-danger btn-base w-100"
                                onClick={() => deleteAction(params)}
                            />
                        </div>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
};
export default DeleteConfirmationModal;