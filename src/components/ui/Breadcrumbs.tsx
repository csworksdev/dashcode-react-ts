import { useState, useEffect } from "react";
import { useLocation, NavLink, Link } from "react-router-dom";
import Icon from "@/components/ui/Icon";
import useBreadcumb from "@/hooks/useBreadcumb";
import Button from "./Button";
import { useNavigate } from 'react-router-dom';

const Breadcrumbs = (): JSX.Element => {
	const location = useLocation();
	const locationName = location.pathname.replace("/", "");
	const [Breadcumb] = useBreadcumb();
	const [isHide, setIsHide] = useState<boolean | null>(null);
	const [groupTitle, setGroupTitle] = useState<string>("");
	const [ActivePath, setActivePath] = useState<BreadcumbType[]>([]);
	const navigate = useNavigate();

	useEffect(() => {
		setActivePath(Breadcumb)
		if (ActivePath) {
			setIsHide(false);
		} else if (ActivePath) {
			setIsHide(false);
			setGroupTitle("SIPD");
		}
	}, [location, locationName, Breadcumb]);

	return (
		<>
			{!isHide ? (
				<div className="md:mb-6 mb-4 flex space-x-3 rtl:space-x-reverse css-nc-an-wjf--3a">
					<ul className="breadcrumbs">
						<li className="text-primary-500">
							<NavLink to="/dashboard" className="text-lg">
								<Icon icon="heroicons-outline:home" />
							</NavLink>
							<span className="breadcrumbs-icon rtl:transform rtl:rotate-180">
								<Icon icon="heroicons:chevron-right" />
							</span>
						</li>
						{groupTitle && (
							<li className="text-primary-500">
								<button type="button" className="capitalize">
									{groupTitle}
								</button>
								<span className="breadcrumbs-icon rtl:transform rtl:rotate-180">
									<Icon icon="heroicons:chevron-right" />
								</span>
							</li>
						)}
						{
							Breadcumb != null && Breadcumb.length > 0 ? Breadcumb.map((item: any, index: number) => {
								return (
									<li key={index} className="capitalize text-slate-500 dark:text-slate-400">
										<Link to={item.link}>
											{item.title}
										</Link>
										{
											Breadcumb.length !== (index + 1) &&
											<span className="breadcrumbs-icon rtl:transform rtl:rotate-180">
												<Icon icon="heroicons:chevron-right" />
											</span>
										}
									</li>
								)
							}) : locationName
						}

					</ul>
					<Button onClick={() => navigate(-1)} type="button" className="btn btn-light btn-sm">Kembali</Button>
				</div>
			) : null}
		</>
	);
};

export default Breadcrumbs;