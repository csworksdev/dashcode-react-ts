import NominalFormat from "../NominalFormat";

type Props = {
    title: number;
    desc?: string;
    icon: any;
    minWidth?: number;
}

const RowRupiahIcon = (props: Props) => {
    const { icon, minWidth = 300, title = 0, desc } = props

    return (
        <div style={{ width: minWidth }}>
            <span className="inline-flex">
                <div className="container-icon-table-list">
                    {icon}
                </div>
                <div className="container-table-td-2-column">
                    <NominalFormat className="text-sm text-slate-800 dark:text-slate-300 capitalize font-bold" displayType='text' prefix={'Rp'} value={title} />
                    {
                        desc == null ?
                            <span className="txt-font-12 text-slate-300 dark:text-slate-300">{desc}</span> : null
                    }
                </div>
            </span>
        </div>
    )
};
export default RowRupiahIcon;