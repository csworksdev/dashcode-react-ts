import { FiBox } from "react-icons/fi";

type Props = {
    index: number;
    item: any;
}

const RakDetailTableInfoParent = (props: Props) => {
    const {index, item} = props
    return (
        <tr key={index}>
            <td colSpan={16}>
                <div className={`inline-flex items-center css-anf-awnf-aw mb-3 mt-3`}>
                    <FiBox strokeWidth={2} size={13} className='me-2' />
                    <h1 className='text-sm font-semibold mt-0'>{item.name}</h1>
                </div>
            </td>
        </tr>
    )
};
export default RakDetailTableInfoParent;