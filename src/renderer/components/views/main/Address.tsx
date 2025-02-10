import { cn } from '@/lib/utils';
import { useTheme } from '@/renderer/context/theme-context';
import React from 'react';

export const Address = () => {
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
			<p className="text-3xl">Save your most used addresses here</p>
			<p
				className={cn(
					'text-md',
					theme === 'dark' ? 'text-gray-400' : 'text-gray-700',
				)}
			>
				This makes it easier to send or receive Monero and reduces errors when
				typing in addresses manually.
			</p>
			<div
				className={cn(
					'mx-auto flex gap-2 mt-7 text-white text-xs px-3 py-2 font-bold rounded cursor-pointer transition-colors duration-200',
					'bg-orange-500 hover:bg-orange-600',
				)}
			>
				Add an address
			</div>
		</div>
	);
};
