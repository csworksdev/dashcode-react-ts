const TableShimmer = () => {
    return (
        <>
            {
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item: any, index: number) => {
                    return (
                        <div className="css-n-af-anwa-mf2" key={index}>
                            <div className="table-td py-2 animate-pulse">
                                <div className="animate" style={{ height: 30, width: 250, borderRadius: 7 }}></div>
                            </div>
                            <div className="table-td py-2 animate-pulse">
                                <div className="animate" style={{ height: 30, width: 250, borderRadius: 7 }}></div>
                            </div>
                            <div className="table-td py-2 animate-pulse">
                                <div className="animate" style={{ height: 30, width: 250, borderRadius: 7 }}></div>
                            </div>
                            <div className="table-td py-2 animate-pulse">
                                <div className="animate" style={{ height: 30, width: 250, borderRadius: 7 }}></div>
                            </div>
                        </div>
                    )
                })
            }

        </>
    )
};
export default TableShimmer;