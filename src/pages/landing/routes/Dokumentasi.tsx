import BannerSubPage from "../components/BannerSubPage";
import ButtonUnduh from "../components/ButtonUnduh";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import {useState} from 'react'

const Dokumentasi = () => {
    const [ActiveDoc, setActiveDoc] = useState<string>('Informasi Pembangunan Daerah');
    return (
        <>
            <Navbar />
            <div className="css-n0a-ca-d-1 landing">
                <BannerSubPage image="DOKUMENTASI.png" title={'DOKUMENTASI'} />
                <div className="grid grid-cols-12">
                    <div className="col-span-12 lg:col-span-4 pr-7">
                        <div className="css-mac0jc-2-c-a2">
                            <button onClick={() => setActiveDoc('Informasi Pembangunan Daerah')} className={`${ActiveDoc === 'Informasi Pembangunan Daerah' ? 'css-fj0q_dq-2aDca2' : 'css-fj0q_dq-2aDca'}`}>Informasi Pembangunan Daerah</button>
                            <button onClick={() => setActiveDoc('Informasi Keuangan Daerah')} className={`${ActiveDoc === 'Informasi Keuangan Daerah' ? 'css-fj0q_dq-2aDca2' : 'css-fj0q_dq-2aDca'}`}>Informasi Keuangan Daerah</button>
                            <button onClick={() => setActiveDoc('Informasi Pemerintahan Daerah Lainnya')} className={`${ActiveDoc === 'Informasi Pemerintahan Daerah Lainnya' ? 'css-fj0q_dq-2aDca2' : 'css-fj0q_dq-2aDca'}`}>Informasi Pemerintahan Daerah Lainnya</button>
                        </div>
                    </div>
                    <div className="col-span-12 lg:col-span-8">
                        <div className="css-na-cna-j21-ac">
                            <h1 className="css-n-can20d-a01a">DOKUMENTASI {ActiveDoc.toUpperCase()}</h1>
                        </div>
                        <div className="css-na-cna-j21-ac">
                            <div className="css-n0ca-30afa">
                                <div className="css-9c-a9-1_29da">
                                    <h1 className="css-n-can20d-a01a">1. JUDUL DOKUMENTASI</h1>
                                    <p className="css-m-c-aj-2a">Lorem ipsum dolor sit amet consectetur. Convallis ac eget nec venenatis ut. Risus ac egestas id ullamcorper. Vehicula tristique volutpat et lacus eu ipsum nullam. Tellus eleifend praesent rhoncus quis. Ultrices sed luctus nunc auctor. Sit consectetur arcu risus turpis. Faucibus turpis eu lorem mauris sit vitae in at.</p>
                                </div>
                                <ButtonUnduh />
                            </div>
                        </div>
                        <div className="css-na-cna-j21-ac">
                            <div className="css-n0ca-30afa">
                                <div className="css-9c-a9-1_29da">
                                    <h1 className="css-n-can20d-a01a">2. JUDUL DOKUMENTASI</h1>
                                    <p className="css-m-c-aj-2a">Lorem ipsum dolor sit amet consectetur. Convallis ac eget nec venenatis ut. Risus ac egestas id ullamcorper. Vehicula tristique volutpat et lacus eu ipsum nullam. Tellus eleifend praesent rhoncus quis. Ultrices sed luctus nunc auctor. Sit consectetur arcu risus turpis. Faucibus turpis eu lorem mauris sit vitae in at.</p>
                                </div>
                                <ButtonUnduh />
                            </div>
                        </div>
                        <div className="css-na-cna-j21-ac">
                            <div className="css-n0ca-30afa">
                                <div className="css-9c-a9-1_29da">
                                    <h1 className="css-n-can20d-a01a">3. JUDUL DOKUMENTASI</h1>
                                    <p className="css-m-c-aj-2a">Lorem ipsum dolor sit amet consectetur. Convallis ac eget nec venenatis ut. Risus ac egestas id ullamcorper. Vehicula tristique volutpat et lacus eu ipsum nullam. Tellus eleifend praesent rhoncus quis. Ultrices sed luctus nunc auctor. Sit consectetur arcu risus turpis. Faucibus turpis eu lorem mauris sit vitae in at.</p>
                                </div>
                                <ButtonUnduh />
                            </div>
                        </div>
                        <div className="css-na-cna-j21-ac">
                            <div className="css-n0ca-30afa">
                                <div className="css-9c-a9-1_29da">
                                    <h1 className="css-n-can20d-a01a">4. JUDUL DOKUMENTASI</h1>
                                    <p className="css-m-c-aj-2a">Lorem ipsum dolor sit amet consectetur. Convallis ac eget nec venenatis ut. Risus ac egestas id ullamcorper. Vehicula tristique volutpat et lacus eu ipsum nullam. Tellus eleifend praesent rhoncus quis. Ultrices sed luctus nunc auctor. Sit consectetur arcu risus turpis. Faucibus turpis eu lorem mauris sit vitae in at.</p>
                                </div>
                                <ButtonUnduh />
                            </div>
                        </div>
                        <div className="css-na-cna-j21-ac">
                            <div className="css-n0ca-30afa">
                                <div className="css-9c-a9-1_29da">
                                    <h1 className="css-n-can20d-a01a">5. JUDUL DOKUMENTASI</h1>
                                    <p className="css-m-c-aj-2a">Lorem ipsum dolor sit amet consectetur. Convallis ac eget nec venenatis ut. Risus ac egestas id ullamcorper. Vehicula tristique volutpat et lacus eu ipsum nullam. Tellus eleifend praesent rhoncus quis. Ultrices sed luctus nunc auctor. Sit consectetur arcu risus turpis. Faucibus turpis eu lorem mauris sit vitae in at.</p>
                                </div>
                                <ButtonUnduh />
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
};
export default Dokumentasi;