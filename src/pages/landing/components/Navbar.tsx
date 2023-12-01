import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, useDisclosure } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useRef } from 'react';
import { FiAlignRight } from "react-icons/fi";

const Navbar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef: any = useRef()
    return (
        <div className="css-mc-an0a2_cla">
            <div className="css-nac-j-2_e2">
                <img src="/assets/images/logokecil 2.png" alt="" />
                <img className="css-kac--1_do-1a" width={140} src="/assets/images/new-logo-text-black.png" alt="" />
            </div>
            <div className="css-nac-j-2_e2s">
                <Link to={'/'}>Beranda</Link>
                <Link to={'#1'}>Layanan Kami</Link>
                <Link to={'#1'}>Hot-line CS +621 756 679</Link>
                <Link to={'#1'}>Email sipd@kemendagri.go.id</Link>
            </div>
            <div className="css-ja8c-20x-a">
                {/* <Button ref={btnRef} colorScheme='teal' onClick={onOpen}>
                    Open
                </Button> */}
                <FiAlignRight onClick={onOpen} size={40} />
                <Drawer
                    isOpen={isOpen}
                    placement='right'
                    onClose={onClose}
                    finalFocusRef={btnRef}
                >
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader></DrawerHeader>

                        <DrawerBody>
                            <div className="css-a9ca-c-12qrka">
                                <Link to={'/'}>Beranda</Link>
                                <Link to={'#1'}>Layanan Kami</Link>
                                <Link to={'#1'}>Hot-line CS +621 756 679</Link>
                                <Link to={'#1'}>Email sipd@kemendagri.go.id</Link>
                            </div>
                        </DrawerBody>

                    </DrawerContent>
                </Drawer>
            </div>
        </div>
    )
};
export default Navbar;