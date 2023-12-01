type Props = {
    title: string;
    hint: string;
    icon: any;
}

const CardWithIcon = (props: Props) => {
    const {title, hint, icon} = props
    return (
        <div className="css-na-fa0f-a h-100">
            <div className="inline-flex items-center">
                <span className="account-user-image ltr:mr-3 rtl:ml-3 flex-none">
                    {icon}
                    {/* <img src="/assets/images/aMHhm8fp7D8EO347U.min.webp" alt={DetailAnggaranResponse.nama_tahap} className="object-cover w-full h-full rounded-md" /> */}
                </span>
                <div className="container-table-td-2-column">
                    <span className="text-sm text-slate-800 dark:text-slate-300 capitalize font-bold">{title}</span>
                    <span className="txt-font-12 text-slate-300 dark:text-slate-300">{hint}</span>
                </div>
            </div>
        </div>
    )
};
export default CardWithIcon;