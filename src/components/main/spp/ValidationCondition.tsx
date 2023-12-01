import { FiCheckCircle, FiClock, FiTrash2, FiXCircle } from "react-icons/fi";
import ValidationLabel from "../../ui/ValidationLabel";

type Props = {
    status: number
}

const ValidationCondition = (props: Props) => {
    const { status } = props

    return (
        <div className="center-validation-status">
            <span className="inline-flex ">
                {
                    status === 0 ?
                        <ValidationLabel
                            title={"Belum Diverifikasi"}
                            icon={<FiClock strokeWidth={3} className="rotate" size={13} color="#FFFFFF" />}
                            type={"primary"}
                        />
                        :
                        status === 1 ?
                            <ValidationLabel
                                title={"Sudah Diverifikasi"}
                                icon={<FiCheckCircle size={13} />}
                                type={"light-success"}
                            />
                            :
                            status === 2 ?
                                <ValidationLabel
                                    title={"Ditolak"}
                                    icon={<FiXCircle size={13} />}
                                    type={"danger"}
                                />
                                :
                                <ValidationLabel
                                    title={"Dihapus"}
                                    icon={<FiTrash2 size={13} />}
                                    type={"danger"}
                                />
                }
            </span>
        </div>
    )
};
export default ValidationCondition;