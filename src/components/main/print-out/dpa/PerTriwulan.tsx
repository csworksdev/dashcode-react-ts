import NominalFormat from "@/components/main/NominalFormat";

type Props = {
    total: any
}

const PerTriwulan = (props: Props) => {
    const { total } = props
    return (
        <>
           <td className="table-pdf-highlight-1">
                <NominalFormat prefix="Rp" displayType="text" className="nominal-format-table" value={total.anggaran_tahun_ini} />
            </td>
            <td className="table-pdf-highlight-1">
                <NominalFormat prefix="Rp" displayType="text" className="nominal-format-table" value={total.total_rak} />
            </td>
            <td colSpan={3} className="table-pdf-highlight-1">
            <NominalFormat prefix="Rp" displayType="text" className="nominal-format-table" value={total.bulan_1 + total.bulan_2 + total.bulan_3} />
            </td>
            <td colSpan={3} className="table-pdf-highlight-1">
            <NominalFormat prefix="Rp" displayType="text" className="nominal-format-table" value={total.bulan_4 + total.bulan_5 + total.bulan_6} />
            </td>
            <td colSpan={3} className="table-pdf-highlight-1">
            <NominalFormat prefix="Rp" displayType="text" className="nominal-format-table" value={total.bulan_7 + total.bulan_8 + total.bulan_9} />
            </td>
            <td colSpan={3} className="table-pdf-highlight-1">
            <NominalFormat prefix="Rp" displayType="text" className="nominal-format-table" value={total.bulan_10 + total.bulan_11 + total.bulan_12} />
            </td>
        </>
    )
};
export default PerTriwulan;