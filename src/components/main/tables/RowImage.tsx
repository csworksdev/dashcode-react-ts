type Props = {
    title: string;
    desc?: string;
    image: string;
    minWidth?: number;
}

const RowImage = (props: Props) => {
    const {image, minWidth = 300, title = '', desc} = props
    
    return (
        <div style={{ minWidth: minWidth }}>
            <span className="inline-flex items-center">
                <span className="account-user-image ltr:mr-3 rtl:ml-3 flex-none">
                    <img src={image} alt={title} className="object-cover w-full h-full rounded-md" />
                </span>
                <div className="container-table-td-2-column">
                    <span className="text-sm text-slate-800 dark:text-slate-300 capitalize font-bold">{title}</span>
                    {
                        desc != null ?
                        <span className="txt-font-12 text-slate-300 dark:text-slate-300">{desc}</span> : null
                    }
                </div>
            </span>
        </div>
    )
};
export default RowImage;