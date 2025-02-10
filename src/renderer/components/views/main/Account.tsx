import { cn } from '@/lib/utils';
import React, { useEffect, useRef, useState } from 'react';
import { CopyIcon, EditIcon } from '../../images/Icons';
import { useTheme } from '@/renderer/context/theme-context';
import { useGlobalContext } from '@/renderer/context/global-context';
import { formatBalance } from '@/renderer/lib/utls';

export const Account: React.FC<{ isVisible: boolean }> = ({ isVisible }) => {
	const [fadeIn, setFadeIn] = useState(false);
	const [fadeOut, setFadOut] = useState(false);
	const { theme } = useTheme();
	const { settings } = useGlobalContext();
	// const ref = useRef<HTMLDivElement>(null);

	// useEffect(() => {
	// 	if (isVisible) {
	// 		// setFadeIn(true);
	// 		if (ref.current) ref.current.style.marginLeft = '-100%';
	// 		setTimeout(() => {
	// 			setFadeIn(false);
	// 			if (ref.current) {
	// 				// ref.current.classList.remove('-ml-[100%]');
	// 				// ref.current.classList.add('ml-0');
	// 				ref.current.style.marginLeft = '0';
	// 			}
	// 		}, 100);
	// 	} else {
	// 		setFadOut(true);
	// 		if (ref.current) ref.current.style.marginLeft = '0';
	// 		setTimeout(() => {
	// 			setFadOut(false);
	// 			if (ref.current) {
	// 				ref.current.style.marginLeft = '100%';
	// 				// ref.current.classList.remove('ml-0');
	// 				// ref.current.classList.add('ml-[100%]');
	// 			}
	// 		}, 100);
	// 	}
	// }, [isVisible]);

	return (
		<div
			className={
				cn(
					`transition-transform duration-1000 ease-in-out transform w-full h-full p-10 flex flex-col`,
					!isVisible && 'hidden',
				) /*${isVisible ? 'ml-0' : '-ml-[100%]'}*/
			}
			// ref={ref}
		>
			<p
				className={cn(
					`text-2xl border-b py-2 border-gray-300`,
					theme === 'dark' && 'text-gray-200 border-gray-400',
				)}
			>
				Balance All
			</p>
			<div className="flex mt-3 w-full justify-between pr-[100px]">
				<p className={cn('text-md', theme === 'dark' && 'text-gray-200')}>
					Total balance:
				</p>
				<p
					className={cn(
						'text-md hover:text-orange-500 cursor-pointer',
						theme === 'dark' && 'text-gray-200',
					)}
				>
					{formatBalance(settings.balance)}&nbsp;&nbsp;XMR
				</p>
			</div>
			<div className="flex mb-3 w-full justify-between pr-[100px]">
				<p className={cn('text-md', theme === 'dark' && 'text-gray-200')}>
					Total unblocked balance:
				</p>
				<p
					className={cn(
						'text-md hover:text-orange-500 cursor-pointer',
						theme === 'dark' && 'text-gray-200',
					)}
				>
					{formatBalance(settings.balance)}&nbsp;&nbsp;XMR
				</p>
			</div>
			<div className="flex justify-between items-center py-2">
				<p className={cn('text-2xl', theme === 'dark' && 'text-gray-200')}>
					Accounts
				</p>
				<div className="my-auto bg-orange-500 text-white text-xs px-3 py-2 font-bold rounded cursor-pointer hover:bg-orange-600 transition-colors duration-200">
					Create new account
				</div>
			</div>
			<div
				className={cn(
					'border-l-2 border-l-[#6E513C] flex cursor-pointer px-1 h-13 items-center border-b border-t border-b-gray-300 border-t-gray-300',
					true && (theme === 'dark' ? 'bg-[#262626]' : 'bg-gray-200'),
				)}
			>
				<p className={cn('w-[25px]', theme === 'dark' && 'text-gray-200')}>
					#0
				</p>
				<p className={cn('w-[160px]', theme === 'dark' && 'text-gray-200')}>
					Primary account
				</p>
				<div className="flex w-[165px]">
					<p className={cn(theme === 'dark' && 'text-gray-200')}>4Aq5</p>
					<p
						className={cn(
							'text-xl leading-none px-2 tracking-[0.2rem]',
							theme === 'dark' && 'text-gray-200',
						)}
					>
						..
					</p>
					<p className={cn(theme === 'dark' && 'text-gray-200')}>XYqd</p>
				</div>
				<p className={cn('text-md', theme === 'dark' && 'text-gray-200')}>
					{formatBalance(settings.balance)}&nbsp;&nbsp;XMR
				</p>
				<div className="ml-auto flex gap-1 h-full items-center">
					<div className="w-[25px]">
						<EditIcon className="hover:mt-[0.1rem] hover:ml-[0.03rem]" />
					</div>
					<div className="w-[25px]">
						<CopyIcon className="hover:mt-[0.1rem] hover:ml-[0.03rem]" />
					</div>
				</div>
			</div>
		</div>
	);
};
