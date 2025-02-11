import React from 'react';
import { Outlet } from 'react-router-dom';
import {
	VscChromeMinimize,
	VscChromeMaximize,
	VscChromeClose,
} from 'react-icons/vsc';
import { __assets } from '@/main/paths';
import { PROTOCOL } from '@/config/config';
import { cn } from '@/lib/utils';
import { useTheme } from '@/renderer/context/theme-context';
import { useGlobalContext } from '@/renderer/context/global-context';

interface MainLayoutProps {
	children?: React.ReactNode;
}

const Clickable = ({
	children,
	theme = 'light',
	handleClick,
}: {
	children: React.ReactNode;
	theme?: string;
	handleClick?: () => void;
}) => {
	return (
		<div
			className={cn(
				'w-12 h-full py-2 flex justify-center items-center cursor-pointer',
				theme === 'light' ? 'hover:bg-gray-200' : 'hover:bg-[#262626]',
			)}
			onClick={() => {
				if (handleClick) handleClick();
			}}
		>
			{children}
		</div>
	);
};

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
	const { theme, setTheme } = useTheme();
	return (
		<>
			<div
				className={cn(
					'h-full w-full flex flex-col',
					theme === 'dark' ? 'bg-[#231E26] text-[gray]' : '',
				)}
			>
				<div
					className={cn(
						'w-full flex justify-between relative',
						theme === 'dark' ? 'text-gray-200' : '',
					)}
				>
					<div
						className="flex z-10 text-xs items-center gap-1 pl-2"
						// onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
					>
						<img
							src={`${PROTOCOL}://Trezor/icon/trayLin.png`}
							className="h-5"
							alt="favicon"
						/>
						Trezor Suite
					</div>

					<div className="flex-1 drag" />
					<div className="flex z-10">
						<Clickable
							theme={theme}
							handleClick={() => window.electron.minimize()}
						>
							<VscChromeMinimize />
						</Clickable>
						<Clickable
							theme={theme}
							handleClick={() => window.electron.maximize()}
						>
							<VscChromeMaximize />
						</Clickable>
						<Clickable
							theme={theme}
							handleClick={() => window.electron.close()}
						>
							<VscChromeClose />
						</Clickable>
					</div>
				</div>
				<div className={cn('flex-1', theme === 'dark' ? 'bg-[#171717]' : '')}>
					{children || <Outlet />}
				</div>
			</div>
		</>
	);
};
