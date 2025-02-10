import { PROTOCOL } from '@/config/config';
import { cn } from '@/lib/utils';
import React, { useState } from 'react';
import { CopyIcon, SearchIcon } from '../../images/Icons';
import { useTheme } from '@/renderer/context/theme-context';

export const Receive = () => {
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
			<div className="flex mx-auto rounded border border-gray-400">
				<div
					className={cn(
						'px-8 py-[0.3rem] text-sm font-semibold cursor-pointer',
						!tab
							? 'text-gray-100 bg-[#acacac]'
							: theme === 'dark'
								? ''
								: 'text-gray-600',
					)}
					onClick={() => setTab(0)}
				>
					Address
				</div>
				<div
					className={cn(
						'px-8 py-[0.3rem] text-sm font-semibold cursor-pointer',
						tab
							? 'text-gray-100 bg-[#acacac]'
							: theme === 'dark'
								? ''
								: 'text-gray-600',
					)}
					onClick={() => setTab(1)}
				>
					Payment request
				</div>
			</div>
			<img
				src={`${PROTOCOL}://qr.jpg`}
				alt="qr-code"
				className="mx-auto my-3"
			/>
			{tab ? (
				<>
					<span className="mx-auto text-xs w-[300px] break-words font-semibold">
						monero:4Aq5UyYxLCY9RBAKspggeSHpynqKwTEE2E61oFuX5cM92RDJmHGQ4NvLzzSbcDYajRgdFu5gGuH5thpHFQAwEd9bSt5XYqd
					</span>
					<div className="flex flex-col my-4 gap-2 w-[300px] mx-auto">
						<div className="flex items-center">
							<span className="text-sm w-[80px]">Amount</span>
							<div className="rounded border border-gray-300 bg-white p-1">
								<input placeholder="0.000000000" className="text-sm" />
							</div>
							<span className="text-sm ml-2">XMR</span>
						</div>
						<div className="flex items-center justify-start">
							<span className="text-sm w-[80px]">Description</span>
							<div className="rounded border border-gray-300 bg-white p-1">
								<input
									placeholder="Visible to the sender"
									className="text-sm"
								/>
							</div>
						</div>
						<div className="flex items-center justify-start">
							<span className="text-sm w-[80px]">Your name</span>
							<div className="rounded border border-gray-300 bg-white p-1">
								<input
									placeholder="Visible to the sender"
									className="text-sm"
								/>
							</div>
						</div>
					</div>
				</>
			) : (
				<>
					<p className="mx-auto">Address: #0</p>
					<p
						className={cn(
							'mx-auto',
							theme === 'dark' ? 'text-gray-300' : 'text-gray-600',
						)}
					>
						Primary address
					</p>
					<span className="w-[300px] break-words text-center mx-auto text-sm cursor-pointer hover:text-orange-600">
						4Aq5UyYxLCY9RBAKspggeSHpynqKwTEE2E61oFuX5cM92RDJmHGQ4NvLzzSbcDYajRgdFu5gGuH5thpHFQAwEd9bSt5XYqd
					</span>
				</>
			)}
			<div className="flex justify-between items-center mt-5 my-3">
				<p className="text-2xl">Addresses</p>
				<div
					className={cn(
						'ml-auto flex gap-2 text-white text-xs px-3 py-2 font-bold rounded cursor-pointer transition-colors duration-200',
						'bg-orange-500 hover:bg-orange-600',
					)}
				>
					Create new address
				</div>
			</div>
			<div
				className={cn(
					'border-l-2 border-l-[#6E513C] flex cursor-pointer px-1 h-13 items-center border-b border-t border-b-gray-300 border-t-gray-300',
					true && (theme === 'dark' ? 'bg-[#262626]' : 'bg-gray-200'),
				)}
			>
				<p className="w-[25px]">#0</p>
				<p className="w-[280px] my-3">Primary account</p>
				<div className="flex w-[180px]">
					<p className="">4Aq5</p>
					<p className="mx-2">UyYx</p>
					<p className="text-xl leading-none px-2 tracking-[0.2rem]">..</p>
					<p className="mx-2">bSt5</p>
					<p>XYqd</p>
				</div>
				<div className="flex gap-1 h-full items-center ml-auto">
					<div className="w-[26px]">
						<SearchIcon className="hover:mt-[0.1rem] hover:ml-[0.07rem]" />
					</div>
					<div className="w-[26px]">
						<CopyIcon className="hover:mt-[0.1rem] hover:ml-[0.07rem]" />
					</div>
				</div>
			</div>
		</div>
	);
};
