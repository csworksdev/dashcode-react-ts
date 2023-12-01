import React from "react";
import useFooterType from "@/hooks/useFooterType";

const Footer: React.FC<{ className?: string }> = ({ className = "custom-class" }) => {
	const [footerType] = useFooterType();
	const footerClassName = (): string => {
		switch (footerType) {
			case "sticky":
				return "sticky bottom-0 z-[999]";
			case "static":
				return "static";
			case "hidden":
				return "hidden";
			default:
				return "";
		}
	};
	return (
		<footer className={className + " " + footerClassName()}>
			<div className="site-footer px-6 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-300 py-4">
				<div className="grid md:grid-cols-2 grid-cols-1 md:gap-5">
					<div className="text-center ltr:md:text-start rtl:md:text-right text-sm font-bold">
						<span className="badge badge-dark">SIPD Penatausahaan - Development Build Version</span>
					</div>
					<div className="ltr:md:text-right rtl:md:text-end text-center text-sm">
						Kementerian Dalam Negeri Republik Indonesia
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;