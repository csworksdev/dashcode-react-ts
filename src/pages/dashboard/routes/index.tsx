import { Route, Routes } from 'react-router-dom';
import Dashboard from './Dasboard';

export const DashboardRoutes = () => {
	const route: RouteType[] = [
		{
			component: <Dashboard />,
			link: '/',
		},
	]

	return (
		<Routes>
			{
				route.map((item: RouteType, index: number) => {
					return (
						<Route key={index} path={item.link} element={item.component} />
					)
				})
			}
		</Routes>
	);
};
