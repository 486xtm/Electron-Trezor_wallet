import { CustomAcceleratorsType } from '@/types/keyboard';
import { PROTOCOL } from './config';

export type ThemeType = 'light' | 'dark' | 'system';

export type NotificationType = 'system' | 'app' | 'all';

export interface SettingsType {
	accentColor: string;
	allowAnalytics: boolean;
	allowSounds: boolean;
	allowAutoUpdate: boolean;
	allowNotifications: boolean;
	notificationType: NotificationType;
	showDockIcon: boolean; // macOS only
	showTrayIcon: boolean;
	startMinimized: boolean;
	quitOnWindowClose: boolean;
	transactions: any[];
	theme: ThemeType;
	coinInfo: any[];
	isMaximized: boolean;
	cartInfo: any;
	cartInitial: boolean;
	priceInfo: any;

	// vibrancy: 'none' | 'sidebar' | 'full';
	// hardwareAcceleration: boolean;
	// lastWindowState: {
	// 	x: number;
	// 	y: number;
	// 	width: number;
	// 	height: number;
	// 	isMaximized: boolean;
	// };
}
function generateChartData() {
	const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	let data = [];
	let currentDate = new Date();
	
	for (let i = 5; i >= 0; i--) {
			let date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
			let month = months[date.getMonth()];
			let year = date.getFullYear();
			
			data.push({
					date: `${month} ${year}`,
					received: 0,
					sent: 0,
			});
	}
	
	return data;
}


// These are the default settings, imported by the store
export const DEFAULT_SETTINGS: SettingsType = {
	accentColor: '#b453ff',
	allowAnalytics: true,
	allowAutoUpdate: true,
	allowSounds: true,
	allowNotifications: true,
	notificationType: 'all',
	showDockIcon: true,
	showTrayIcon: true,
	startMinimized: false,
	quitOnWindowClose: false,
	cartInfo: {
		ALL: generateChartData(),
		BTC: generateChartData(),
		ETH: generateChartData(),
		POL: generateChartData(),
		SOL: generateChartData(),
		ADA: generateChartData(),
		BCH: generateChartData(),
		XRP: generateChartData(),
		DOGE: generateChartData(),
	},
	cartInitial: false,
	transactions: [],
	coinInfo: [
		{
			img: `${PROTOCOL}://Trezor/coin/bitcoin.png`,
			name: 'Bitcoin #1',
			amount: 0,
			symbol: 'BTC',
			ids: 'bitcoin',
			price: 0,
		},
		{
			img: `${PROTOCOL}://Trezor/coin/ethereum.png`,
			name: 'Ethereum #1',
			amount: 0,
			symbol: 'ETH',
			ids: 'ethereum',
			price: 0,
		},
		{
			img: `${PROTOCOL}://Trezor/coin/polygon.png`,
			name: 'Polygon PoS #1',
			amount: 0,
			symbol: 'POL',
			ids: 'matic-network',
			price: 0,
		},
		{
			img: `${PROTOCOL}://Trezor/coin/solana.png`,
			name: 'Solana #1',
			amount: 0,
			symbol: 'SOL',
			ids: 'solana',
			price: 0,
		},
		{
			img: `${PROTOCOL}://Trezor/coin/cardano.webp`,
			name: 'Cardano #1',
			amount: 0,
			symbol: 'ADA',
			ids: 'cardano',
			price: 0,
		},
		{
			img: `${PROTOCOL}://Trezor/coin/xrp.png`,
			name: 'XRP #1',
			amount: 0,
			symbol: 'XRP',
			ids: 'ripple',
			price: 0,
		},
		{
			img: `${PROTOCOL}://Trezor/coin/bitcoincash.png`,
			name: 'Bitcoin Cash #1',
			amount: 0,
			symbol: 'BCH',
			ids: 'bitcoin-cash',
			price: 0,
		},
		{
			img: `${PROTOCOL}://Trezor/coin/doge.svg`,
			name: 'Dogecoin #1',
			amount: 0,
			symbol: 'DOGE',
			ids: 'dogecoin',
			price: 0,
		},
	],
	priceInfo: {
		BTC: 0,
		ETH: 0,
		POL: 0,
		SOL: 0,
		ADA: 0,
		XRP: 0,
		BCH: 0,
		DOGE: 0,
	},
	isMaximized: false,
	theme: 'dark',
};

// see src/main/keyboard-shortcuts.ts
// a shortcut must have an action, keybind, and fn
const accelerator = 'Control+Shift+Alt';

export const DEFAULT_KEYBINDS: CustomAcceleratorsType = {
	quit: `${accelerator}+Q`,
	reset: `${accelerator}+R`,
	// reset: '', // empty string or undefined disables a shortcut
};
