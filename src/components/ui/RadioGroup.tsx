import { PropsWithChildren } from "react";

export const RadioGroup = ({ children }: PropsWithChildren<{}>) => {
    return (
        <div className="css-mc-m">
            <div role="radiogroup" className="radio-group" aria-labelledby="group_heading">
                {children}
            </div>
        </div>
    );
};

export const Radio = ({children, id, name, value, onChange, checked}: PropsWithChildren<{ id: string; name: string, value: number, checked?: boolean, onChange: (e: any) => void }>) => {
    return (
        <div>
            <input checked={checked} onChange={onChange} value={value} type="radio" id={id} name={name} />
            <label className="css-mc-mf4 cursor-pointer" htmlFor={id}>
                {children}
            </label>
        </div>
    );
};
