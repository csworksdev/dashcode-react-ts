import React, { useState } from "react";
import Icon from "@/components/ui/Icon";
import Cleave from "cleave.js/react";
import "cleave.js/dist/addons/cleave-phone.us";

type Props = {
	type?: any;
	label?: any;
	placeholder?: any;
	defaultValue?: any;
	autocomplete?: boolean;
	classLabel?: any;
	className?: any;
	classGroup?: any;
	classMerge?: any;
	register?: any;
	name?: any;
	readonly?: any;
	value?: any;
	error?: any;
	icon?: any;
	disabled?: any;
	id?: any;
	horizontal?: any;
	validate?: any;
	isMask?: any;
	msgTooltip?: any;
	description?: any;
	hasicon?: any;
	onChange?: any;
	merged?: any;
	append?: any;
	prepend?: any;
	options?: any;
	onFocus?: any;
}

const InputGroup = ({
	type,
	label,
	placeholder,
	classLabel = "form-label",
	className = "",
	classGroup = "",
	classMerge = "",
	register,
	name,
	readonly,
	autocomplete = false,
	defaultValue = "",
	value,
	error,
	icon,
	disabled,
	id,
	horizontal,
	validate,
	isMask,
	msgTooltip,
	description,
	hasicon,
	onChange,
	merged,
	append,
	prepend,
	options,
	onFocus,

	...rest
}: Props) => {
	const [open, setOpen] = useState(false);
	const handleOpen = () => {
		setOpen(!open);
	};

	return (
		<div className={`${classMerge} ${horizontal ? "flex" : ""} ${merged ? "merged" : ""}`}>
			{label && (<label htmlFor={id} className={`block capitalize ${classLabel}  ${horizontal ? "flex-0 mr-6 md:w-[100px] w-[60px] break-words" : ""}`}>{label}</label>)}
			<div className={`flex items-stretch inputGroup ${append ? "has-append" : "has-append"} ${prepend ? "has-prepend" : ""} ${error ? "is-invalid" : ""}  ${validate ? "is-valid" : ""} ${horizontal ? "flex-1" : ""}`}>
				{prepend && (
					<span className="flex-none input-group-addon">
						<div className="input-group-text  h-full prepend-slot">
							{prepend}
						</div>
					</span>
				)}
				<div className="flex-1">
					<div className={`relative fromGroup2 ${error ? "has-error" : ""}  ${validate ? "is-valid" : ""}`}>
						{
							register != null && register != undefined ?
								name && !isMask && (
									<input
										type={type === "password" && open === true ? "text" : type}
										{...register(name)}
										{...rest}
										autoComplete={autocomplete ? 'on' : 'off'}
										className={`${error ? " has-error" : ""} input-group-control block w-full focus:outline-none py-2 ${className}  `}
										placeholder={placeholder}
										readOnly={readonly}
										disabled={disabled}
										defaultValue={defaultValue}
										value={value}
										id={id}
										onChange={onChange}
									/>
								) : 
								name && !isMask && (
									<input
										type={type === "password" && open === true ? "text" : type}
										{...rest}
										autoComplete={autocomplete ? 'on' : 'off'}
										className={`${error ? " has-error" : ""} input-group-control block w-full focus:outline-none py-2 ${className}  `}
										placeholder={placeholder}
										readOnly={readonly}
										disabled={disabled}
										defaultValue={defaultValue}
										value={value}
										id={id}
										onChange={onChange}
									/>
								)
						}

						{!name && !isMask && (
							<input
								type={type === "password" && open === true ? "text" : type}
								className={`input-group-control block w-full focus:outline-none py-2 ${className}`}
								placeholder={placeholder}
								readOnly={readonly}
								disabled={disabled}
								onChange={onChange}
								defaultValue={defaultValue}
								value={value}
								id={id}
							/>
						)}
						{name && isMask && (
							<Cleave
								{...register(name)}
								{...rest}
								placeholder={placeholder}
								options={options}
								className={`${error ? " has-error" : " "} input-group-control w-full py-2 ${className}  `}
								onFocus={onFocus}
								id={id}
								defaultValue={defaultValue}
								readOnly={readonly}
								value={value}
								disabled={disabled}
								onChange={onChange}
							/>
						)}
						{!name && isMask && (
							<Cleave
								placeholder={placeholder}
								options={options}
								className={`${error ? " has-error" : " "} input-group-control w-full py-2 ${className}  `}
								onFocus={onFocus}
								id={id}
								defaultValue={defaultValue}
								readOnly={readonly}
								disabled={disabled}
								value={value}
								onChange={onChange}
							/>
						)}
						<div className="flex text-xl absolute ltr:right-[14px] rtl:left-[14px] top-1/2 -translate-y-1/2  space-x-1 rtl:space-x-reverse">
							{hasicon && (
								<span className="cursor-pointer text-secondary-500" onClick={handleOpen}>
									{open && type === "password" && (
										<Icon icon="heroicons-outline:eye" />
									)}
									{!open && type === "password" && (
										<Icon icon="heroicons-outline:eye-off" />
									)}
								</span>
							)}
							{error && (
								<span className="text-danger-500">
									<Icon icon="heroicons-outline:information-circle" />
								</span>
							)}
							{validate && (
								<span className="text-success-500">
									<Icon icon="bi:check-lg" />
								</span>
							)}
						</div>
					</div>
				</div>
				<span className="flex-none input-group-addon right">
					<div className="input-group-text  h-full append-slot">{append ? append : ''}</div>
				</span>
			</div>
			{error && (
				<div className={` mt-2 ${msgTooltip ? " inline-block bg-danger-500 text-white text-[10px] px-2 py-1 rounded" : "text-sm font-normal text-danger-500 block"}`}>
					{error.message}
				</div>
			)}
			{validate && (
				<div className={` mt-2 ${msgTooltip ? " inline-block bg-success-500 text-white text-[10px] px-2 py-1 rounded" : " text-success-500 block text-sm"}`}>
					{validate}
				</div>
			)}
			{description && <span className="input-description">{description}</span>}
		</div>
	);
};

export default InputGroup;
