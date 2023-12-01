type Props = {
    icon: any
    name: string
    code: string
    title: string
    badge: string
}

const Label = (props: Props) => {
    const {icon, name, code, title, badge} = props
    return (
        <div className="css-nc-a-nwf-h inline-flex items-center">
            <div className="container-icon-table-rak-list">
                {icon}
            </div>
            <div className="container-table-td-2-column">
                <span className="css-nc-an-wf-2 font-12 text-slate-800 dark:text-slate-300 capitalize font-bold">{name || '-'}</span>
                <div className='info-rak-belanja-header'>
                    <div className={`badge badge-${badge} me-2`}>
                        <span className='css-ncf-anw-fna-wa2'>{title || '-'}</span>
                    </div>
                    <div className="badge badge-light">
                        <span className='css-ncf-anw-fna-wa2'>Kode {code || '-'}</span>
                    </div>
                </div>
            </div>
        </div>
    )
};
export default Label;