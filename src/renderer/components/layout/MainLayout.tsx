import React from 'react';
import { Outlet } from 'react-router-dom';
import {
	CloseIcon,
	MaximizeIcon,
	MinimizeIcon,
	MoonIcon,
} from '../images/Icons';
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
				'w-12 h-full flex justify-center items-center cursor-pointer',
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

	const { settings, setSettings } = useGlobalContext();

	return (
		<>
			<div
				className={cn(
					'h-full w-full flex flex-col justify-stretch',
					theme === 'dark' ? 'bg-[#231E26] text-[#BBBAC1]' : '',
				)}
			>
				<div className={cn('h-8 w-full flex justify-between relative')}>
					<div
						className="flex z-10 text-xs items-center gap-1 pl-2"
						onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
					>
						<img src={`${PROTOCOL}://Trezor/icon/trayLin.png`} className='h-5' alt = "favicon"/>
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
				<div
					className={cn(
						'flex justify-center items-center flex-1',
						theme === 'light' ? 'bg-white' : 'bg-black',
					)}
				>
					{children || <Outlet />}
				</div>
			</div>
		</>
	);
};
