import React, { ChangeEvent } from "react";
import CheckImage from "@/assets/images/icon/ck-white.svg";

interface CheckboxProps {
	id?: string;
	disabled?: boolean;
	label?: any;
	value: boolean;
	name?: string;
	className?: string;
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
	activeClass?: string;
}

const CheckboxCustom: React.FC<CheckboxProps> = ({
	id,
	disabled,
	label,
	value,
	name,
	className,
	onChange,
	activeClass = "ring-black-500  css-nfa-naw-faw dark:bg-slate-700 dark:ring-slate-700 ",
}) => {
	return (
		<label className={`flex items-center ${disabled ? " cursor-not-allowed opacity-50" : "cursor-pointer"}`} id={id}>
			<input
				type="checkbox"
				className="hidden"
				name={name}
				checked={value}
				onChange={onChange}
				defaultChecked={value}
				disabled={disabled}
			/>
			<span className={`css-checkbox h-7 w-7 border flex-none border-slate-300 dark:border-slate-800 inline-flex ltr:mr-5 rtl:ml-3 relative transition-all duration-150 ${value ? activeClass + " bg-primary " : "dark:border-slate-600"}`}>
				{value && (
					<img
						src={CheckImage}
						alt=""
						className="h-[15px] w-[15px] block m-auto"
					/>
				)}
			</span>
			<span className="text-slate-500 dark:text-slate-400 text-sm leading-6">
				{label}
			</span>
		</label>
	);
};

export default CheckboxCustom;