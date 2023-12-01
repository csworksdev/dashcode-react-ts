import { NumericFormat } from "react-number-format";

type Props = {
    value: number;
    displayType?: 'text' | 'input';
    className?: string;
    style?: any;
    childClassName?: string;
    prefix?: string;
    thousandSeparator?: string;
    decimalSeparator?: string;
    placeholder?: string;
    name?: string;
    max?: number;
    onValueChange?: (values: any, sourceInfo: any) => void;
}

const NominalFormat = (props: Props) => {
    const { value, name = '', max, style, onValueChange, childClassName = 'wrap-text', displayType = 'input', className = 'block text-3xl text-black text-bold dark:text-white font-bold text-dashboard-statistic', prefix = '', thousandSeparator = '.', decimalSeparator = ',', placeholder = '' } = props
    return (
        <NumericFormat max={max} name={name} style={style} onValueChange={onValueChange} placeholder={placeholder} decimalSeparator={decimalSeparator} thousandSeparator={thousandSeparator} prefix={prefix} className={className + ' ' + childClassName} displayType={displayType} value={value} />
    )
};
export default NominalFormat;