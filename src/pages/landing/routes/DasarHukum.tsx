import BannerSubPage from "../components/BannerSubPage";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const DasarHukum = () => {
    return (
        <>
            <Navbar />
            <div className="css-n0a-ca-d-1">
                <BannerSubPage image="DASAR_HUKUM.png" title={'DASAR HUKUM'} />
                <div className="css-na-cna-j21-ac">
                    <h1 className="css-n-can20d-a01a">UNDANG-UNDANG NOMOR 23 TAHUN 2014</h1>
                    <p className="css-m-c-aj-2a">Pasal 391 Pemerintah Daerah wajib menyediakan informasi Pemerintahan Daerah, yang dikelola dalam suatu sistem informasi Pemerintahan Daerah. Pasal 395 Pemerintah Daerah dapat menyediakan dan mengelola informasiPemerintahan Daerah lainnya.</p>
                </div>
                <div className="css-na-cna-j21-ac">
                    <h1 className="css-n-can20d-a01a">PERATURAN PRESIDEN NOMOR 95 TAHUN 2018 TENTANG SPBE | PASAL 7</h1>
                    <p className="css-m-c-aj-2a">Arsitektur SPBE Nasional bertujuan untuk memberikan panduan dalam pelaksanaan integrasi Proses Bisnis, data dan informasi, Infrastruktur SPBE, Aplikasi SPBE, dan Keamanan SPBE untuk menghasilkan Layanan SPBE yang terpadu secara nasional.</p>
                </div>
                <div className="css-na-cna-j21-ac">
                    <h1 className="css-n-can20d-a01a">PERPRES 39/2019 TTG SDI | PASAL 2</h1>
                    <p className="css-m-c-aj-2a">Satu Data Indonesia bertujuan memberikan acuan pelaksanaan dan pedoman bagi Instansi Pusat dan instansi Daerah dalam rangka penyelenggaraan tata kelola Data untuk mendukung perencanaan, pelaksanaan, evaluasi, dan pengendalian pembangunan.</p>
                </div>
                <div className="css-na-cna-j21-ac">
                    <h1 className="css-n-can20d-a01a">PERPRES 54/2018 TTG STRATEGI NASIONAL PENCEGAHAN KORUPSI (STRANAS PK)</h1>
                </div>
            </div>

            <Footer />
        </>
    )
};
export default DasarHukum;