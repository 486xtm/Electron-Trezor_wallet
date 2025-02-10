import { CustomAcceleratorsType } from '@/types/keyboard';

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
	balance: number;
	address: string;
	isMaximized: boolean,

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
	
	transactions: [],
	balance: 0,
	address: '',
	isMaximized: false,
	theme: 'light',
};

// see src/main/keyboard-shortcuts.ts
// a shortcut must have an action, keybind, and fn
const accelerator = 'Control+Shift+Alt';

export const DEFAULT_KEYBINDS: CustomAcceleratorsType = {
	quit: `${accelerator}+Q`,
	reset: `${accelerator}+R`,
	// reset: '', // empty string or undefined disables a shortcut
};
