import { Toaster } from '@/components/ui/sonner';
import { GlobalContextProvider } from '@/renderer/context/global-context';
import { ThemeProvider } from '@/renderer/context/theme-context';

import React from 'react';
import { MainLayout } from './MainLayout';

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<React.StrictMode>
			<GlobalContextProvider>
				<ThemeProvider>
					<MainLayout>{children}</MainLayout>
					<Toaster />
				</ThemeProvider>
			</GlobalContextProvider>
		</React.StrictMode>
	);
}
