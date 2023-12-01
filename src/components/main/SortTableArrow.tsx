import { FiArrowDown, FiArrowUp } from "react-icons/fi";

type Props = {
    value: string;
    ActiveSort: string;
    OrderBy: string;
}

const SortTableArrow = (props: Props) => {
    const {value, ActiveSort, OrderBy} = props
    return (
        <>
            {
                ActiveSort === value ?
                    OrderBy === 'desc' ?
                        <FiArrowUp strokeWidth={3} /> :
                        <FiArrowDown strokeWidth={3}/>
                    : null
            }
        </>
    )
};
export default SortTableArrow;