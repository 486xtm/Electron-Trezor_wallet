import { cn } from '@/lib/utils';
import React from 'react';
import {
	ArrowRight,
	ChainIcon,
	ContactIcon,
	DesktopIcon,
	PlusIcon,
} from '../../images/Icons';
import { useTheme } from '@/renderer/context/theme-context';

const Clickable: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
	return (
		<div className="rounded bg-[#dfdfdf] hover:bg-gray-300 p-1 cursor-pointer">
			{children}
		</div>
	);
};

export const Send = () => {
	const { theme } = useTheme();
	return (
		<div
			className={
				cn(
					`transition-transform duration-1000 ease-in-out transform w-full h-full p-10 flex flex-col`,
					theme === 'dark' && 'text-gray-200',
				) /*${isVisible ? 'ml-0' : '-ml-[100%]'}*/
			}
			// ref={ref}
		>
			<div className="flex justify-between">
				<div className="flex gap-2 items-center">
					<p className="text-md">Address</p>
					<Clickable>
						<DesktopIcon />
					</Clickable>
					<Clickable>
						<ContactIcon />
					</Clickable>
				</div>
				<div className="flex items-center gap-2 pr-20">
					<p className="text-md">Amount</p>
					<Clickable>
						<ChainIcon />
					</Clickable>
				</div>
			</div>
			<div className="flex items-center gap-2 mt-2 w-full">
				<div className="border rounded border-gray-400 flex flex-1">
					<input
						className="px-1 border-r border-r-gray-400 p-3 text-sm flex-1"
						placeholder="4 . .  /   8. .  /   monero :  . .  /   OpenAlias"
					/>
					<input className="px-1 w-[150px] p-3 text-sm" placeholder="0.00" />
				</div>
				<span className="text-sm">XMR</span>
			</div>
			<div className="mt-2 flex gap-3">
				<PlusIcon />
				<span className="text-sm">Add Receipient</span>
			</div>
			<div className="mt-7 flex gap-3">
				<PlusIcon />
				<span className="text-sm">Add Description</span>
			</div>
			<div
				className={cn(
					'mr-auto flex gap-2 mt-7 text-white text-sm px-3 py-2 font-bold rounded cursor-pointer transition-colors duration-200',
					'bg-orange-500 ',
					false && 'hover:bg-orange-600',
					true && 'opacity-50',
				)}
			>
				<span>Send</span>
				<ArrowRight />
			</div>
		</div>
	);
};
