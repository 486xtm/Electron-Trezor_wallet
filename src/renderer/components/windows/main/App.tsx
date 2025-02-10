// todo: menubar ellipsis on overflow
import { Home } from '@/renderer/components/views/Home';
import {
	Navigate,
	Route,
	RouterProvider,
	createHashRouter,
	createRoutesFromElements,
} from 'react-router-dom';

import ErrorPage from '@/renderer/components/views/ErrorPage';
import '@/renderer/styles/globals.scss';

import { SignIn } from '../../views';
import { MainLayout } from '../../layout';

export const App = () => {
	const routes = (
		<Route path="/" errorElement={<ErrorPage />}>
			<Route index element={<Navigate to="/auth/login" />} />
			<Route path="auth" element={<MainLayout />}>
				<Route path="login" element={<SignIn />} />
			</Route>
				<Route path="main/home" element={<MainLayout><Home /></MainLayout>}>
				{/* <Route index element={<Home />} />
				<Route path="home" element={<Home />} /> */}
			</Route>
			<Route path="*" element={<SignIn />} />
		</Route>
	);

	const router = createHashRouter(createRoutesFromElements(routes));

	return (
		<>
			<RouterProvider router={router} />
		</>
	);
};
