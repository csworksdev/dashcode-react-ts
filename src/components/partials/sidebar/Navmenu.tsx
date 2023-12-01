import Icon from "@/components/ui/Icon";
import useProfile from "@/hooks/useProfile";
import SidebarShimmer from "@/components/skeleton/SidebarShimmer";
import toast from "react-hot-toast";
import useSidebar from "@/hooks/useSidebar";
import SidebarTooltip from "@/components/ui/SidebarTooltip";
import useDarkmode from "@/hooks/useDarkMode";
// import useRute from "@/hooks/useRute";
import { ROLE_BENDAHARA_UMUM_DAERAH, ROLE_PENGGUNA_ANGGARAN } from "@/constant/data";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Collapse } from "react-collapse";
import { checkRbacMenu } from "@/api/settings/rbac/Menu";
import _ from 'lodash';
import { SidebarMenuItems } from "@/constant/sidebar-menu-items";

const Navmenu = () => {
	const [activeSubmenu] = useState<number | null>(null);
	const location = useLocation();
	const locationName = location.pathname.replace("/", "");
	const [ActiveLevel, setActiveLevel] = useState<any>([]);
	const [MockMenu, setMockMenu] = useState<SidebarMenuItemsType[]>([]);
	const [Profile] = useProfile();
	const [collapsed] = useSidebar();
	// const [, setRute] = useRute();
	const [IsDarkMode] = useDarkmode();

	useEffect(() => {
		setMockMenu([])
		if (Profile != null) {
			// TODO: Bottleneck this function run twice, dont know why
			let convertUserId = Profile.id_user + '.' + Profile.id_daerah
			// const mockMenu = menuItems
			const mockMenu = _.cloneDeep(SidebarMenuItems);
			setMockMenu([])
			handleCheckRbacMenu(convertUserId, mockMenu)
		}
	}, [Profile])

	async function handleCheckRbacMenu(convertUserId: string, mockOriginalMenu: any) {
		// Dont check rbac for exception menu and not clickable menu (header)
		let menusException = mockOriginalMenu.filter((menusItem: any) => menusItem.isHeadr == null && menusItem.except_rbac == null);

		// Check rbac menu
		// const promises = menusException.map((menus: any) => checkRbacMenu(convertUserId, menus.title.toLowerCase()));

		// Check rbac menu 2 level
		let mockPromise = []
		for (let i = 0; i < menusException.length; i++) {
			// Level 1 check
			mockPromise.push(checkRbacMenu(convertUserId, (menusException[i].id || menusException[i].title).toLowerCase()))
		}

		const response: any = await Promise.all(mockPromise); // This service in prommise, must return a boolean response

		// Jika response tidak sama dengan menu sidebar / response ada yang gagal
		if (response.length !== menusException.length) {
			toast.error('Oops!.. Gagal memproses menu RBAC')
			return
		}

		let mockPromiseLevel2 = []
		let setIndex = []
		for (let i = 0; i < menusException.length; i++) {

			// HARDCODE RBAC SUPPORT
			if (Profile != null && (menusException[i].id === '!!-penugasanpptk' || menusException[i].id === '!!-pelimpahankewenangan') && Profile != null && Profile.id_role === ROLE_BENDAHARA_UMUM_DAERAH) {
				menusException[i]['rbac'] = false
			} else if (Profile != null && (menusException[i].id === '!!-jadwal' || menusException[i].id === '!!-kebijakanspd' || menusException[i].id === '!!-besaranup') && Profile != null && Profile.id_role === ROLE_PENGGUNA_ANGGARAN) {
				menusException[i]['rbac'] = false
			} else {
				menusException[i]['rbac'] = response[i].data
			}
			if (response[i].data && menusException[i].children != null) {
				for (let k = 0; k < menusException[i].children.length; k++) {
					if (menusException[i].children[k] != null) { // Fix bug when change account without refresh
						setIndex.push({
							index: i,
							childIndex: k,
							title: menusException[i].title,
							childTitle: menusException[i].children[k].title
						})
						mockPromiseLevel2.push(checkRbacMenu(convertUserId, (menusException[i].children[k].id || menusException[i].children[k].title).toLowerCase()))
					}
				}
			}
		}

		const responseLevel2: any = await Promise.all(mockPromiseLevel2);
		if (responseLevel2.length !== setIndex.length) {
			toast.error('Oops!.. Gagal memproses menu RBAC')
		}

		for (let i = 0; i < responseLevel2.length; i++) {
			if (menusException[setIndex[i].index].children != null && menusException[setIndex[i].index].children[setIndex[i].childIndex] != null) {
				menusException[setIndex[i].index].children[setIndex[i].childIndex]['rbac'] = responseLevel2[i].data
			}
		}

		await checkRbacLevel3(convertUserId, menusException)

		let duplicateOriginalMenu = []
		for (let i = 0; i < mockOriginalMenu.length; i++) {
			duplicateOriginalMenu[i] = mockOriginalMenu[i]
		}

		for (let i = 0; i < duplicateOriginalMenu.length; i++) {

			if (duplicateOriginalMenu[i].isHeadr || duplicateOriginalMenu[i].except_rbac) {
				// Set always to true if header or exception menu rbac
				duplicateOriginalMenu[i]['rbac'] = true
			} else {
				for (let k = 0; k < menusException.length; k++) {
					if (duplicateOriginalMenu[i].title === menusException[k].title) {
						duplicateOriginalMenu[i] = menusException[k]
						if (duplicateOriginalMenu[i].children != null) {
							for (let h = 0; h < duplicateOriginalMenu[i].children.length; h++) {
								if (duplicateOriginalMenu[i].children[h] != null && duplicateOriginalMenu[i].children[h].rbac === false) {
									if (duplicateOriginalMenu[i].children[h].except_rbac) {
										duplicateOriginalMenu[i].children[h]['rbac'] = true
									} else {
										delete duplicateOriginalMenu[i].children[h]
									}

								} else {

									if (Profile != null && (duplicateOriginalMenu[i].children[h].id === "!!-rekeningbank-rkud") && Profile.id_role === ROLE_PENGGUNA_ANGGARAN) {
										delete duplicateOriginalMenu[i].children[h]
									}
									// Level 3 remove
									if (duplicateOriginalMenu[i].children[h] != null && duplicateOriginalMenu[i].children[h].children != null) {
										for (let f = 0; f < duplicateOriginalMenu[i].children[h].children.length; f++) {
											
											if (duplicateOriginalMenu[i].children[h].children[f] != null && duplicateOriginalMenu[i].children[h].children[f].id != null) {
												if (Profile != null && (duplicateOriginalMenu[i].children[h].children[f].id === "!!-rekeningbank-skpd-pengajuan") && Profile.id_role === ROLE_BENDAHARA_UMUM_DAERAH) {
													delete duplicateOriginalMenu[i].children[h].children[f]
												} else if (Profile != null && (duplicateOriginalMenu[i].children[h].children[f].id === "!!-rekeningbank-skpd-pembuatan" || duplicateOriginalMenu[i].children[h].children[f].id === "!!-penatausahaan-pengeluaran-spd-otorisasi") && Profile.id_role === ROLE_PENGGUNA_ANGGARAN) {
													delete duplicateOriginalMenu[i].children[h].children[f]
												}
											}

											if (duplicateOriginalMenu[i].children[h].children[f] != null && duplicateOriginalMenu[i].children[h].children[f].rbac === false) {

												// HARDCODE RBAC SUPPORT
												// if (Profile != null && (menusException[setIndex[i].index].children[setIndex[i].childIndex].id === "!!-rekeningbank-skpd")) {
												// 	menusException[setIndex[i].index].children[setIndex[i].childIndex]['rbac'] = false
												// } else {
												// }

												if (duplicateOriginalMenu[i].children[h].children[f].except_rbac) {
													duplicateOriginalMenu[i].children[h].children[f]['rbac'] = true
												} else {
													delete duplicateOriginalMenu[i].children[h].children[f]
												}

											} else {
												// Level 4 remove
												if (duplicateOriginalMenu[i].children[h].children[f] != null && duplicateOriginalMenu[i].children[h].children[f].children != null) {
													for (let L4 = 0; L4 < duplicateOriginalMenu[i].children[h].children[f].children.length; L4++) {
														if (duplicateOriginalMenu[i].children[h].children[f].children[L4] != null && duplicateOriginalMenu[i].children[h].children[f].children[L4].rbac === false) {

															if (duplicateOriginalMenu[i].children[h].children[f].children[L4].except_rbac) {
																duplicateOriginalMenu[i].children[h].children[f].children[L4]['rbac'] = true
															} else {
																delete duplicateOriginalMenu[i].children[h].children[f].children[L4]
															}

														} else {

															if (duplicateOriginalMenu[i].children[h].children[f].children[L4] != null && duplicateOriginalMenu[i].children[h].children[f].children[L4].children != null) {
																for (let L5 = 0; L5 < duplicateOriginalMenu[i].children[h].children[f].children[L4].children.length; L5++) {
																	if (duplicateOriginalMenu[i].children[h].children[f].children[L4].children[L5] != null && duplicateOriginalMenu[i].children[h].children[f].children[L4].children[L5].rbac === false) {

																		if (duplicateOriginalMenu[i].children[h].children[f].children[L4].children[L5].except_rbac) {
																			duplicateOriginalMenu[i].children[h].children[f].children[L4].children[L5]['rbac'] = true
																		} else {
																			delete duplicateOriginalMenu[i].children[h].children[f].children[L4].children[L5]
																		}

																	} else {



																	}
																}
															}

														}
													}
												}

											}
										}
									}

								}
							}
						}
					}
				}
			}
		}
		duplicateOriginalMenu = duplicateOriginalMenu.filter(function (el: any) {
			return el.rbac === true
		});

		// Remove not clickable (Header) menu if there is not clickable children
		let fixedMenu = []
		for (let m = 0; m < duplicateOriginalMenu.length; m++) {
			if (duplicateOriginalMenu[m].rbac === true) {
				if (duplicateOriginalMenu[m].isHeadr) {
					if (duplicateOriginalMenu[m + 1] != null) {
						if (!duplicateOriginalMenu[m + 1].isHeadr) {
							fixedMenu.push(duplicateOriginalMenu[m])
						}
					}
				} else {
					fixedMenu.push(duplicateOriginalMenu[m])
				}
			} else {
				fixedMenu.push(duplicateOriginalMenu[m])
			}
		}
		setMockMenu(fixedMenu)
		// setTimeout(() => {
		// }, 2000);

		// const mockRoute = _.cloneDeep(fixedMenu);s
		// let mockRoute2 = extractChildren(mockRoute)

		// mockRoute2 = mockRoute2.filter(function (el: any) {
		// 	return el.link !== '#!'
		// });

		// setRute(mockRoute2)
	};

	async function checkRbacLevel3(convertUserId: string, menu: any) {
		let mockPromiseLevel3 = []
		let mockPromiseLevel4 = []
		let mockPromiseLevel5 = []
		let setIndex = []
		let level_3_index = []
		let level_4_index = []
		let level_5_index = []
		for (let l1 = 0; l1 < menu.length; l1++) {
			if (menu[l1].children != null) {
				for (let l2 = 0; l2 < menu[l1].children.length; l2++) {

					// Level 3
					if (menu[l1].children[l2] != null && menu[l1].children[l2].children != null) {
						for (let l3 = 0; l3 < menu[l1].children[l2].children.length; l3++) {
							level_3_index.push({
								level1Index: l1,
								level2Index: l2,
								level3Index: l3,
								level1Title: menu[l1].title,
								level2Title: menu[l1].children[l2].title,
								level3Title: menu[l1].children[l2].children[l3].title,
							})
							// Level 4
							if (menu[l1].children[l2].children[l3] != null && menu[l1].children[l2].children[l3].children != null) {
								for (let l4 = 0; l4 < menu[l1].children[l2].children[l3].children.length; l4++) {

									level_4_index.push({
										level1Index: l1,
										level2Index: l2,
										level3Index: l3,
										level4Index: l4,
										level1Title: menu[l1].title,
										level2Title: menu[l1].children[l2].title,
										level3Title: menu[l1].children[l2].children[l3].title,
										level4Title: menu[l1].children[l2].children[l3].children[l4].title,
									})

									// Level 5
									if (menu[l1].children[l2].children[l3].children[l4] != null && menu[l1].children[l2].children[l3].children[l4].children != null) {
										for (let l5 = 0; l5 < menu[l1].children[l2].children[l3].children[l4].children.length; l5++) {
											level_5_index.push({
												level1Index: l1,
												level2Index: l2,
												level3Index: l3,
												level4Index: l4,
												level5Index: l5,
												level1Title: menu[l1].title,
												level2Title: menu[l1].children[l2].title,
												level3Title: menu[l1].children[l2].children[l3].title,
												level4Title: menu[l1].children[l2].children[l3].children[l4].title,
												level5Title: menu[l1].children[l2].children[l3].children[l4].children[l5].title,
											})
											mockPromiseLevel5.push(checkRbacMenu(convertUserId, (menu[l1].children[l2].children[l3].children[l4].children[l5].id || menu[l1].children[l2].children[l3].children[l4].children[l5].title).toLowerCase()))
										}
									}
									mockPromiseLevel4.push(checkRbacMenu(convertUserId, (menu[l1].children[l2].children[l3].children[l4].id || menu[l1].children[l2].children[l3].children[l4].title).toLowerCase()))
								}
							}
							if (menu[l1].children[l2].children[l3] != null) {
								mockPromiseLevel3.push(checkRbacMenu(convertUserId, (menu[l1].children[l2].children[l3].id || menu[l1].children[l2].children[l3].title).toLowerCase()))
							}
						} // Level 5
					} // Level 4
				} // Level 3
			}
		}

		const responseLevel3: any = await Promise.all(mockPromiseLevel3);
		if (responseLevel3.length !== level_3_index.length) {
			toast.error('Oops!.. Gagal memproses menu RBAC')
		}

		for (let i = 0; i < responseLevel3.length; i++) {
			if (
				menu[level_3_index[i].level1Index].children != null
				&&
				menu[level_3_index[i].level1Index].children[level_3_index[i].level2Index] != null
				&&
				menu[level_3_index[i].level1Index].children[level_3_index[i].level2Index].children != null
				&&
				menu[level_3_index[i].level1Index].children[level_3_index[i].level2Index].children[level_3_index[i].level3Index] != null
			) {
				menu[level_3_index[i].level1Index].children[level_3_index[i].level2Index].children[level_3_index[i].level3Index]['rbac'] = responseLevel3[i].data
			}
		}

		// LEVEL 4
		const responseLevel4: any = await Promise.all(mockPromiseLevel4);
		if (responseLevel4.length !== level_4_index.length) {
			toast.error('Oops!.. Gagal memproses menu RBAC')
		}

		for (let i = 0; i < responseLevel4.length; i++) {
			if (
				menu[level_4_index[i].level1Index].children != null
				&&
				menu[level_4_index[i].level1Index].children[level_4_index[i].level2Index] != null
				&&
				menu[level_4_index[i].level1Index].children[level_4_index[i].level2Index].children != null
				&&
				menu[level_4_index[i].level1Index].children[level_4_index[i].level2Index].children[level_4_index[i].level3Index] != null
				&&
				menu[level_4_index[i].level1Index].children[level_4_index[i].level2Index].children[level_4_index[i].level3Index].children != null
				&&
				menu[level_4_index[i].level1Index].children[level_4_index[i].level2Index].children[level_4_index[i].level3Index].children[level_4_index[i].level4Index] != null
			) {
				menu[level_4_index[i].level1Index].children[level_4_index[i].level2Index].children[level_4_index[i].level3Index].children[level_4_index[i].level4Index]['rbac'] = responseLevel4[i].data
			}
		}

		// LEVEL 5
		const responseLevel5: any = await Promise.all(mockPromiseLevel5);
		if (responseLevel5.length !== level_5_index.length) {
			toast.error('Oops!.. Gagal memproses menu RBAC')
		}

		for (let i = 0; i < responseLevel5.length; i++) {
			if (
				menu[level_5_index[i].level1Index].children != null
				&&
				menu[level_5_index[i].level1Index].children[level_5_index[i].level2Index] != null
				&&
				menu[level_5_index[i].level1Index].children[level_5_index[i].level2Index].children != null
				&&
				menu[level_5_index[i].level1Index].children[level_5_index[i].level2Index].children[level_5_index[i].level3Index] != null
				&&
				menu[level_5_index[i].level1Index].children[level_5_index[i].level2Index].children[level_5_index[i].level3Index].children != null
				&&
				menu[level_5_index[i].level1Index].children[level_5_index[i].level2Index].children[level_5_index[i].level3Index].children[level_5_index[i].level4Index] != null
				&&
				menu[level_5_index[i].level1Index].children[level_5_index[i].level2Index].children[level_5_index[i].level3Index].children[level_5_index[i].level4Index].children != null
				&&
				menu[level_5_index[i].level1Index].children[level_5_index[i].level2Index].children[level_5_index[i].level3Index].children[level_5_index[i].level4Index].children[level_5_index[i].level5Index] != null
			) {
				menu[level_5_index[i].level1Index].children[level_5_index[i].level2Index].children[level_5_index[i].level3Index].children[level_5_index[i].level4Index].children[level_5_index[i].level5Index]['rbac'] = responseLevel5[i].data
			}
		}

		return menu;
	};

	// function extractChildren(data: any[]) {
	// 	let result: any = [];

	// 	for (let i = 0; i < data.length; i++) {
	// 		if (data[i] != null && data[i].isHeadr !== true) {
	// 			// Jika item tidak memiliki field "isHeadr" true, maka proses
	// 			if (data[i].children && data[i].children.length > 0) {
	// 				// Rekursif: Ambil semua child dari item saat ini
	// 				const children = extractChildren(data[i].children);
	// 				result = result.concat(children);
	// 				delete data[i].children; // Hapus child dari item saat ini
	// 			}

	// 			result.push(data[i]);
	// 		}
	// 	}

	// 	return result;
	// }

	useEffect(() => {
		let lodashCloningMenu = _.cloneDeep(MockMenu)
		let extractedChildren = extractChildren(lodashCloningMenu)
		if (location.pathname != null && extractedChildren != null && extractedChildren.length > 0) {
			for (let i = 0; i < extractedChildren.length; i++) {
				if (extractedChildren[i] != null && extractedChildren[i].link != null) {
					let link = extractedChildren[i].link || ''
					if (link.includes(location.pathname)) {
						const levelFound = findParentTitles(MockMenu, extractedChildren[i].link);
						let thisPath = []
						if (levelFound != null && levelFound.length > 0) {
							for (let k = 0; k < levelFound[0].length; k++) {
								thisPath.push(levelFound[0][k])
							}
							setActiveLevel(thisPath)
						}
					}
				}
			}
		}
	}, [MockMenu])

	function extractChildren(data: any[]) {
		let result: any = [];

		for (let i = 0; i < data.length; i++) {
			if (data[i] != null && data[i].isHeadr !== true) {
				// Jika item tidak memiliki field "isHeadr" true, maka proses
				if (data[i].children && data[i].children.length > 0) {
					// Rekursif: Ambil semua child dari item saat ini
					const children = extractChildren(data[i].children);
					result = result.concat(children);
					delete data[i].children; // Hapus child dari item saat ini
				}

				result.push(data[i]);
			}
		}

		return result;
	}

	function findParentTitles(obj: any, targetLink: any, parentTitles = []) {
		const result: any = [];
		for (const item of obj) {
			if (item != null && item.title != null) {
				const currentTitles: any = [...parentTitles, item.title];

				if (item.link === targetLink) {
					result.push(currentTitles);
				}

				if (item.children) {
					const childResults = findParentTitles(item.children, targetLink, currentTitles);
					result.push(...childResults);
				}
			}
		}

		return result;
	}

	return (
		<>
			<ul>
				{
					MockMenu != null && MockMenu.length > 0 ? MockMenu.map((level1Item: any, i: number) => {

						const thisPath = [level1Item.title]
						return (
							<li key={i} className={`single-sidebar-menu ${level1Item.children ? "item-has-children" : ""} ${activeSubmenu === i ? "open" : ""} ${'/' + locationName === level1Item.link ? "menu-item-active" : ""}`}>
								{
									!level1Item.isHeadr ?
										<NavLink onClick={() => ActiveLevel.includes(level1Item.title) ? setActiveLevel([]) : setActiveLevel(thisPath)} className={`menu-link ${IsDarkMode ? 'css-an-wn-fwna-2' : 'css-an-wn-fwna-1'} ${ActiveLevel.includes(level1Item.title) && 'css-an-wn-fwna-15fa'}`} to={level1Item.link}>
											<div className="container-side-menu-main">
												<div className="container-side-menu-icon-title">
													<span className="menu-icon flex-grow-0">
														{
															IsDarkMode ?
																<level1Item.icon className="dark:css-n-cafna-fnw1" size={20} color={`${'/' + locationName === level1Item.link ? "#FFFFFF" : "#FFFFFF"}`} /> :
																<level1Item.icon className="dark:css-n-cafna-fnw1" size={20} color={`${'/' + locationName === level1Item.link ? "#4669fa" : "black"}`} />
														}
													</span>
													{
														!collapsed &&
														<div className={`${IsDarkMode ? 'main-sidebar-text-dark' : 'main-sidebar-text'} text-sm text-slate-800 dark:text-slate-300 capitalize font-semibold`}>{level1Item.title}</div>
													}
												</div>
												{
													level1Item.children != null &&
													<div className="flex-0">
														<div className={`menu-arrow transform transition-all duration-300 ${ActiveLevel.includes(level1Item.title) ? " rotate-90" : ""}`}>
															<Icon icon="heroicons-outline:chevron-right" />
														</div>
													</div>
												}
												{/* <span className="menu-badge">badge</span> */}
												{level1Item.badge && <span className="menu-badge">{level1Item.badge}</span>}
											</div>
										</NavLink> : null
								}
								{
									level1Item.isHeadr && !level1Item.children && (
										<div className="menulabel">{level1Item.title}</div>
									)
								}

								{
									ActiveLevel.includes(level1Item.title) && level1Item.children != null ?
										<Collapse key={i} isOpened={true}>
											<div className="css-cn-a0-2d-_a21">
												{
													level1Item.children.map((level2Item: any, level2Index: number) => {
														const thisParentPath = [level1Item.title]
														const thisPath = [level1Item.title, level2Item.title]
														return (
															<>
																<Collapse key={level2Index} isOpened={true}>
																	<NavLink onClick={() => ActiveLevel.includes(level2Item.title) ? setActiveLevel(thisParentPath) : setActiveLevel(thisPath)} to={level2Item.link}>
																		<div className={`css-sidebar-menu-level sidebar-menu-level-2 ${ActiveLevel.includes(level2Item.title) && 'bg-sidebar-submenu-active'}`}>
																			{
																				level2Item.hint != null ?
																					<SidebarTooltip
																						title={<>
																							<IconLeftSubMenu active={ActiveLevel.includes(level2Item.title)} />
																							<span className={`css-j-wa-j0f flex-1 text-sm text-slate-400 dark:text-slate-300 capitalize font-semibold ${ActiveLevel.includes(level2Item.title) && 'text-sidebar-submenu-active'}`}>{level2Item.title}</span>
																							<IconRightSubMenu hasChild={level2Item.children} active={ActiveLevel.includes(level2Item.title)} />
																						</>}
																						content={level2Item.hint}
																						placement="right"
																						className={`${ActiveLevel.includes(level2Item.title) ? "text-black dark:text-white font-medium" : "main-text-childmenu text-slate-600 dark:text-slate-300"} text-sm flex space-x-3 items-center transition-all duration-150 rtl:space-x-reverse`}
																						theme="primary"
																						arrow
																					/> :
																					<span className={`${ActiveLevel.includes(level2Item.title) ? "text-black dark:text-white font-medium" : "main-text-childmenu text-slate-600 dark:text-slate-300"} text-sm flex space-x-3 items-center transition-all duration-150 rtl:space-x-reverse`}>
																						<IconLeftSubMenu active={ActiveLevel.includes(level2Item.title)} />
																						<span className={`css-j-wa-j0f flex-1 text-sm text-slate-400 dark:text-slate-300 capitalize font-semibold ${ActiveLevel.includes(level2Item.title) && 'text-sidebar-submenu-active'}`}>{level2Item.title}</span>
																						<IconRightSubMenu hasChild={level2Item.children} active={ActiveLevel.includes(level2Item.title)} />
																					</span>
																			}
																		</div>
																	</NavLink>
																</Collapse>
																{
																	(ActiveLevel.includes(level2Item.title) && level2Item.children) ?
																		level2Item.children.map((level3Item: any, level3Index: number) => {

																			const thisParentPath = [level1Item.title, level2Item.title]
																			const thisPath = [level1Item.title, level2Item.title, level3Item.title]
																			return (
																				<>
																					<Collapse key={level3Index} isOpened={true}>
																						<div className="css-cn-a0-2d-_a22">
																							<NavLink onClick={() => ActiveLevel.includes(level3Item.title) ? setActiveLevel(thisParentPath) : setActiveLevel(thisPath)} to={level3Item.link}>
																								<div className={`css-sidebar-menu-level sidebar-menu-level-3 ${ActiveLevel.includes(level3Item.title) && 'bg-sidebar-submenu-active'}`}>

																									{
																										level3Item.hint != null ?
																											<SidebarTooltip
																												title={<>
																													<IconLeftSubMenu active={ActiveLevel.includes(level3Item.title)} />
																													<span className={`css-j-wa-j0f flex-1 text-sm text-slate-400 dark:text-slate-300 capitalize font-semibold ${ActiveLevel.includes(level3Item.title) && 'text-sidebar-submenu-active'}`}>{level3Item.title}</span>
																													<IconRightSubMenu hasChild={level3Item.children} active={ActiveLevel.includes(level3Item.title)} />
																												</>}
																												content={level3Item.hint}
																												placement="right"
																												className={`${ActiveLevel.includes(level3Item.title) ? "text-black dark:text-white font-medium" : "main-text-childmenu text-slate-600 dark:text-slate-300"} text-sm flex space-x-3 items-center transition-all duration-150 rtl:space-x-reverse`}
																												theme="primary"
																												arrow
																											/> :
																											<span className={`${ActiveLevel.includes(level3Item.title) ? "text-black dark:text-white font-medium" : "main-text-childmenu text-slate-600 dark:text-slate-300"} text-sm flex space-x-3 items-center transition-all duration-150 rtl:space-x-reverse`}>
																												<IconLeftSubMenu active={ActiveLevel.includes(level3Item.title)} />
																												<span className={`css-j-wa-j0f flex-1 text-sm text-slate-400 dark:text-slate-300 capitalize font-semibold ${ActiveLevel.includes(level3Item.title) && 'text-sidebar-submenu-active'}`}>{level3Item.title}</span>
																												<IconRightSubMenu hasChild={level3Item.children} active={ActiveLevel.includes(level3Item.title)} />
																											</span>
																									}
																								</div>
																							</NavLink>
																						</div>
																					</Collapse>

																					{
																						(ActiveLevel.includes(level3Item.title) && level3Item.children) ?
																							level3Item.children.map((level4Item: any, level4Index: number) => {

																								// // HARDCODE: Pengguna Anggaran
																								// const absolutePath = "/penatausahaan/pengeluaran/dpa"
																								// if (level4Item.link === absolutePath + "/rencana-penerimaan-dana/pendapatan" && Profile.id_role === ROLE_PENGGUNA_ANGGARAN) {
																								// 	level4Item.link = absolutePath + "/rencana-penerimaan-dana/pendapatan/" + Profile.id_role
																								// }

																								// if (level4Item.link === absolutePath + "/rencana-penerimaan-dana/penerimaan-pembiayaan" && Profile.id_role === ROLE_PENGGUNA_ANGGARAN) {
																								// 	level4Item.link = absolutePath + "/rencana-penerimaan-dana/penerimaan-pembiayaan/" + Profile.id_role
																								// }

																								// if (level4Item.link === absolutePath + "/rencana-penarikan-dana/belanja" && Profile.id_role === ROLE_PENGGUNA_ANGGARAN) {
																								// 	level4Item.link = absolutePath + "/rencana-penarikan-dana/belanja/" + Profile.id_role
																								// }

																								// if (level4Item.link === absolutePath + "/rencana-penarikan-dana/pengeluaran-pembiayaan" && Profile.id_role === ROLE_PENGGUNA_ANGGARAN) {
																								// 	level4Item.link = absolutePath + "/rencana-penarikan-dana/pengeluaran-pembiayaan/" + Profile.id_role
																								// }

																								const thisParentPath = [level1Item.title, level2Item.title, level3Item.title]
																								const thisPath = [level1Item.title, level2Item.title, level3Item.title, level4Item.title]
																								return (
																									<>
																										<Collapse key={level4Index} isOpened={true}>
																											<div className="css-cn-a0-2d-_a23">
																												<NavLink onClick={() => ActiveLevel.includes(level4Item.title) ? setActiveLevel(thisParentPath) : setActiveLevel(thisPath)} to={level4Item.link}>
																													<div className={`css-sidebar-menu-level sidebar-menu-level-4 ${ActiveLevel.includes(level4Item.title) && 'bg-sidebar-submenu-active'}`}>

																														{
																															level4Item.hint != null ?
																																<SidebarTooltip
																																	title={<>
																																		<IconLeftSubMenu active={ActiveLevel.includes(level4Item.title)} />
																																		<span className={`css-j-wa-j0f flex-1 text-sm text-slate-400 dark:text-slate-300 capitalize font-semibold ${ActiveLevel.includes(level4Item.title) && 'text-sidebar-submenu-active'}`}>{level4Item.title}</span>
																																		<IconRightSubMenu hasChild={level4Item.children} active={ActiveLevel.includes(level4Item.title)} />
																																	</>}
																																	content={level4Item.hint}
																																	placement="right"
																																	className={`${ActiveLevel.includes(level4Item.title) ? "text-black dark:text-white font-medium" : "main-text-childmenu text-slate-600 dark:text-slate-300"} text-sm flex space-x-3 items-center transition-all duration-150 rtl:space-x-reverse`}
																																	theme="primary"
																																	arrow
																																/> :
																																<span className={`${ActiveLevel.includes(level4Item.title) ? "text-black dark:text-white font-medium" : "main-text-childmenu text-slate-600 dark:text-slate-300"} text-sm flex space-x-3 items-center transition-all duration-150 rtl:space-x-reverse`}>
																																	<IconLeftSubMenu active={ActiveLevel.includes(level4Item.title)} />
																																	<span className={`css-j-wa-j0f flex-1 text-sm text-slate-400 dark:text-slate-300 capitalize font-semibold ${ActiveLevel.includes(level4Item.title) && 'text-sidebar-submenu-active'}`}>{level4Item.title}</span>
																																	<IconRightSubMenu hasChild={level4Item.children} active={ActiveLevel.includes(level4Item.title)} />
																																</span>
																														}

																														{/* <span className={`${ActiveLevel.includes(level4Item.title) ? "text-black dark:text-white font-medium" : "main-text-childmenu text-slate-600 dark:text-slate-300"} text-sm flex space-x-3 items-center transition-all duration-150 rtl:space-x-reverse`}>
																														<IconLeftSubMenu active={ActiveLevel.includes(level4Item.title)} />
																														<span className={`flex-1 text-sm text-slate-800 dark:text-slate-300 capitalize font-semibold ${ActiveLevel.includes(level4Item.title) && 'text-sidebar-submenu-active'}`}>{level4Item.title}</span>
																														<IconRightSubMenu hasChild={level4Item.children} active={ActiveLevel.includes(level4Item.title)} />
																													</span> */}
																													</div>
																												</NavLink>
																											</div>
																										</Collapse>
																										{
																											(ActiveLevel.includes(level4Item.title) && level4Item.children) ?
																												level4Item.children.map((level5Item: any, level5Index: number) => {
																													const thisParentPath = [level1Item.title, level2Item.title, level3Item.title, level4Item.title]
																													const thisPath = [level1Item.title, level2Item.title, level3Item.title, level4Item.title, level5Item.title]
																													return (
																														<Collapse key={level5Index} isOpened={true}>
																															<div className="css-cn-a0-2d-_a24">
																																<NavLink onClick={() => ActiveLevel.includes(level5Item.title) ? setActiveLevel(thisParentPath) : setActiveLevel(thisPath)} to={level5Item.link}>
																																	<div className="css-sidebar-menu-level sidebar-menu-level-5">
																																		<span className={`${ActiveLevel.includes(level5Item.title) ? "text-black dark:text-white font-medium" : "main-text-childmenu text-slate-600 dark:text-slate-300"} text-sm flex space-x-3 items-center transition-all duration-150 rtl:space-x-reverse`}>
																																			<IconLeftSubMenu active={ActiveLevel.includes(level5Item.title)} />
																																			<span className={`css-j-wa-j0f flex-1 text-sm text-slate-400 dark:text-slate-300 capitalize font-semibold ${ActiveLevel.includes(level5Item.title) && 'text-sidebar-submenu-active'}`}>{level5Item.title}</span>
																																			<IconRightSubMenu hasChild={level5Item.children} active={ActiveLevel.includes(level5Item.title)} />
																																		</span>
																																	</div>
																																</NavLink>
																															</div>
																														</Collapse>
																													)
																												}) : null
																										}
																									</>
																								)
																							}) : null
																					}
																				</>
																			)
																		})
																		: null
																}
															</>
														)
													})
												}
											</div>
										</Collapse>
										: null
								}

							</li>
						)
					})
						:
						<SidebarShimmer />
				}
			</ul>
		</>
	);
};

type Props = {
	active: boolean
}
const IconLeftSubMenu = (props: Props) => {
	const { active } = props
	return (
		<>
			{
				active ?

					<svg className="dark:css-n-cafna-fnw1" xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 24 24" fill="#d8d8d8" stroke="#d8d8d8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle></svg> :
					<svg className="dark:css-n-cafna-fnw1" xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" ><line x1="5" y1="12" x2="19" y2="12"></line></svg>
			}
		</>
	)
};

type IconRightSubMenuProps = {
	hasChild: boolean;
	active: boolean;
}
const IconRightSubMenu = (props: IconRightSubMenuProps) => {
	const { hasChild, active } = props
	return (
		<>
			{
				hasChild &&
				(
					active ?
						<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg> :
						<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
				)
			}
		</>
	)
};

export default Navmenu;