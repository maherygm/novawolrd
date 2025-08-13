import { lazyRetry } from '@/core/utils/componentLoader';
import React, { FC, lazy} from 'react';
import { Route, Routes } from 'react-router-dom';

// Importation du page
const AuthLayout = lazy(() => import('@/presentation/pages/auth'));

// Importation des panels avec un wrapper
const AuthSignIn = lazy(() =>
	lazyRetry(
		() => import('@/presentation/pages/auth/containers/signIn'),
		'signIn',
	),
);

// Importation des pages de redirection
const AuthSignUp = lazy(() =>
	lazyRetry(
		() => import('@/presentation/pages/auth/containers/signUp'),
		'signup',
	),
);

// Importation des pages de redirection
const AuthNotFound = lazy(() =>
	lazyRetry(
		() => import('@/presentation/pages/redirect/notFound/notFound'),
		'notfound',
	),
);

/**
 *
 * @desc: Configuration des routes pour le dashboard
 */
const AuthRoutes: FC = () => {

	return (
		<Routes>
			<Route path="" element={<AuthLayout />}>
					<Route index element={<AuthSignIn />} />
					<Route path="signup" element={<AuthSignUp />} />
			</Route>

			{/* Page de redirection */}
			<Route path="*" element={<AuthNotFound />} />
		</Routes>
	);
};

export default AuthRoutes;
