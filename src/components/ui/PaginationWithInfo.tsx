import Pagination from "./Pagination";

type Props = {
    totalPages: number;
    currentPage: number;
    perPage: number;
    totalData: number;
    handlePageChange: (e: any) => void;
}

const PaginationWithInfo = (props: Props) => {
    const {totalPages, currentPage, handlePageChange, perPage, totalData} = props
    return (
        <div className="container-pagination-table-list">
            <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                handlePageChange={handlePageChange}
            />
            <p className="text-sm text-slate-800 dark:text-slate-300 font-bold">Menampilkan data ke- {(perPage * currentPage)} dari {totalData} data</p>
        </div>
    )
};
export default PaginationWithInfo;