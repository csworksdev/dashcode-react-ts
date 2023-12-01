import React from "react";
import Icon from "@/components/ui/Icon";
import SwitchDark from "./Tools/SwitchDark";
import useWidth from "@/hooks/useWidth";
import useSidebar from "@/hooks/useSidebar";
import useNavbarType from "@/hooks/useNavbarType";
import useMenulayout from "@/hooks/useMenulayout";
import useSkin from "@/hooks/useSkin";
import Logo from "./Tools/Logo";
import SearchModal from "./Tools/SearchModal";
import Profile from "./Tools/Profile";
import useRtl from "@/hooks/useRtl";
import useMobileMenu from "@/hooks/useMobileMenu";
import MonoChrome from "./Tools/MonoChrome";
import useDarkmode from "@/hooks/useDarkMode";
import SpeedTest from "./Tools/SpeedTest";
import SwitchLeftRight from "./Tools/SwitchLeftRight";

const Header: React.FC<{ className?: string }> = ({ className = "custom-class" }) => {
	const [collapsed, setMenuCollapsed] = useSidebar();
	const [IsDarkMode] = useDarkmode();
	const { width, breakpoints } = useWidth();
	const [navbarType] = useNavbarType();

	const navbarTypeClass = (): string => {
		switch (navbarType) {
			case "floating":
				return "floating  has-sticky-header";
			case "sticky":
				return "sticky top-0 z-[999]";
			case "static":
				return "static";
			case "hidden":
				return "hidden";
			default:
				return "sticky top-0";
		}
	};
	const [menuType] = useMenulayout();
	const [skin] = useSkin();
	const [isRtl] = useRtl();

	const [mobileMenu, setMobileMenu] = useMobileMenu();

	const handleOpenMobileMenu = (): void => {
		setMobileMenu(!mobileMenu);
	};

	const borderSwicthClass = (): string => {
		if (skin === "bordered" && navbarType !== "floating") {
			return "border-b border-slate-200 dark:border-slate-700";
		} else if (skin === "bordered" && navbarType === "floating") {
			return "border border-slate-200 dark:border-slate-700";
		} else {
			return "dark:border-b dark:border-slate-700 dark:border-opacity-60";
		}
	};

	return (
		<header className={className + " " + navbarTypeClass()}>
			<div className={`app-header md:px-6 px-[15px] dark:bg-slate-800 shadow-base dark:shadow-base3 bg-white ${borderSwicthClass()} ${menuType === "horizontal" && width > Number(breakpoints.xl) ? "py-0" : `md:py-1 ${IsDarkMode ? 'css-nanawf-na-wf2' : 'css-nanawf-na-wf'} py-3`}`}>
				<div className="flex justify-between items-center h-full">
					{menuType === "vertical" && (
						<div className="flex items-center md:space-x-4 space-x-2 rtl:space-x-reverse">
							{collapsed && width >= Number(breakpoints.xl) && (
								<button
									className="text-xl text-slate-900 dark:text-white"
									onClick={() => setMenuCollapsed(!collapsed)}
								>
									{isRtl ? (
										<Icon icon="akar-icons:arrow-left" />
									) : (
										<Icon icon="akar-icons:arrow-right" />
									)}
								</button>
							)}
							{width < Number(breakpoints.xl) && <Logo />}
							{width < Number(breakpoints.xl) && width >= Number(breakpoints.md) && (
								<div
									className="cursor-pointer text-slate-900 dark:text-white text-2xl"
									onClick={handleOpenMobileMenu}
								>
									<Icon icon="heroicons-outline:menu-alt-3" />
								</div>
							)}
							<div className="css-c0-a-022wd_f-0-cfa">
								<SpeedTest
									outputType="empty"
									pingInterval={4000}
									thresholdUnit='megabyte'
									threshold={200}
									imageUrl="http://192.168.128.101:30001/swagger/favicon-32x32.png"
									downloadSize={1781287}
								/>
							</div>
							<SearchModal />
							<div className="css-c-3C_c-w-2wcD">
								<div className="css-ck-j2C-cn_I4 red"></div>
								<div className="css-ck-j2C-cn_I4 yellow"></div>
								<div className="css-ck-j2C-cn_I4 green"></div>
							</div>
						</div>
					)}
					{menuType === "horizontal" && (
						<div className="flex items-center space-x-4 rtl:space-x-reverse">
							<Logo />
							{width <= Number(breakpoints.xl) && (
								<div className="cursor-pointer text-slate-900 dark:text-white text-2xl" onClick={handleOpenMobileMenu}>
									<Icon icon="heroicons-outline:menu-alt-3" />
								</div>
							)}
						</div>
					)}
					{/* {menuType === "horizontal" && width >= Number(breakpoints.xl) ? (
						<HorizentalMenu />
					) : null} */}
					<div className="nav-tools flex items-center rtl:space-x-reverse">
						{/* <Language /> */}

						<SwitchLeftRight />
						<SwitchDark />
						<MonoChrome />
						{/* {width >= Number(breakpoints.md) && <Message />}
						{width >= Number(breakpoints.md) && <Notification />} */}
						{width >= Number(breakpoints.md) && <Profile />}
						{width <= Number(breakpoints.md) && (
							<div
								className="cursor-pointer text-slate-900 dark:text-white text-2xl"
								onClick={handleOpenMobileMenu}
							>
								<Icon icon="heroicons-outline:menu-alt-3" />
							</div>
						)}
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;