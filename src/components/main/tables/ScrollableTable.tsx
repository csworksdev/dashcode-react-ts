type Props = {
    children: JSX.Element | JSX.Element[],
};

const ScrollableTable = ({ children }: Props) => {
    return (
        <div className="css-table-responsive mt-5 ms-3 me-3">
            <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden">
                    <table className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700 ">
                        {children}
                    </table>
                </div>
            </div>
        </div>
    )
};
export default ScrollableTable;