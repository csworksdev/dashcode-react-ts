type Props = {
    params: any
    onClick: (data: any) => void
}

const DeleteIcon = (props: Props) => {
    const {params, onClick} = props

    return (
        <svg
            onClick={() => onClick(params)}
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            className={`${'cursor-pointer'}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FF2E63"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        </svg>
    )
};
export default DeleteIcon;