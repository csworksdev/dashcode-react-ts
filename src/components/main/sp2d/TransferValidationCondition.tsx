import ValidationLabel from "@/components/ui/ValidationLabel";
import { FiCheckCircle, FiClock, FiTrash2, FiXCircle } from "react-icons/fi";

type Props = {
    status: number
}

const TransferValidationCondition = (props: Props) => {
    const { status } = props

    return (
        <span className="inline-flex ">
            {
                status === 0 ?
                    <ValidationLabel
                        title={"Belum Ditransfer"}
                        icon={<FiClock strokeWidth={3} className="rotate" size={13} color="#FFFFFF" />}
                        type={"primary"}
                    />
                    :
                    <ValidationLabel
                        title={"Sudah Ditransfer"}
                        icon={<FiCheckCircle size={13} />}
                        type={"light-success"}
                    />
            }
        </span>
    )
};
export default TransferValidationCondition;