import React, { FC, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

// Importation des pages
const RedirectionRoutes = lazy(() => import('@/presentation/pages/redirect'));

// Importation des pages
const Loader = lazy(
	() => import('@/presentation/pages/redirect/loader/loaderPage'),
);
const Unauthorized = lazy(
	() =>
		import(
			'@/presentation/pages/redirect/notAuthorized/notAuthorizedPage'
		),
);

const NotFound = lazy(
	() => import('@/presentation/pages/redirect/notFound/notFound'),
);

/**
 *
 * @desc: Configuration des routes pour tester les redirection
 */
const DashboardRoutes: FC = () => {
	return (
		<Routes>
			<Route path="" element={<RedirectionRoutes />}>
				<Route index element={<Loader />} />
				<Route path="loader" element={<Loader />} />
				<Route path="not-authorized" element={<Unauthorized />} />
				<Route path="not-found" element={<NotFound />} />
			</Route>
		</Routes>
	);
};

export default DashboardRoutes;
