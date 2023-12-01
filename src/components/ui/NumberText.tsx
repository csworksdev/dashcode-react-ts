import { terbilang } from "@jetmiky/rupiahjs";

type Props = {
    angka: number
}

const AngkaTerbilang = (props: Props) => {
    const { angka } = props

    let convertAngka = angka
    if (convertAngka == null) {
        convertAngka = 0
    }

    return (
        <>
            {
                convertAngka > 1000000000000000 ? '-' :
                    terbilang(convertAngka).toLowerCase()
            }
        </>
    );
};

export default AngkaTerbilang;