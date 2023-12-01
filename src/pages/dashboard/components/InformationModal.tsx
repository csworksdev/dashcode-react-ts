import Button from "@/components/ui/Button";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { FiFilePlus, FiFileText, FiFolderPlus } from "react-icons/fi";

type Props = {
    ToogleModal: boolean
    setToogleModal: (toogle: boolean) => void
}

const InformationModal = (props: Props) => {
    const { ToogleModal, setToogleModal } = props
    return (
        <>
            <Modal isOpen={ToogleModal} onClose={() => setToogleModal(false)}>
                <ModalOverlay />
                <ModalContent maxWidth={500}>
                    <ModalHeader>Dokumentasi</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <div>
                            <p className="font-bold font-12 mb-3">Berikut merupakan beberapa informasi terkait aplikasi Sistem Informasi Pemerintahan Daerah:</p>
                            <div className="css-nuao_-a-3av-k border w-100 p-4">
                                <div className="container-icon-table-list">
                                    <FiFileText size={35} color="#50C793" />
                                </div>
                                <div className="container-table-td-2-column">
                                    <a className="text-sm text-slate-800 dark:text-slate-300 capitalize font-bold" target="_blank" href="/assets/document/Permendagri Nomor 77 Tahun 2020.pdf">Permendagri Nomor 77 Tahun 2020</a>
                                    <span className="text-sm text-slate-800 dark:text-slate-300 capitalizetxt-font-12 text-slate-300 dark:text-slate-300">Landasan Aturan</span>
                                </div>
                            </div>
                            <a target="_blank" href="https://docs.google.com/presentation/d/1k04Q1DjdXxzAJkxeD3jlLQRjiM8ZfPaV/edit#slide=id.p1" className="css-nuao_-a-3av-k border w-100 p-4">
                                <div className="container-icon-table-list">
                                    <FiFilePlus size={35} color="#FF2E63" />
                                </div>
                                <div className="container-table-td-2-column">
                                    <p className="text-sm text-slate-800 dark:text-slate-300 capitalize font-bold">Buku Panduan</p>
                                    <p className="text-sm text-slate-800 dark:text-slate-300 capitalizetxt-font-12 text-slate-300 dark:text-slate-300">Panduan Penggunaan Aplikasi</p>
                                </div>
                            </a>
                            <div className="css-nuao_-a-3av-k border w-100 p-4">
                                <div className="container-icon-table-list">
                                    <FiFolderPlus size={35} color="#4669FA" />
                                </div>
                                <div className="container-table-td-2-column">
                                    <a className="text-sm text-slate-800 dark:text-slate-300 capitalize font-bold" target="_blank" href="https://docs.google.com/presentation/d/1dqVYTuc5pBfhkt1LK8yONv14b_wXjFfz/edit#slide=id.p1">Siklus</a>
                                    <span className="text-sm text-slate-800 dark:text-slate-300 capitalizetxt-font-12 text-slate-300 dark:text-slate-300">Alur Penggunaan Aplikasi</span>
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button className="btn btn-light" onClick={() => setToogleModal(false)}>Batalkan</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
};
export default InformationModal;