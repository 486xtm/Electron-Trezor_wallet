import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { useGlobalContext } from '@/renderer/context/global-context';

type Theme = 'dark' | 'light' | 'system';

type ThemeProviderProps = {
	children: React.ReactNode;
};

type ThemeProviderState = {
	theme: Theme;
	setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
	theme: 'light',
	setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
	const { settings } = useGlobalContext();

	const value = useMemo(() => {
		return {
			theme: settings.theme,
			setTheme: (newTheme: Theme) => {
				window.electron.setSettings({
					theme: newTheme,
				});
			},
		};
	}, [settings]);

	return (
		<ThemeProviderContext.Provider {...props} value={value}>
			{children}
		</ThemeProviderContext.Provider>
	);
}

export const useTheme = () => {
	const context = useContext(ThemeProviderContext);

	if (context === undefined)
		throw new Error('useTheme must be used within a ThemeProvider');

	return context;
};
