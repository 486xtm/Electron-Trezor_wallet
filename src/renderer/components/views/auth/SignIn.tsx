import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loading } from '../../common/Loading';
import { cn } from '@/lib/utils';
import { useTheme } from '@/renderer/context/theme-context';
import { useGlobalContext } from '@/renderer/context/global-context';
import { generateChartData } from '@/renderer/lib/utls';
export const SignIn = () => {
	const [visible, setVisible] = useState(true);
	const [isLoading, setIsLoading] = useState(true);
	const { theme } = useTheme();
	const navigate = useNavigate();
	const { settings, setSettings } = useGlobalContext();
	async function fetchPrices() {
		try {
			// Fetch current prices from CoinGecko
			const ids = settings.coinInfo.map((token) => token.ids).join(',');
			const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`;
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			const prices = await response.json();


			// setSettings({ coinInfo: updatedTokens });
			const newPrice  = settings.coinInfo.reduce((token, val) => {
				token[val.symbol] = prices[val.ids] ? Number(prices[val.ids].usd) : 0;
				return token;
			}, {});
			setSettings({priceInfo: newPrice});
		} catch (error) {
			console.error('Error fetching prices:', error);
		}
	}
	

	useEffect(() => {
		if (!isLoading) return;
		fetchPrices();
		// if(settings.cartInitial === false) {
		// 	setSettings({cartInfo: {
		// 		"ALL": generateChartData(100000),
		// 		"BTC": generateChartData(2),
		// 		"ETH": generateChartData(10),
		// 		"POL": generateChartData(10),
		// 		"SOL": generateChartData(10),
		// 		"ADA": generateChartData(100),
		// 		"BCH": generateChartData(10),
		// 		"XRP": generateChartData(100),
		// 		"DOGE": generateChartData(100),
		// 	}, cartInitial: true});
		// }
		// Simulate loading time
		const timer = setTimeout(() => {
			setIsLoading(false); // Ensure loading state is reset
			navigate('/main/home');
		}, 500);

		// Cleanup timeout on unmount
		return () => clearTimeout(timer);
	}, [isLoading, navigate]);

	return (
		<div className="h-full w-full flex justify-center items-center">
			<div className="flex flex-col gap-2">
				{!isLoading ? (
					<>
						<p className={cn(theme === 'light' ? 'text-black' : 'text-white')}>
							Please enter wallet password for: Administrator
						</p>
						<div className="flex gap-1 w-[400px] border border-gray-200 p-2 rounded items-center">
							<input
								className={cn(
									'outline-none flex-1',
									theme === 'light' ? 'text-black' : 'text-white',
								)}
								style={{ lineHeight: '16px' }}
								type={visible ? 'password' : 'text'}
							/>
							<div onClick={() => setVisible(!visible)}></div>
						</div>
						<div className="flex gap-3 ml-auto">
							<div className="bg-gray-200 text-gray-500 text-sm px-2 py-1 rounded cursor-pointer hover:bg-gray-300 transition-colors duration-200">
								Cancel
							</div>
							<div
								className="bg-orange-500 text-white text-sm px-2 py-1 rounded cursor-pointer hover:bg-orange-600 transition-colors duration-200"
								onClick={() => setIsLoading(true)}
							>
								Ok
							</div>
						</div>
					</>
				) : (
					<Loading />
				)}
			</div>
		</div>
	);
};
