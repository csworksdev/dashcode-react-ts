import { ROLE_BENDAHARA_UMUM_DAERAH, ROLE_PENGGUNA_ANGGARAN, ROLE_SEKDA } from "@/constant/data";
import useProfile from "@/hooks/useProfile";
import CheckValidationButton from "@/pages/penatausahaan/routes/pengeluaran/dpa/validasi/components/CheckValidationButton";

type Props = {
    ButtonSelected: any[]
    handleSelectedValidation: (index: number, item: any) => void
    index: number
    item: any
}

const ValidationButtonCondition = (props: Props) => {
    const {item, index, ButtonSelected, handleSelectedValidation} = props
    const [Profile] = useProfile();
    return (
        <>
            {
                Profile != null && Profile.id_role != null &&
                    item.nilai === 0 && item.nilai_rak === 0 ?
                    null :
                    Profile!= null && Profile.id_role === ROLE_PENGGUNA_ANGGARAN && !item.validasi_skpd && !item.validasi_sekda && !item.validasi_bud ?
                        <CheckValidationButton
                            index={index}
                            item={item}
                            ButtonSelected={ButtonSelected}
                            handleSelectedValidation={handleSelectedValidation}
                        /> :
                        Profile!= null && Profile.id_role === ROLE_SEKDA && item.validasi_skpd && !item.validasi_sekda && !item.validasi_bud ?
                            <CheckValidationButton
                                index={index}
                                item={item}
                                ButtonSelected={ButtonSelected}
                                handleSelectedValidation={handleSelectedValidation}
                            /> :
                            Profile!= null && Profile.id_role === ROLE_BENDAHARA_UMUM_DAERAH && item.validasi_skpd && item.validasi_sekda && !item.validasi_bud ?
                                <CheckValidationButton
                                    index={index}
                                    item={item}
                                    ButtonSelected={ButtonSelected}
                                    handleSelectedValidation={handleSelectedValidation}
                                /> : null
            }
        </>
    )
};
export default ValidationButtonCondition;