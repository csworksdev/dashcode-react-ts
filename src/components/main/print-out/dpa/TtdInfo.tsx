import { converNamaSkpd } from "@/utils/stringConverter";
import { DateTime } from "luxon";

type Props = {
    data: any;
}

const TtdInfo = (props: Props) => {
    const { data } = props

    let printedNamaSkpd = converNamaSkpd(data.nama_skpd)
    // if (data.nama_skpd != null) {
    //     let caseNamaSkpd = data.nama_skpd.toLowerCase().split(' ')
        
    //     if (caseNamaSkpd[0] === 'kecamatan') {
    //         printedNamaSkpd = 'CAMAT'
    //         for (let i = 1; i < caseNamaSkpd.length; i++) {
    //             printedNamaSkpd += ' ' + caseNamaSkpd[i].toUpperCase()
    //         }
    //     } else if (caseNamaSkpd[0] === 'inspektorat') {
    //         printedNamaSkpd = 'INSPEKTUR'
    //         for (let i = 1; i < caseNamaSkpd.length; i++) {
    //             printedNamaSkpd += ' ' + caseNamaSkpd[i].toUpperCase()
    //         }
    //     } else {
    //         printedNamaSkpd = 'KEPALA ' + data.nama_skpd.toUpperCase()
    //     }
    // }


    return (
        <div className="mt-10">
            <div className="grid grid-cols-12">
                <div className="col-span-6">
                    <img className="ml-10" width={160} src="/assets/images/barcode.png" alt="SIPD Penatausahaan Barcode" />
                </div>
                <div className="col-span-6">
                    <div className="css-na-awm0a1-c-w">
                        <p className="footer-info-pdf-title-table">{data.nama_ibukota || '...........'}, </p>
                        <p className="footer-info-pdf-title-table">Tanggal {DateTime.fromISO(data.tanggal).setLocale('id').toFormat('dd LLLL yyyy')}</p>
                    </div>
                    <p className="footer-info-pdf-title-table">Disiapkan Oleh</p>
                    <p className="footer-info-pdf-title-table">
                        {(printedNamaSkpd || '-').toUpperCase()}
                    </p>
                    <p className="mt-20 footer-info-pdf-title-table underline">
                        {data.nama_penandatangan || '...........'}
                    </p>
                    <p className="footer-info-pdf-title-table">
                        NIP: {data.nip_penandatangan || '...........'}
                    </p>
                </div>
            </div>
        </div>
    )
};
export default TtdInfo;
