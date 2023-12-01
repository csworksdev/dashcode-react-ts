import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <>
            <div className="css-mac-d_29dja-af">
                <div className="grid grid-cols-12">
                    <div className="col-span-12 lg:col-span-2 css-kasw-k-2-jaq-c">
                        <h1 className="css-ma-cma0-2a--ca">Informasi Aplikasi</h1>
                        <Link className="css-20c-ac0w" to={'/dasar-hukum'}>
                            <div className="css-mc-a_29d-acm-w"></div>
                            <h1 className="css-0c_a0-d2w-ac">Dasar Hukum</h1>
                        </Link>
                        <Link className="css-20c-ac0w" to={'/dokumentasi'}>
                            <div className="css-mc-a_29d-acm-w"></div>
                            <h1 className="css-0c_a0-d2w-ac">Dokumentasi</h1>
                        </Link>
                        <Link className="css-20c-ac0w" to={'/faq'}>
                            <div className="css-mc-a_29d-acm-w"></div>
                            <h1 className="css-0c_a0-d2w-ac">FAQ</h1>
                        </Link>
                    </div>
                    <div className="col-span-12 lg:col-span-3 css-kasw-k-2-jaq-c">
                        <h1 className="css-ma-cma0-2a--ca">Hubungi Kami</h1>
                        <div className="css-20c-ac0w">
                            {/* <div className="css-mc-a_29d-acm-w"></div> */}
                            <img className="css-n-c0a-W2ku-ca" src="/assets/images/phone-Filled.png" alt="" />
                            <h1 className="css-0c_a0-d2w-ac">Hot-line CS +621 756 679</h1>
                        </div>
                        <div className="css-20c-ac0w">
                            <img className="css-n-c0a-W2ku-ca" src="/assets/images/WhatsApp.png" alt="" />
                            <h1 className="css-0c_a0-d2w-ac">whatsapp +621 756 679</h1>
                        </div>
                        <div className="css-20c-ac0w">
                            <img className="css-n-c0a-W2ku-ca" src="/assets/images/envelope-Filled.png" alt="" />
                            <h1 className="css-0c_a0-d2w-ac">sipd@kemendagri.go.id</h1>
                        </div>
                    </div>
                    <div className="col-span-12 lg:col-span-5 css-kasw-k-2-jaq-c">
                        <div className="css-mfiaAwj-f-dfa">
                            <img className="css-nicQ_3f-afca" src="/assets/images/landing-page/1ebacdaf637a5f0c817ffcb5bfb8b2f6.png" alt="" />
                            <div>
                                <h1 className="css-ma-cma0-2a--ca">Alamat Kantor</h1>
                                <p className="css-0c_a0-d2w-ac">Jl. Medan Merdeka Utara No.7, RT.5/RW.2, Gambir, Kecamatan Gambir, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10110</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12 lg:col-span-2 css-kasw-k-2-jaq-c">
                        <h1 className="css-ma-cma0-2a--ca">Media Sosial Kami</h1>
                        <div className="css-20c-ac0w">
                            <img className="css-n-c0a-W2ku-ca" src="/assets/images/Group 32.png" alt="" />
                            <h1 className="css-0c_a0-d2w-ac">@sipdkemendagri</h1>
                        </div>
                        <div className="css-20c-ac0w">
                            <img className="css-n-c0a-W2ku-ca" src="/assets/images/Group 33.png" alt="" />
                            <h1 className="css-0c_a0-d2w-ac">sipdkemendagri</h1>
                        </div>
                        <div className="css-20c-ac0w">
                            <img className="css-n-c0a-W2ku-ca" src="/assets/images/Group 34.png" alt="" />
                            <h1 className="css-0c_a0-d2w-ac">sipdkemendagri</h1>
                        </div>
                    </div>
                </div>
            </div>

            <div className="css-mca-0a-2_aqcf-s">
                <h1 className="css-amc-ma-w_ca-2">PUSDATIN @ 2023</h1>
            </div>

            <div className="css-mac-d_29dja-af2"></div>
        </>
    )
};
export default Footer;