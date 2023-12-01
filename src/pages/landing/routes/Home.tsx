import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import { motion, useAnimationControls } from "framer-motion";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import Button from "@/components/ui/Button";
import { BigPlayButton, Player } from 'video-react';
// import '~video-react/dist/video-react.css'; // import css
// import VideoPlayer from './partials/widget/VideoPlayer';
import MiddleHomeAnimation from '@/assets/animation/data.json';
import VideoPlayer from "@/components/partials/widget/VideoPlayer";

const Home = () => {
    const [ActiveSlider, setActiveSlider] = useState<number>(0);
    const [ActiveMenu, setActiveMenu] = useState<number>(0);
    const [ActiveCard, setActiveCard] = useState<number>(0);
    const [ActiveCardImage, setActiveCardImage] = useState<string>('aceh');
    const [ToogleModal, setToogleModal] = useState<boolean>(false);
    const [ToogleVideoModal, setToogleVideoModal] = useState<boolean>(false);
    const controls = useAnimationControls()

    const sliderText = [
        'Tata cara penggunaan aplikasi modul perencanaan dan penganggaran',
        'Tata cara penggunaan aplikasi modul Penatausahaan',
        'Tata cara penggunaan aplikasi modul akuntansi dan pelaporan',
        'Dokumen Dasar hukum aplikasi Sistem Informasi Pemerintahan Daerah',
    ]

    const cardImage = [
        'aceh',
        'Sumbar',
        'Sumsel',
        // 'DKI Jakarta',
        // 'Jawa Barat',
        // 'Jawa Tengah',
        // 'Jawa Timur',
        // 'lampung',
        // 'sumatera barat',
        // 'sumatera selatan',
        // 'Sumatera Utara',
    ]

    useEffect(() => {
        controls.start('pageAnimate')
        const intervalId = setInterval(() => {
            controls.start('pageInitial')
            var randomnumber = Math.floor(Math.random() * (0 + (cardImage.length - 1) + 1)) + 0;

            setTimeout(() => {
                controls.start('pageAnimate')
                setActiveCardImage(cardImage[randomnumber])
            }, 400);
        }, 7000);

        return () => {
            clearInterval(intervalId);
        };
    }, [])

    const handleSliderInfoChange = (type: 'next' | 'prev') => {
        if (type === 'next' && (ActiveSlider + 1) < sliderText.length) {
            const mockActiveSlider = ActiveSlider + 1
            setActiveSlider(mockActiveSlider)
        } else if ((ActiveSlider - 1) < 0) {
            setActiveSlider(sliderText.length - 1)
        } else if (type === 'prev' && (ActiveSlider - 1) >= 0) {
            const mockActiveSlider = ActiveSlider - 1
            setActiveSlider(mockActiveSlider)
        } else {
            setActiveSlider(0)
        }
    };

    const myDivRef: any = useRef(null);
    const scrollToMenu = () => {
        myDivRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    const handleActiveCard = (value: number) => {
        setToogleModal(true)
        setActiveCard(value)
    };

    return (
        <>
            <Navbar />
            <div className="css-a-n9w0_1fa" style={{ backgroundImage: `url('/assets/images/landing-page/ldbg-${ActiveSlider}.png')` }}>
                {/* <div className="css-a-n9w0_1fa"> */}
                <div className="grid grid-cols-12 h-100 css-mof_a-j-w1a gap-20">
                    <div className="col-span-12 md:col-span-12 lg:col-span-6">
                        <div className="css-a-nf-2_qq--c">

                            <div className="css-nc-na0w_1">

                                <h1 className="css-nc-j9_20c">Selamat Datang di,</h1>
                                {/* <video width="320" height="240" autoplay>
                                    <source src="https://drive.kemendagri.go.id/s/C5SEeza7pFdZWmc/download/Logo%20Sipd%20compress.mp4" type="video/mp4" />
                                    <source src="movie.ogg" type="video/ogg" />
                                    Your browser does not support the video tag.
                                </video> */}
                                {/* <a href="https://drive.kemendagri.go.id/s/C5SEeza7pFdZWmc" target="_blank">Lihat Video</a>
                                <a href="https://drive.kemendagri.go.id/s/C5SEeza7pFdZWmc/download/Logo%20Sipd%20compress.mp4" target="_blank">Download</a>

                                <Iframe url="https://drive.kemendagri.go.id/s/C5SEeza7pFdZWmc/download/Logo%20Sipd%20compress.mp4"
                                    width="640px"
                                    height="320px"
                                    id=""
                                    className=""
                                    display="block"
                                    position="relative" />
                                <Iframe url="https://www.youtube.com/watch?v=gfieG_Xg-ok"
                                    width="640px"
                                    height="320px"
                                    id=""
                                    className=""
                                    display="block"
                                    position="relative" /> */}
                                {/* <img className="css-n9a-aj0w-1_ca1" src="/assets/images/new-logo-text-white.png" alt="" /> */}
                                {/* <img className="css-n9a-aj0w-1_ca1" src="/assets/images/symbol-white-letter.svg" alt="" /> */}
                                <img className="css-n9a-aj0w-1_ca1" src="/assets/images/symbol-white-letter.png" alt="" />
                                {/* <img className="css-n9a-aj0w-1_ca1" src="/assets/images/new-logo-text-black.png" alt="" /> */}

                                <p className="css-n-ca9_1d1">Solusi inovatif untuk meningkatkan efisiensi dan transparansi dalam pengelolaan keuangan di pemerintahan daerah.</p>

                            </div>
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-12 lg:col-span-6">
                        <img className="css-an-afn-2_af2" src={`/assets/images/landing-page/${ActiveCardImage}.png`} alt="" />
                        {/* <img className="css-an-afn-2_af2" src={`/assets/images/landing-page/${ActiveCardImage}.svg`} alt="" /> */}
                        <div className="css-nc0_2-dlag">
                            <div className="css-ma-_c2jM-c-W">
                                <h1 className="css-na-c9-21s">Informasi Aplikasi</h1>
                                <div className="css-m9-a9-1_d9-1ao-a">
                                    <img onClick={() => handleSliderInfoChange('prev')} src="/assets/images/btn_next_prev-kiri.svg" alt="" />
                                    <div className="css-mc0a-cd-cIx">
                                        <p className="css-mc-_9x-2Ad">{sliderText[ActiveSlider]}</p>
                                        <button onClick={() => setToogleVideoModal(true)} className="css-c0a_29kd-afw">Unduh</button>
                                    </div>
                                    <img onClick={() => handleSliderInfoChange('next')} src="/assets/images/btn_next_prev-kanan.svg" alt="" />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div onClick={() => scrollToMenu()} className="css-nc-q2_2f cursor-pointer">
                <h1 className="css-n-cfa_29d-1">LAYANAN</h1>
                <img src="/assets/images/landing-page/icon_arrow.svg" alt="" />
            </div>
            {/* <div ref={myDivRef} className="css-a-cfma-c2-ca">
                <button onClick={() => setActiveCard(0)} className={`${ActiveCard === 0 ? 'css-nc-aj2_co-q1' : 'css-nc-aj2_co-q2'}`}>Informasi Pembangunan Daerah</button>
                <button onClick={() => setActiveCard(1)} className={`${ActiveCard === 1 ? 'css-nc-aj2_co-q1' : 'css-nc-aj2_co-q2'}`}>Informasi Keuangan Daerah</button>
                <button onClick={() => setActiveCard(2)} className={`${ActiveCard === 2 ? 'css-nc-aj2_co-q1' : 'css-nc-aj2_co-q2'}`}>Informasi Pemerintahan Daerah Lainnya</button>
            </div> */}

            <div ref={myDivRef} className="grid grid-cols-12 h-100 css-mof_a-j-w1a gap-10">
                <div className="col-span-12 md:col-span-12 lg:col-span-4">
                    <div className="css-ncA_a0jq-a">
                        <img className="css-na_aiq_cnag" src="assets/images/landing-page/486a7c295e8d89921880de9e54b8c829.png" alt="" />
                        <h1 className="css-nifcA_a0q">INFORMASI PEMBANGUNAN DAERAH</h1>
                        <p className="css-nifcA_a0q2">Lorem ipsum dolor sit amet consectetur. Turpis vitae sodales feugiat scelerisque enim arcu facilisi faucibus vulputate. Accumsan eu sociis fames in et vel libero urna est.</p>
                        <p className="css-nifcA_a0q3">- Undang-Undang Nomor 23 Tahun 2014 pasal 274 - </p>
                        <button onClick={() => handleActiveCard(0)} className="css-nfea_aj92w-af">Selengkapnya</button>
                    </div>
                </div>
                <div className="col-span-12 md:col-span-12 lg:col-span-4">
                    <div className="css-ncA_a0jq-a">
                        <img className="css-na_aiq_cnag" src="assets/images/landing-page/43dbc65bd062d0f7a3d4b58d78bc04bf.png" alt="" />
                        {/* <VideoPlayer loop play animationData={MiddleHomeAnimation} style={{ width: 300, height: 300 }} /> */}
                        <h1 className="css-nifcA_a0q">INFORMASI KEUANGAN DAERAH</h1>
                        <p className="css-nifcA_a0q2">Lorem ipsum dolor sit amet consectetur. Turpis vitae sodales feugiat scelerisque enim arcu facilisi faucibus vulputate. Accumsan eu sociis fames in et vel libero urna est.</p>
                        <p className="css-nifcA_a0q3">- Undang-Undang Nomor 23 Tahun 2014 pasal 274 - </p>
                        <button onClick={() => handleActiveCard(1)} className="css-nfea_aj92w-af">Selengkapnya</button>
                    </div>
                </div>
                <div className="col-span-12 md:col-span-12 lg:col-span-4">
                    <div className="css-ncA_a0jq-a">
                        <img className="css-na_aiq_cnag" src="assets/images/landing-page/aed1cc4c287975eccb00d9418a32b88a.png" alt="" />
                        <h1 className="css-nifcA_a0q">INFORMASI PEMERINTAHAN DAERAH LAINNYA</h1>
                        <p className="css-nifcA_a0q2">Lorem ipsum dolor sit amet consectetur. Turpis vitae sodales feugiat scelerisque enim arcu facilisi faucibus vulputate. Accumsan eu sociis fames in et vel libero urna est.</p>
                        <p className="css-nifcA_a0q3">- Undang-Undang Nomor 23 Tahun 2014 pasal 274 - </p>
                        <button onClick={() => handleActiveCard(2)} className="css-nfea_aj92w-af">Selengkapnya</button>
                    </div>
                </div>
            </div>




            <Footer />
            <div className="css-m_m9w-amf2a">
                <Modal

                    isOpen={ToogleModal}
                    onClose={() => setToogleModal(false)}
                    blockScrollOnMount={false}
                >
                    <ModalOverlay />
                    <ModalContent className="css-m_m9w-amf2a" maxWidth={400}>
                        {/* <ModalHeader>Daftar SKPD</ModalHeader> */}
                        {/* <ModalCloseButton /> */}
                        <ModalBody>
                            {/* Informasi Pembangunan Daerah */}
                            {
                                ActiveCard === 0 &&
                                <div className="css-ma9c-2-da-va2">
                                    <h1 className="css-na0-_dw9q-ca">Informasi Pembangunan Daerah</h1>

                                    {/* 0 */}
                                    {
                                        ActiveMenu === 0 &&
                                        <>
                                            <div className="css-mc-aja-2dqca">
                                                <img className="css-mc-a_cw00-1ca" src="/assets/images/A-1-ewalidata.png" alt="" />
                                                <h1 className="css-a0c-0k_af0-1cfa">E-Walidata SSD</h1>
                                            </div>
                                            <div className="css-mc-aja-2dqca css-ckoa-k2-d-a1q" onClick={() => setActiveMenu(1)}>
                                                <div className="css-cmkpa0_0ac-a0s">
                                                    <div className="css-0c-9-1-ac1f7">
                                                        <img className="css-mc-a_cw00-1ca" src="/assets/images/A-2-datapembangunandaerah.png" alt="" />
                                                        <h1 className="css-a0c-0k_af0-1cfa">Data Pembangunan Daerah</h1>
                                                    </div>
                                                    <svg width="23" height="30" viewBox="0 0 23 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <g id="btn_next_prev">
                                                            <path id="Vector 11" d="M23 15L0 0.5L6 15L0 29.5L23 15Z" fill="#D9D9D9" />
                                                        </g>
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className="css-mc-aja-2dqca css-ckoa-k2-d-a1q" onClick={() => setActiveMenu(2)}>
                                                <div className="css-cmkpa0_0ac-a0s">
                                                    <div className="css-0c-9-1-ac1f7">
                                                        <img className="css-mc-a_cw00-1ca" src="/assets/images/A-3-perencanaanpembangunan.png" alt="" />
                                                        <h1 className="css-a0c-0k_af0-1cfa">Data Perencanaan Pembangunan Daerah</h1>
                                                    </div>
                                                    <svg width="23" height="30" viewBox="0 0 23 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <g id="btn_next_prev">
                                                            <path id="Vector 11" d="M23 15L0 0.5L6 15L0 29.5L23 15Z" fill="#D9D9D9" />
                                                        </g>
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className="css-mc-aja-2dqca">
                                                <img className="css-mc-a_cw00-1ca" src="/assets/images/A-4-analisadandataprofil.png" alt="" />
                                                <h1 className="css-a0c-0k_af0-1cfa">Analisa dan Profil Pembangunan Daerah</h1>
                                            </div>
                                        </>
                                    }


                                    {/* 1  */}
                                    {
                                        ActiveMenu === 1 &&
                                        <>
                                            <div onClick={() => setActiveMenu(0)} className="css-mc-aja-2dqca css-ckoa-k2-d-a1q">
                                                <svg width="23" height="30" viewBox="0 0 23 30" xmlns="http://www.w3.org/2000/svg">
                                                    <g id="btn_next_prev">
                                                        <path id="Vector 11" d="M0 15L23 0.5L17 15L23 29.5L0 15Z" fill="#D9D9D9" />
                                                    </g>
                                                </svg>
                                                <img className="css-mc-a_cw00-1ca" src="/assets/images/A-2-datapembangunandaerah.png" alt="" />
                                                <h1 className="css-a0c-0k_af0-1cfa">Data Pembangunan Daerah</h1>
                                            </div>
                                            <div className="css-mc-aja-2dqca css-rect-ma-c-1">
                                                <img className="css-mc-a_cw00-1ca" src="/assets/images/A-2-a-dataperencanaan.png" alt="" />
                                                <h1 className="css-a0c-0k_af0-1cfa">Data Perencanaan</h1>
                                            </div>
                                            <div className="css-mc-aja-2dqca css-rect-ma-c-1">
                                                <img className="css-mc-a_cw00-1ca" src="/assets/images/A-2-b-datapemutakhiran.png" alt="" />
                                                <h1 className="css-a0c-0k_af0-1cfa">Data Pemutakhiran</h1>
                                            </div>
                                        </>
                                    }


                                    {/* 2 */}
                                    {
                                        ActiveMenu === 2 &&
                                        <>
                                            <div onClick={() => setActiveMenu(0)} className="css-mc-aja-2dqca css-ckoa-k2-d-a1q">
                                                <svg width="23" height="30" viewBox="0 0 23 30" xmlns="http://www.w3.org/2000/svg">
                                                    <g id="btn_next_prev">
                                                        <path id="Vector 11" d="M0 15L23 0.5L17 15L23 29.5L0 15Z" fill="#D9D9D9" />
                                                    </g>
                                                </svg>
                                                <img className="css-mc-a_cw00-1ca" src="/assets/images/A-3-perencanaanpembangunan.png" alt="" />
                                                <h1 className="css-a0c-0k_af0-1cfa">Data Perencanaan Pembangunan Daerah</h1>
                                            </div>
                                            <div className="css-mc-aja-2dqca css-rect-ma-c-1">
                                                <img className="css-mc-a_cw00-1ca" src="/assets/images/A-3-a-rakorter.png" alt="" />
                                                <h1 className="css-a0c-0k_af0-1cfa">Rakortek</h1>
                                            </div>
                                            <div className="css-mc-aja-2dqca css-rect-ma-c-1">
                                                <img className="css-mc-a_cw00-1ca" src="/assets/images/A-3-b-fasilitasi.png" alt="" />
                                                <h1 className="css-a0c-0k_af0-1cfa">Fasilitasi</h1>
                                            </div>
                                            <div className="css-rect-ma-c-1 css-mc-aja-2dqca css-ckoa-k2-d-a1q" onClick={() => setActiveMenu(3)}>
                                                <div className="css-cmkpa0_0ac-a0s">
                                                    <div className="css-0c-9-1-ac1f7">
                                                        <img className="css-mc-a_cw00-1ca" src="/assets/images/A-3-c-perencanaanpembangunan.png" alt="" />
                                                        <h1 className="css-a0c-0k_af0-1cfa">Perencanaan Pembangunan Daerah</h1>
                                                    </div>
                                                    <svg width="23" height="30" viewBox="0 0 23 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <g id="btn_next_prev">
                                                            <path id="Vector 11" d="M23 15L0 0.5L6 15L0 29.5L23 15Z" fill="#D9D9D9" />
                                                        </g>
                                                    </svg>
                                                </div>
                                            </div>
                                        </>
                                    }

                                    {/* 3 */}
                                    {
                                        ActiveMenu === 3 &&
                                        <>
                                            <div onClick={() => setActiveMenu(2)} className="css-mc-aja-2dqca css-ckoa-k2-d-a1q">
                                                <svg width="23" height="30" viewBox="0 0 23 30" xmlns="http://www.w3.org/2000/svg">
                                                    <g id="btn_next_prev">
                                                        <path id="Vector 11" d="M0 15L23 0.5L17 15L23 29.5L0 15Z" fill="#D9D9D9" />
                                                    </g>
                                                </svg>
                                                <img className="css-mc-a_cw00-1ca" src="/assets/images/A-3-c-perencanaanpembangunan.png" alt="" />
                                                <h1 className="css-a0c-0k_af0-1cfa">Perencanaan Pembangunan Daerah</h1>
                                            </div>
                                            <div className="css-rect-ma-c-1 css-mc-aja-2dqca css-ckoa-k2-d-a1q" onClick={() => setActiveMenu(3)}>
                                                <div className="css-cmkpa0_0ac-a0s">
                                                    <div className="css-0c-9-1-ac1f7">
                                                        <img className="css-mc-a_cw00-1ca" src="/assets/images/A-3-c-I-RPJPD.png" alt="" />
                                                        <h1 className="css-a0c-0k_af0-1cfa">RPJPD</h1>
                                                    </div>
                                                    <svg width="23" height="30" viewBox="0 0 23 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <g id="btn_next_prev">
                                                            <path id="Vector 11" d="M23 15L0 0.5L6 15L0 29.5L23 15Z" fill="#D9D9D9" />
                                                        </g>
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className="css-rect-ma-c-1 css-mc-aja-2dqca css-ckoa-k2-d-a1q" onClick={() => setActiveMenu(3)}>
                                                <div className="css-cmkpa0_0ac-a0s">
                                                    <div className="css-0c-9-1-ac1f7">
                                                        <img className="css-mc-a_cw00-1ca" src="/assets/images/A-3-c-II-RPJMD.png" alt="" />
                                                        <h1 className="css-a0c-0k_af0-1cfa">RPJMD</h1>
                                                    </div>
                                                    <svg width="23" height="30" viewBox="0 0 23 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <g id="btn_next_prev">
                                                            <path id="Vector 11" d="M23 15L0 0.5L6 15L0 29.5L23 15Z" fill="#D9D9D9" />
                                                        </g>
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className="css-mc-aja-2dqca css-rect-ma-c-1">
                                                <img className="css-mc-a_cw00-1ca" src="/assets/images/A-3-c-III-RENSTRA.png" alt="" />
                                                <h1 className="css-a0c-0k_af0-1cfa">RENSTRA, RKPD, RENJA</h1>
                                            </div>
                                        </>
                                    }
                                </div>
                            }

                            {/* Informasi Keuangan Daerah */}
                            {
                                ActiveCard === 1 &&
                                <div className="css-ma9c-2-da-va2">
                                    <h1 className="css-na0-_dw9q-ca">Informasi Keuangan Daerah</h1>

                                    <>
                                        <div className="css-mc-aja-2dqca css-ckoa-k2-d-a1q">
                                            <div className="css-cmkpa0_0ac-a0s">
                                                <div className="css-0c-9-1-ac1f7">
                                                    <img className="css-mc-a_cw00-1ca" src="/assets/images/B-1-perencanaanpanganggaran.png" alt="" />
                                                    <h1 className="css-a0c-0k_af0-1cfa">Penganggaran</h1>
                                                </div>
                                                <svg width="23" height="30" viewBox="0 0 23 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g id="btn_next_prev">
                                                        <path id="Vector 11" d="M23 15L0 0.5L6 15L0 29.5L23 15Z" fill="#D9D9D9" />
                                                    </g>
                                                </svg>
                                            </div>
                                        </div>
                                        <Link to={'/login'} className="css-mc-aja-2dqca css-ckoa-k2-d-a1q">
                                            <div className="css-cmkpa0_0ac-a0s">
                                                <div className="css-0c-9-1-ac1f7">
                                                    <img className="css-mc-a_cw00-1ca" src="/assets/images/B-2-penatausahaan.png" alt="" />
                                                    <h1 className="css-a0c-0k_af0-1cfa">Penatausahaan</h1>
                                                </div>
                                                <svg width="23" height="30" viewBox="0 0 23 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g id="btn_next_prev">
                                                        <path id="Vector 11" d="M23 15L0 0.5L6 15L0 29.5L23 15Z" fill="#D9D9D9" />
                                                    </g>
                                                </svg>
                                            </div>
                                        </Link>
                                        <div className="css-mc-aja-2dqca css-ckoa-k2-d-a1q">
                                            <div className="css-cmkpa0_0ac-a0s">
                                                <div className="css-0c-9-1-ac1f7">
                                                    <img className="css-mc-a_cw00-1ca" src="/assets/images/B-3-aklap.png" alt="" />
                                                    <h1 className="css-a0c-0k_af0-1cfa">Aklap</h1>
                                                </div>
                                                <svg width="23" height="30" viewBox="0 0 23 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g id="btn_next_prev">
                                                        <path id="Vector 11" d="M23 15L0 0.5L6 15L0 29.5L23 15Z" fill="#D9D9D9" />
                                                    </g>
                                                </svg>
                                            </div>
                                        </div>
                                    </>
                                </div>
                            }

                            {/* Informasi Pemerintahan Daerah Lainnya */}
                            {
                                ActiveCard === 2 &&
                                <div className="css-ma9c-2-da-va2">
                                    <h1 className="css-na0-_dw9q-ca">Informasi Pemerintahan Daerah Lainnya</h1>
                                    <div className="css-mc-aja-2dqca">
                                        <img className="css-mc-a_cw00-1ca" src="/assets/images/C-1-SILPPD.png" alt="" />
                                        <h1 className="css-a0c-0k_af0-1cfa">SLIPPD</h1>
                                    </div>
                                    <div className="css-mc-aja-2dqca">
                                        <img className="css-mc-a_cw00-1ca" src="/assets/images/C-2-P3DN.png" alt="" />
                                        <h1 className="css-a0c-0k_af0-1cfa">P3DN</h1>
                                    </div>
                                </div>
                            }
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                type="button"
                                onClick={() => setToogleModal(false)}
                                className="css-cmia_q2-fAa"
                            >Batal</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </div>

            <Modal isOpen={ToogleVideoModal} onClose={() => setToogleVideoModal(false)} blockScrollOnMount={false}>
                <ModalOverlay
                    bg='blackAlpha.300'
                    backdropFilter='blur(10px)'
                />
                <ModalContent className="css-mai_aj--wq2n-a" maxWidth={1000}>
                    <Player
                        playsInline
                        poster="/assets/video/cover-intro.png"
                        // src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                        // src="https://drive.kemendagri.go.id/s/C5SEeza7pFdZWmc/download/Logo%20Sipd%20compress.mp4"
                        src="/assets/video/intro-sipd.mp4"
                    >
                        {/* <BigPlayButton position="center" /> */}
                    </Player>
                </ModalContent>
            </Modal>

        </>
    )
};
export default Home;