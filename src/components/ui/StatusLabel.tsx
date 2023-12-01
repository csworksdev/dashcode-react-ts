import { FiCheckCircle, FiClock } from "react-icons/fi";

type Props = {
    conditionTrue: boolean
    textTrue: string
    textFalse: string
}

const StatusLabel = (props: Props) => {
    const {conditionTrue, textTrue, textFalse} = props
    return (
        <span className="inline-flex items-center">
            {
                conditionTrue ?
                    <div className="validation-action-button badge badge-light-success">
                        <FiCheckCircle size={13} />
                        <p className="validation-text-valid">{textTrue != null ? textTrue : ''}</p>
                    </div>
                    :
                    <div className="validation-action-button validation-waiting badge">
                        <FiClock size={13} color="#78829D" />
                        <p className="validation-text-waiting">{textFalse != null ? textFalse : ''}</p>
                    </div>
            }
        </span>
    )
};
export default StatusLabel;