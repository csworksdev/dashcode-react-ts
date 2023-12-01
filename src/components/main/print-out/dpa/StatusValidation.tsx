import { FiCheckCircle, FiClock } from "react-icons/fi";

type Props = {
    title: string;
    IsValid: boolean;
}

const StatusValidation = (props: Props) => {
    const { title = 'validasi', IsValid } = props
    return (
        <>
            {
                IsValid ?
                    <div className="validation-action-button badge badge-light-success">
                        <FiCheckCircle size={13} />
                        <p className="validation-text-valid">Di{title.toLowerCase()}</p>
                    </div> 
                    :
                    <div className="validation-action-button validation-waiting badge">
                        <FiClock size={13} color="#78829D" />
                        <p className="validation-text-waiting">Belum Di{title.toLowerCase()}</p>
                    </div>
            }
        </>
    )
};
export default StatusValidation;