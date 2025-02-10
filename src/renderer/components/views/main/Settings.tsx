import { cn } from '@/lib/utils';
import React, { useState } from 'react';
import { Wallet } from '../settings/Wallet';
import { useTheme } from '@/renderer/context/theme-context';

export const Settings = () => {
	const [tab, setTab] = useState(0);
	const { theme } = useTheme();

	return (
		<div
			className={
				cn(
					`transition-transform duration-1000 ease-in-out transform w-full h-full p-10 flex flex-col`,
					theme === 'dark' ? 'text-gray-200' : 'text-black',
				) /*${isVisible ? 'ml-0' : '-ml-[100%]'}*/
			}
			// ref={ref}
		>
			<div className="flex mx-auto rounded-sm border overflow-hidden border-gray-400">
				<div
					className={cn(
						'px-8 py-[0.3rem] text-sm font-semibold cursor-pointer border-r border-gray-400',
						!tab
							? 'text-gray-100 bg-[#acacac]'
							: theme === 'dark'
								? 'text-gray-100'
								: 'text-gray-600',
					)}
					onClick={() => setTab(0)}
				>
					Wallet
				</div>
				<div
					className={cn(
						'px-8 py-[0.3rem] text-sm font-semibold cursor-pointer border-r border-gray-400',
						tab === 1
							? 'text-gray-100 bg-[#acacac]'
							: theme === 'dark'
								? 'text-gray-100'
								: 'text-gray-600',
					)}
					onClick={() => setTab(1)}
				>
					Interface
				</div>

				<div
					className={cn(
						'px-8 py-[0.3rem] text-sm font-semibold cursor-pointer border-r border-gray-400',
						tab === 2
							? 'text-gray-100 bg-[#acacac]'
							: theme === 'dark'
								? 'text-gray-100'
								: 'text-gray-600',
					)}
					onClick={() => setTab(2)}
				>
					Log
				</div>

				<div
					className={cn(
						'px-8 py-[0.3rem] text-sm font-semibold cursor-pointer',
						tab === 3
							? 'text-gray-100 bg-[#acacac]'
							: theme === 'dark'
								? 'text-gray-100'
								: 'text-gray-600',
					)}
					onClick={() => setTab(3)}
				>
					Info
				</div>
			</div>
			{tab === 0 && <Wallet />}
			{tab === 1 && <Wallet />}
			{tab === 2 && <Wallet />}
			{tab === 3 && <Wallet />}
			{tab === 4 && <Wallet />}
			{tab === 5 && <Wallet />}
		</div>
	);
};
