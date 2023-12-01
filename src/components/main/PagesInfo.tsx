import InformationModal from "@/pages/dashboard/components/InformationModal";
import { Button } from "@chakra-ui/react";
import { useState } from 'react';

type Props = {
    title: string
    image: string
}

const PagesInfo = (props: Props) => {
    const { title, image } = props
    const [ToogleInformationModal, setToogleInformationModal] = useState<boolean>(false);

    return (
        <>
            <div className="alert-light-info">
                <div className="css-nic-aQ_23r-a">
                    <img width={50} src={image} alt="" />
                    <div>
                        <p className="font-semibold font-12">{title}</p>
                        <div>
                            <Button onClick={() => setToogleInformationModal(true)} className="btn btn-light btn-sm mt-4 me-2">Selengkapnya</Button>
                            <a target="_blank" href="https://api.whatsapp.com/send?phone=6281317633727&text=Hello%2C%20World!">
                                <Button className="btn btn-light btn-sm mt-4">Helpdesk</Button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <InformationModal
                ToogleModal={ToogleInformationModal}
                setToogleModal={setToogleInformationModal}
            />
        </>
    )
};
export default PagesInfo;