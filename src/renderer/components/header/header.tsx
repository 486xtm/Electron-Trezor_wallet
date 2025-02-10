import React from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/renderer/context/theme-context';
import { VscArrowSwap } from 'react-icons/vsc';
import { AiOutlineDollarCircle } from 'react-icons/ai';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa6';
import { IoIosMore } from 'react-icons/io';
export const Header = ({ title = 'Dashboard' }: { title: string }) => {
	const { theme } = useTheme();

	return (
		<div className="flex flex-row justify-between py-2 px-4 border-b border-[#212121]">
			<div
				className={cn(
					'text-[30px]',
					theme === 'dark' ? 'text-white' : 'text-black',
				)}
			>
				{title}
			</div>
			<div className="flex flex-row gap-1 text-sm">
				{title != 'Dashboard' && (
					<div className="bg-[#1d1d1d] rounded-full my-1 flex items-center px-4 cursor-pointer">
						<IoIosMore />
					</div>
				)}
				<button className="bg-[#1d1d1d] rounded-full my-1 px-4 flex items-center gap-2 text-gray-200">
					<AiOutlineDollarCircle />
					Buy & sell
				</button>
				<button className="bg-[#1d1d1d] rounded-full my-1 px-4 flex items-center gap-2 text-gray-200">
					<VscArrowSwap />
					Swap
				</button>
				{title != 'Dashboard' && (
					<div className="bg-[#1d1d1d] rounded-full my-1 flex items-center text-gray-200">
						<div className="flex flex-row items-center gap-2 px-4 cursor-pointer">
							<FaArrowUp />
							Send
						</div>
						<div className="flex flex-row items-center gap-2 px-4 cursor-pointer">
							<FaArrowDown />
							Receive
						</div>
					</div>
				)}
			</div>
		</div>
	);
};
