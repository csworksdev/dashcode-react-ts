type Props = {
    params: any
    onClick: (data: any) => void
}

const UpdateIcon = (props: Props) => {
    const { params, onClick } = props

    return (
        <svg
            onClick={() => onClick(params)}
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12 20h9"></path>
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
        </svg>
    )
};
export default UpdateIcon;