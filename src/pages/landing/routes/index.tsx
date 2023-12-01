import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import DasarHukum from './DasarHukum';
import Dokumentasi from './Dokumentasi';
import Faq from './Faq';

export const LandingRoutes = () => {
	return (
		<Routes>
			<Route path="/dokumentasi" element={<Dokumentasi />} />
			<Route path="/dasar-hukum" element={<DasarHukum />} />
			<Route path="/faq" element={<Faq />} />
			<Route path="/" element={<Home />} />
		</Routes>
	);
};
