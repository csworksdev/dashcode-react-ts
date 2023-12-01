import NominalFormat from "@/components/main/NominalFormat";

type Props = {
    total: any
}

const PerBulan = (props: Props) => {
    const { total } = props
    return (
        <>
            <td className="table-pdf-highlight-1">
                <NominalFormat prefix="Rp" displayType="text" className="nominal-format-table" value={total.anggaran_tahun_ini} />
            </td>
            <td className="table-pdf-highlight-1">
                <NominalFormat prefix="Rp" displayType="text" className="nominal-format-table" value={total.total_rak} />
            </td>
            <td className="table-pdf-highlight-1">
                <NominalFormat prefix="Rp" displayType="text" className="nominal-format-table" value={total.bulan_1} />
            </td>
            <td className="table-pdf-highlight-1">
                <NominalFormat prefix="Rp" displayType="text" className="nominal-format-table" value={total.bulan_2} />
            </td>
            <td className="table-pdf-highlight-1">
                <NominalFormat prefix="Rp" displayType="text" className="nominal-format-table" value={total.bulan_3} />
            </td>
            <td className="table-pdf-highlight-1">
                <NominalFormat prefix="Rp" displayType="text" className="nominal-format-table" value={total.bulan_4} />
            </td>
            <td className="table-pdf-highlight-1">
                <NominalFormat prefix="Rp" displayType="text" className="nominal-format-table" value={total.bulan_5} />
            </td>
            <td className="table-pdf-highlight-1">
                <NominalFormat prefix="Rp" displayType="text" className="nominal-format-table" value={total.bulan_6} />
            </td>
            <td className="table-pdf-highlight-1">
                <NominalFormat prefix="Rp" displayType="text" className="nominal-format-table" value={total.bulan_7} />
            </td>
            <td className="table-pdf-highlight-1">
                <NominalFormat prefix="Rp" displayType="text" className="nominal-format-table" value={total.bulan_8} />
            </td>
            <td className="table-pdf-highlight-1">
                <NominalFormat prefix="Rp" displayType="text" className="nominal-format-table" value={total.bulan_9} />
            </td>
            <td className="table-pdf-highlight-1">
                <NominalFormat prefix="Rp" displayType="text" className="nominal-format-table" value={total.bulan_10} />
            </td>
            <td className="table-pdf-highlight-1">
                <NominalFormat prefix="Rp" displayType="text" className="nominal-format-table" value={total.bulan_11} />
            </td>
            <td className="table-pdf-highlight-1">
                <NominalFormat prefix="Rp" displayType="text" className="nominal-format-table" value={total.bulan_12} />
            </td>
        </>
    )
};
export default PerBulan;