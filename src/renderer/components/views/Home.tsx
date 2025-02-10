import React, { useEffect, useState } from 'react';
import { PROTOCOL } from '@/config/config';
import { useTheme } from '@/renderer/context/theme-context';
import { cn } from '@/lib/utils';
import { useGlobalContext } from '@/renderer/context/global-context';


export const Home = () => {

	const { theme, setTheme } = useTheme();
	const { settings, setSettings } = useGlobalContext();

	// const handleChangeTokenType = async () => {
	// 	if (tokenType == 'XMR') {
	// 		try {
	// 			const res = await fetch(
	// 				`https://api.coingecko.com/api/v3/simple/price?ids=monero&vs_currencies=usd`,
	// 			);
	// 			const data = await res.json();
	// 			setPrice(data.monero.usd);
	// 			setTokenType('USD');
	// 		} catch {
	// 			setPrice(1);
	// 			setTokenType('XMR');
	// 		}
	// 	} else {
	// 		setTokenType('XMR');
	// 		setPrice(1);
	// 	}
	// };

	return (
		<>
			Dashboard
		</>
	);
};