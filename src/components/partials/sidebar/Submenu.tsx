import React, { useState } from "react";
import { Collapse } from "react-collapse";
import { NavLink } from "react-router-dom";
import Icon from "@/components/ui/Icon";
import Multilevel from "./Multi";

interface SubmenuProps {
	activeSubmenu: number;
	level2Item: any;
	i: number;
	toggleMultiMenu: (index: number) => void;
	activeMultiMenu: number;
}

const Submenu: React.FC<SubmenuProps> = ({ activeSubmenu, level2Item, i, toggleMultiMenu, activeMultiMenu }) => {
	const [ActiveLevel, setActiveLevel] = useState<any>([]);
	return (
		// <Collapse isOpened={activeSubmenu === i}>
		// 	<ul className="sub-menu space-y-4">
		// 		{item.child?.map((level2Item: any, j: number) => (
		// 			<li key={j} className="block pl-4 pr-1 first:pt-4 last:pb-4">
		// 				{
		// 					level2Item.child.map((level2Item: any, level2Index: number) => {
		// 						const thisPath = [level2Item.title, level2Item.title, level2Item.title]
		// 						return (
		// 							<>
		// 								<Collapse key={level2Index} isOpened={true}>
		// 									<div className="sidebar-menu-level-5">
		// 										<NavLink onClick={() => setActiveLevel(thisPath)} to={level2Item.link}>
		// 											<span className={`${ActiveLevel.includes(level2Item.title) ? "text-black dark:text-white font-medium" : "main-text-childmenu text-slate-600 dark:text-slate-300"} text-sm flex space-x-3 items-center transition-all duration-150 rtl:space-x-reverse`}>
		// 												{
		// 													ActiveLevel.includes(level2Item.title) ?
		// 														<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4669FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="13 17 18 12 13 7"></polyline><polyline points="6 17 11 12 6 7"></polyline></svg> :
		// 														<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
		// 												}
		// 												<span className={`flex-1 text-sm text-slate-800 dark:text-slate-300 capitalize font-semibold ${ActiveLevel.includes(level2Item.title) && 'text-sidebar-submenu-active'}`}>{level2Item.title}</span>
		// 											</span>
		// 										</NavLink>
		// 									</div>
		// 								</Collapse>
		// 								{
		// 									(ActiveLevel.includes(level2Item.title) && level2Item.child) ?
		// 									level2Item.child.map((level3Item: any, level3Index: number) => {
		// 										const thisPath = [level3Item.title]
		// 										return (
		// 											<>
		// 												<Collapse key={level3Index} isOpened={true}>
		// 													<div className="sidebar-menu-level-3">
		// 														<NavLink onClick={() => setActiveLevel(thisPath)} to={level3Item.link}>
		// 															<span className={`${ActiveLevel.includes(level3Item.title) ? "text-black dark:text-white font-medium" : "main-text-childmenu text-slate-600 dark:text-slate-300"} text-sm flex space-x-3 items-center transition-all duration-150 rtl:space-x-reverse`}>
		// 																{
		// 																	ActiveLevel.includes(level3Item.title) ?
		// 																		<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4669FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="13 17 18 12 13 7"></polyline><polyline points="6 17 11 12 6 7"></polyline></svg> :
		// 																		<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
		// 																}
		// 																<span className={`flex-1 text-sm text-slate-800 dark:text-slate-300 capitalize font-semibold ${ActiveLevel.includes(level3Item.title) && 'text-sidebar-submenu-active'}`}>{level3Item.title}</span>
		// 															</span>
		// 														</NavLink>
		// 													</div>
		// 												</Collapse>

		// 												{
		// 													(ActiveLevel.includes(level3Item.title) && level3Item.child) ?
		// 														level3Item.child.map((level4Item: any, level4Index: number) => {
		// 															const thisPath = [level3Item.title, level4Item.title]
		// 															return (
		// 																<>
		// 																	<Collapse key={level4Index} isOpened={true}>
		// 																		<div className="sidebar-menu-level-4">
		// 																			<NavLink onClick={() => setActiveLevel(thisPath)} to={level4Item.link}>
		// 																				<span className={`${ActiveLevel.includes(level4Item.title) ? "text-black dark:text-white font-medium" : "main-text-childmenu text-slate-600 dark:text-slate-300"} text-sm flex space-x-3 items-center transition-all duration-150 rtl:space-x-reverse`}>
		// 																					{
		// 																						ActiveLevel.includes(level4Item.title) ?
		// 																							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4669FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="13 17 18 12 13 7"></polyline><polyline points="6 17 11 12 6 7"></polyline></svg> :
		// 																							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
		// 																					}
		// 																					<span className={`flex-1 text-sm text-slate-800 dark:text-slate-300 capitalize font-semibold ${ActiveLevel.includes(level4Item.title) && 'text-sidebar-submenu-active'}`}>{level4Item.title}</span>
		// 																				</span>
		// 																			</NavLink>
		// 																		</div>
		// 																	</Collapse>
		// 																	{
		// 																		(ActiveLevel.includes(level4Item.title) && level4Item.child) ?
		// 																			level4Item.child.map((level5Item: any, level5Index: number) => {
		// 																				const thisPath = [level3Item.title, level4Item.title, level5Item.title]
		// 																				return (
		// 																					<Collapse key={level5Index} isOpened={true}>
		// 																						<div className="sidebar-menu-level-5">
		// 																							<NavLink onClick={() => setActiveLevel(thisPath)} to={level5Item.link}>
		// 																								<span className={`${ActiveLevel.includes(level5Item.title) ? "text-black dark:text-white font-medium" : "main-text-childmenu text-slate-600 dark:text-slate-300"} text-sm flex space-x-3 items-center transition-all duration-150 rtl:space-x-reverse`}>
		// 																									{
		// 																										ActiveLevel.includes(level5Item.title) ?
		// 																											<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4669FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="13 17 18 12 13 7"></polyline><polyline points="6 17 11 12 6 7"></polyline></svg> :
		// 																											<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
		// 																									}
		// 																									<span className={`flex-1 text-sm text-slate-800 dark:text-slate-300 capitalize font-semibold ${ActiveLevel.includes(level5Item.title) && 'text-sidebar-submenu-active'}`}>{level5Item.title}</span>
		// 																								</span>
		// 																							</NavLink>
		// 																						</div>
		// 																					</Collapse>
		// 																				)
		// 																			}) : null
		// 																	}
		// 																</>
		// 															)
		// 														}) : null
		// 												}
		// 											</>
		// 										)
		// 									}) 
		// 										: null
		// 								}
		// 							</>
		// 						)
		// 					})
		// 				}
		// 			</li>
		// 		))}
		// 	</ul>
		// </Collapse>
		<Collapse key={i} isOpened={true}>
			<li className="block pl-4 pr-1 first:pt-4 last:pb-4">
				{
					level2Item.child.map((level2Item: any, level2Index: number) => {
						const thisPath = [level2Item.title, level2Item.title, level2Item.title]
						return (
							<>
								<Collapse key={level2Index} isOpened={true}>
									<div className="sidebar-menu-level-5">
										<NavLink onClick={() => setActiveLevel(thisPath)} to={level2Item.link}>
											<span className={`${ActiveLevel.includes(level2Item.title) ? "text-black dark:text-white font-medium" : "main-text-childmenu text-slate-600 dark:text-slate-300"} text-sm flex space-x-3 items-center transition-all duration-150 rtl:space-x-reverse`}>
												{
													ActiveLevel.includes(level2Item.title) ?
														<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4669FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="13 17 18 12 13 7"></polyline><polyline points="6 17 11 12 6 7"></polyline></svg> :
														<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
												}
												<span className={`flex-1 text-sm text-slate-800 dark:text-slate-300 capitalize font-semibold ${ActiveLevel.includes(level2Item.title) && 'text-sidebar-submenu-active'}`}>{level2Item.title}</span>
											</span>
										</NavLink>
									</div>
								</Collapse>
								{
									(ActiveLevel.includes(level2Item.title) && level2Item.child) ?
										level2Item.child.map((level3Item: any, level3Index: number) => {
											const thisPath = [level3Item.title]
											return (
												<>
													<Collapse key={level3Index} isOpened={true}>
														<div className="sidebar-menu-level-3">
															<NavLink onClick={() => setActiveLevel(thisPath)} to={level3Item.link}>
																<span className={`${ActiveLevel.includes(level3Item.title) ? "text-black dark:text-white font-medium" : "main-text-childmenu text-slate-600 dark:text-slate-300"} text-sm flex space-x-3 items-center transition-all duration-150 rtl:space-x-reverse`}>
																	{
																		ActiveLevel.includes(level3Item.title) ?
																			<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4669FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="13 17 18 12 13 7"></polyline><polyline points="6 17 11 12 6 7"></polyline></svg> :
																			<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
																	}
																	<span className={`flex-1 text-sm text-slate-800 dark:text-slate-300 capitalize font-semibold ${ActiveLevel.includes(level3Item.title) && 'text-sidebar-submenu-active'}`}>{level3Item.title}</span>
																</span>
															</NavLink>
														</div>
													</Collapse>

													{
														(ActiveLevel.includes(level3Item.title) && level3Item.child) ?
															level3Item.child.map((level4Item: any, level4Index: number) => {
																const thisPath = [level3Item.title, level4Item.title]
																return (
																	<>
																		<Collapse key={level4Index} isOpened={true}>
																			<div className="sidebar-menu-level-4">
																				<NavLink onClick={() => setActiveLevel(thisPath)} to={level4Item.link}>
																					<span className={`${ActiveLevel.includes(level4Item.title) ? "text-black dark:text-white font-medium" : "main-text-childmenu text-slate-600 dark:text-slate-300"} text-sm flex space-x-3 items-center transition-all duration-150 rtl:space-x-reverse`}>
																						{
																							ActiveLevel.includes(level4Item.title) ?
																								<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4669FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="13 17 18 12 13 7"></polyline><polyline points="6 17 11 12 6 7"></polyline></svg> :
																								<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
																						}
																						<span className={`flex-1 text-sm text-slate-800 dark:text-slate-300 capitalize font-semibold ${ActiveLevel.includes(level4Item.title) && 'text-sidebar-submenu-active'}`}>{level4Item.title}</span>
																					</span>
																				</NavLink>
																			</div>
																		</Collapse>
																		{
																			(ActiveLevel.includes(level4Item.title) && level4Item.child) ?
																				level4Item.child.map((level5Item: any, level5Index: number) => {
																					const thisPath = [level3Item.title, level4Item.title, level5Item.title]
																					return (
																						<Collapse key={level5Index} isOpened={true}>
																							<div className="sidebar-menu-level-5">
																								<NavLink onClick={() => setActiveLevel(thisPath)} to={level5Item.link}>
																									<span className={`${ActiveLevel.includes(level5Item.title) ? "text-black dark:text-white font-medium" : "main-text-childmenu text-slate-600 dark:text-slate-300"} text-sm flex space-x-3 items-center transition-all duration-150 rtl:space-x-reverse`}>
																										{
																											ActiveLevel.includes(level5Item.title) ?
																												<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4669FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="13 17 18 12 13 7"></polyline><polyline points="6 17 11 12 6 7"></polyline></svg> :
																												<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
																										}
																										<span className={`flex-1 text-sm text-slate-800 dark:text-slate-300 capitalize font-semibold ${ActiveLevel.includes(level5Item.title) && 'text-sidebar-submenu-active'}`}>{level5Item.title}</span>
																									</span>
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
			</li>
		</Collapse>
	);
};

export default Submenu;