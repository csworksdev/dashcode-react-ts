import NominalFormat from "@/components/main/NominalFormat";

type Props = {
    item: any;
}

const MainLaporanRakTable = (props: Props) => {
    const {item} = props

    const highlight = (item.kode_rekening.length === 22 || item.kode_rekening.length === 20) || false
    const highlightBold = (item.kode_rekening.length <= 12 || highlight) || false
    return (
        <>
            <tr>
                <td className={`${highlight ? 'table-pdf-highlight-2' : ''}`}>
                    <p className={`${highlightBold && 'text-bold'}`}>{item.kode_rekening}</p>
                </td>
                <td className={`${highlight ? 'table-pdf-highlight-2' : ''}`}>
                    <p className={`${highlightBold && 'text-bold'}`}>{item.uraian}</p>
                </td>
                <td className={`${highlight ? 'table-pdf-highlight-2' : ''}`}>
                    <NominalFormat className={`nominal-format-table ${highlightBold && 'text-bold'}`} displayType="text" value={item.anggaran_tahun_ini} prefix="Rp" />
                </td>
                <td className={`${highlight ? 'table-pdf-highlight-2' : ''}`}>
                    <NominalFormat className={`nominal-format-table ${highlightBold && 'text-bold'}`} displayType="text" value={item.total_rak} prefix="Rp" />
                </td>
                <td className={`${highlight ? 'table-pdf-highlight-2' : ''}`}>
                    <NominalFormat className={`nominal-format-table ${highlightBold && 'text-bold'}`} displayType="text" value={item.bulan_1} prefix="Rp" />
                </td>
                <td className={`${highlight ? 'table-pdf-highlight-2' : ''}`}>
                    <NominalFormat className={`nominal-format-table ${highlightBold && 'text-bold'}`} displayType="text" value={item.bulan_2} prefix="Rp" />
                </td>
                <td className={`${highlight ? 'table-pdf-highlight-2' : ''}`}>
                    <NominalFormat className={`nominal-format-table ${highlightBold && 'text-bold'}`} displayType="text" value={item.bulan_3} prefix="Rp" />
                </td>
                <td className={`${highlight ? 'table-pdf-highlight-2' : ''}`}>
                    <NominalFormat className={`nominal-format-table ${highlightBold && 'text-bold'}`} displayType="text" value={item.bulan_4} prefix="Rp" />
                </td>
                <td className={`${highlight ? 'table-pdf-highlight-2' : ''}`}>
                    <NominalFormat className={`nominal-format-table ${highlightBold && 'text-bold'}`} displayType="text" value={item.bulan_5} prefix="Rp" />
                </td>
                <td className={`${highlight ? 'table-pdf-highlight-2' : ''}`}>
                    <NominalFormat className={`nominal-format-table ${highlightBold && 'text-bold'}`} displayType="text" value={item.bulan_6} prefix="Rp" />
                </td>
                <td className={`${highlight ? 'table-pdf-highlight-2' : ''}`}>
                    <NominalFormat className={`nominal-format-table ${highlightBold && 'text-bold'}`} displayType="text" value={item.bulan_7} prefix="Rp" />
                </td>
                <td className={`${highlight ? 'table-pdf-highlight-2' : ''}`}>
                    <NominalFormat className={`nominal-format-table ${highlightBold && 'text-bold'}`} displayType="text" value={item.bulan_8} prefix="Rp" />
                </td>
                <td className={`${highlight ? 'table-pdf-highlight-2' : ''}`}>
                    <NominalFormat className={`nominal-format-table ${highlightBold && 'text-bold'}`} displayType="text" value={item.bulan_9} prefix="Rp" />
                </td>
                <td className={`${highlight ? 'table-pdf-highlight-2' : ''}`}>
                    <NominalFormat className={`nominal-format-table ${highlightBold && 'text-bold'}`} displayType="text" value={item.bulan_10} prefix="Rp" />
                </td>
                <td className={`${highlight ? 'table-pdf-highlight-2' : ''}`}>
                    <NominalFormat className={`nominal-format-table ${highlightBold && 'text-bold'}`} displayType="text" value={item.bulan_11} prefix="Rp" />
                </td>
                <td className={`${highlight ? 'table-pdf-highlight-2' : ''}`}>
                    <NominalFormat className={`nominal-format-table ${highlightBold && 'text-bold'}`} displayType="text" value={item.bulan_12} prefix="Rp" />
                </td>
            </tr>
        </>
    )
};
export default MainLaporanRakTable;