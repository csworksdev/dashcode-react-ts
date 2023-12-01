import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Loading from "@/components/Loading";

const AuthLayout: React.FC = () => {
	return (
		<>
			<Suspense fallback={<Loading />}>
				{<Outlet />}
			</Suspense>
		</>
	);
};

export default AuthLayout;