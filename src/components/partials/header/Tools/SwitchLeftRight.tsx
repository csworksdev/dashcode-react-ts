import React from "react";

import { FiColumns, FiLayout } from "react-icons/fi";
import useRtl from "@/hooks/useRtl";

const SwitchLeftRight: React.FC = () => {
	const [isRtl, setRtl] = useRtl();

	return (
		<div className="css-nc-a0-2_2w-a9D-c" onClick={() => setRtl(!isRtl)}>
			<span className="css-n-anf-a0">
				<div className="lg:h-[22px] lg:w-[22px] dark:text-white text-slate-900 cursor-pointer rounded-full text-[22px] flex flex-col items-center justify-center">
					{isRtl ? (
						<FiColumns size={22} color="#4B5675" />
					) : (
						<FiLayout size={22} color="#4B5675" />
					)}
				</div>
			</span>
		</div>

	);
};

export default SwitchLeftRight;