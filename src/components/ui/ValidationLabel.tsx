type Props = {
    title: string
    icon: any
    type: 'primary' | 'light-success' | 'warning' | 'light' | 'danger' | 'green' | 'dark'
}

const ValidationLabel = (props: Props) => {
    const { title, icon, type } = props

    return (
        <div className={`validation-action-button badge-${type} badge`}>
            {icon}
            <p className="validation-text-waiting">{title}</p>
        </div>
    )
};
export default ValidationLabel;