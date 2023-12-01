import { Suspense, useEffect, useState } from "react";
import Header from "@/components/partials/header";
import Sidebar from "@/components/partials/sidebar";
import useWidth from "@/hooks/useWidth";
import useSidebar from "@/hooks/useSidebar";
import useContentWidth from "@/hooks/useContentWidth";
import useMenulayout from "@/hooks/useMenulayout";
import useMenuHidden from "@/hooks/useMenuHidden";
import Footer from "@/components/partials/footer";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import MobileMenu from "../components/partials/sidebar/MobileMenu";
import useMobileMenu from "@/hooks/useMobileMenu";
import MobileFooter from "@/components/partials/footer/MobileFooter";
import { motion } from "framer-motion";
import { getProfile } from "@/api/settings/profile";
import useProfile from "@/hooks/useProfile";
import { getCookie } from "@/utils/cookie";
import Rendering from "@/components/main/Rendering";
import useDarkmode from "@/hooks/useDarkMode";
import { useLocation, useNavigate } from 'react-router-dom';
import { getDetailDaerah } from "@/api/settings/daerah";
import { randomString } from "@/utils/stringConverter";

type Props = {
	children: JSX.Element | JSX.Element[],
};

const Layout = ({ children }: Props) => {
	const { width, breakpoints } = useWidth();
	const [collapsed] = useSidebar();
	const [IsDarkMode] = useDarkmode();
	const location = useLocation();
	const [CookieIdentity, setCookieIdentity] = useState<any>();
	const navigate = useNavigate();

	const [, setProfile] = useProfile();

	useEffect(() => {
		return () => {
			setProfile(null)
		};
	}, [])

	const switchHeaderClass = () => {
		if (menuType === "horizontal" || menuHidden) {
			return "ltr:ml-0 rtl:mr-0";
		} else if (collapsed) {
			return "ltr:ml-[72px] rtl:mr-[72px]";
		} else {
			return "ltr:ml-[248px] rtl:mr-[248px]";
		}
	};
	const [contentWidth] = useContentWidth();
	const [menuType] = useMenulayout();
	const [menuHidden] = useMenuHidden();
	const [mobileMenu, setMobileMenu] = useMobileMenu();

	useEffect(() => {
		window.scrollTo(0, 0)
		const cookieUser = getCookie('X-SIPD-PU-IDENTITY', true)
		if (cookieUser !== null && cookieUser !== 'FORBIDDEN' && cookieUser !== '') {
			setCookieIdentity(cookieUser)
		} else {
			navigate('/FORBIDDEN/' + randomString(250));
		}
		// handleGetProfile()
	}, [location.pathname])

	useEffect(() => {
		if (CookieIdentity != null) {
			handleGetProfile()
		}
	}, [CookieIdentity])

	const handleGetProfile = () => {
		const cookieUser = CookieIdentity
		let user = []
		let mockUser: ProfileResponseType
		if (cookieUser != null && cookieUser != '') {
			user = JSON.parse(cookieUser)
			mockUser = {
				id_user: user.id_user,
				id_daerah: user.id_daerah,
				id_pegawai: user.id_pegawai,
				nip_user: '',
				nama_user: '',
				id_pang_gol: 0,
				nik_user: '',
				npwp_user: '',
				alamat: '',
				lahir_user: '',
				id_role: user.id_role,
				id_skpd: user.id_skpd,
				nama_role: user.nama_role,
				nama_skpd: user.nama_skpd,
				password: user.password,
				tahun: user.tahun,
				username: user.username,
				kode_kab: '',
				kode_prop: '',
				nama_daerah: '',
			}
		}

		getProfile().then(function (res) {
			if (res.data.code !== 0) {
				const response = res.data
				mockUser.id_user = response.id_user
				mockUser.id_daerah = response.id_daerah
				mockUser.nip_user = response.nip_user
				mockUser.nama_user = response.nama_user
				mockUser.id_pang_gol = response.id_pang_gol
				mockUser.nik_user = response.nik_user
				mockUser.npwp_user = response.npwp_user
				mockUser.alamat = response.alamat
				mockUser.lahir_user = response.lahir_user
			}

			handleGetDetailDaerah(mockUser)

			// setProfile(mockUser)
		}).catch(function (error) {
			// setProfile(mockUser)
			handleGetDetailDaerah(mockUser)
		})
	};

	const handleGetDetailDaerah = (profile: ProfileResponseType) => {
		getDetailDaerah(profile.id_daerah).then(function (res) {
			const responseDaerah = res.data
			profile.kode_kab = responseDaerah.kode_kab
			profile.kode_prop = responseDaerah.kode_prop
			profile.nama_daerah = responseDaerah.nama_daerah
			setProfile(profile)
		}).catch(function (error) {
			setProfile(profile)
		}).finally(function () {

		})
	};

	return (
		<>
			<Header className={width > Number(breakpoints.xl) ? switchHeaderClass() : ""} />
			{menuType === "vertical" && width > Number(breakpoints.xl) && !menuHidden && (
				<Sidebar />
			)}

			<MobileMenu className={`${width < Number(breakpoints.xl) && mobileMenu ? "left-0 visible opacity-100 z-[9999]" : "left-[-300px] invisible opacity-0  z-[-999]"}`} />
			{width < Number(breakpoints.xl) && mobileMenu && (
				<div className="overlay bg-slate-900/50 backdrop-filter backdrop-blur-sm opacity-100 fixed inset-0 z-[999]" onClick={() => setMobileMenu(false)}></div>
			)}
			<div className={`content-wrapper transition-all duration-150 ${width > 1280 ? switchHeaderClass() : ""}`}>
				<div className={`page-content ${IsDarkMode && 'page-content-dark'} page-min-height`}>
					<div className={contentWidth === "boxed" ? "container mx-auto" : "container-fluid"}>
						<Suspense fallback={<Rendering />}>
							<motion.div
								key={location.pathname}
								initial="pageInitial"
								animate="pageAnimate"
								exit="pageExit"
								variants={{
									pageInitial: {
										opacity: 0,
										y: 50,
									},
									pageAnimate: {
										opacity: 1,
										y: 0,
									},
									pageExit: {
										opacity: 0,
										y: -50,
									},
								}}
								transition={{
									type: "tween",
									ease: "easeInOut",
									duration: 0.5,
								}}
							>
								<Breadcrumbs />
								{children}
							</motion.div>
						</Suspense>
					</div>
				</div>
			</div>
			{width < Number(breakpoints.md) && <MobileFooter />}
			{width > Number(breakpoints.md) && (
				<Footer className={width > Number(breakpoints.xl) ? switchHeaderClass() : ""} />
			)}
		</>
	);
};

export default Layout;
