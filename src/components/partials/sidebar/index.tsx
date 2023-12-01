import React, { useRef, useEffect, useState } from "react";
import SidebarLogo from "./Logo";
import Navmenu from "./Navmenu";
import SimpleBar from "simplebar-react";
import useSidebar from "@/hooks/useSidebar";
import useSemiDark from "@/hooks/useSemiDark";
import useSkin from "@/hooks/useSkin";

const Sidebar: React.FC = () => {
	const scrollableNodeRef = useRef<HTMLDivElement>(null);
	const [scroll, setScroll] = useState(false);
	const [collapsed, setMenuCollapsed] = useSidebar();
	const [menuHover, setMenuHover] = useState(false);
	const [isSemiDark] = useSemiDark();
	const [skin] = useSkin();

	useEffect(() => {
		const handleScroll = () => {
			if (scrollableNodeRef.current?.scrollTop != null) {
				if (scrollableNodeRef.current?.scrollTop > 0) {
					setScroll(true);
				} else {
					setScroll(false);
				}
			}
		};
		scrollableNodeRef.current?.addEventListener("scroll", handleScroll);
	}, [scrollableNodeRef]);

	return (
		<div className={isSemiDark ? "dark" : ""}>
			<div className={`sidebar-wrapper bg-white dark:bg-slate-800 ${collapsed ? "w-[72px] close_sidebar" : `w-[248px]`} ${menuHover ? "sidebar-hovered" : ""}${skin === "bordered" ? "border-r border-slate-200 dark:border-slate-700" : "shadow-base"}`}>
				<SidebarLogo menuHover={menuHover} />
				<div className={`h-[60px] absolute top-[80px] nav-shadow z-[1] w-full transition-all duration-200 pointer-events-none ${scroll ? " opacity-100" : " opacity-0"}`}></div>
				<SimpleBar className="sidebar-menu mt-5 px-4 h-[calc(100%-120px)]">
					<Navmenu />
				</SimpleBar>
			</div>
		</div>
	);
};

export default Sidebar;