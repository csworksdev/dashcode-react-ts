import ValidationLabel from "@/components/ui/ValidationLabel";
import { FiCheckCircle, FiClock, FiTrash2, FiXCircle } from "react-icons/fi";

type Props = {
    text: string
    status: number
}

const ValidationCondition = (props: Props) => {
    const { text, status } = props

    return (
        <span className="inline-flex" style={{ minWidth: 200 }}>
            {
                status === 0 ?
                    <ValidationLabel
                        title={"Belum Di" + text}
                        icon={<FiClock strokeWidth={3} className="rotate" size={13} color="#FFFFFF" />}
                        type={"primary"}
                    />
                    :
                    <ValidationLabel
                        title={"Di" + text}
                        icon={<FiCheckCircle size={13} />}
                        type={"light-success"}
                    />
            }
        </span>
    )
};
export default ValidationCondition;