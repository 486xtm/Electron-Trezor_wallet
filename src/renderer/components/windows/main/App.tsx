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
import { SideBar } from '../../layout';
import { Settings } from '../../views/main';
import {CoinInfo} from '../../views/main';
import { Send } from '../../views/main/transaction/send';
import { Receive } from '../../views/main/transaction/receive';
export const App = () => {
	const routes = (
		<Route path="/" errorElement={<ErrorPage />}>
			<Route index element={<Navigate to="login" />} />
				<Route path="login" element={<SignIn />} />
				<Route path="main" element = {<SideBar/>}>
					<Route path="home" element={<Home />}/>
					<Route path="setting" element={<Settings/>}/>
					<Route path="coin/:symbol" element={<CoinInfo />}/>
					<Route path="coin/:symbol/send" element={<Send/>} />
					<Route path="coin/:symbol/receive" element={<Receive/>}>
				</Route>
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
