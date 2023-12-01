import Dropdown from "@/components/ui/Dropdown";
import { Link } from "react-router-dom";
import { FiBell } from "react-icons/fi";

const notifyLabel = (): JSX.Element => {
	return (
		<span className="relative lg:h-[22px] lg:w-[22px] lg:dark:bg-slate-900 dark:text-white cursor-pointer rounded-full text-[22px] flex flex-col items-center justify-center">
			<FiBell className="animate-tada" />
			<span className="absolute css-an-fanw-aw2 lg:right-0 lg:top-0 -top-2 -right-2 h-4 w-4 bg-red-500 text-[8px] font-semibold flex flex-col items-center justify-center rounded-full text-white z-[99]">
				2
			</span>
		</span>
	);
};



const Notification = (): JSX.Element => {
	return (
		<Dropdown wrapperClass="css-n-anf-a0" classMenuItems="md:w-[300px] top-[58px]" label={notifyLabel()}>
			<div className="flex justify-between px-4 py-4 border-b border-slate-100 dark:border-slate-600">
				<div className="text-sm text-slate-800 dark:text-slate-200 font-medium leading-6">
					Notifications
				</div>
				<div className="text-slate-800 dark:text-slate-200 text-xs md:text-right">
					<Link to="/dashboard" className="underline">
						Tampilkan Semua
					</Link>
				</div>
			</div>
			<div className="divide-y divide-slate-100 dark:divide-slate-800">
				{/* Map data here */}
			</div>
		</Dropdown>
	);
};

export default Notification;