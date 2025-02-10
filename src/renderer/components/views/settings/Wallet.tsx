import { cn } from '@/lib/utils';
import React from 'react';
import {
	EyeIcon,
	KeyIcon,
	LockIcon,
	LogOutIcon,
	Maginifier,
	Password,
	Printer,
} from '../../images/Icons';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/renderer/context/theme-context';

export const Wallet = () => {
	const navigate = useNavigate();
	const { theme } = useTheme();

	return (
		<div className="flex flex-col w-full mt-7">
			<div
				className={cn(
					'border-gray-300 border-y py-4 flex items-center w-full cursor-pointer',
					theme === 'light' ? 'hover:bg-gray-200' : 'hover:bg-[#262626]',
				)}
			>
				<div className={cn('flex justify-center', 'w-[60px]')}>
					<LockIcon
						bg={theme === 'dark' ? 'system' : 'black'}
						className="w-[30px] h-[30px]"
					/>
				</div>
				<div className="flex flex-col flex-1">
					<p className="text-sm font-semibold">{'Lock this wallet'}</p>
					<p className="text-sm">{'Locks the wallet on demand.'}</p>
				</div>
			</div>
			<div
				className={cn(
					'border-gray-300 border-b py-4 flex items-center w-full cursor-pointer',
					theme === 'light' ? 'hover:bg-gray-200' : 'hover:bg-[#262626]',
				)}
				onClick={() => {
					navigate('/auth/login');
				}}
			>
				<div className={cn('flex justify-center', 'pl-3')}>
					<LogOutIcon
						bg={theme === 'light' ? 'black' : 'system'}
						className="w-[48px] h-[48px]"
					/>
				</div>
				<div className="flex flex-col flex-1">
					<p className="text-sm font-semibold">{'Close this wallet'}</p>
					<p className="text-sm">{'Logs out of this wallet.'}</p>
				</div>
			</div>
			<div
				className={cn(
					'border-gray-300 border-b py-4 flex items-center w-full cursor-pointer',
					theme === 'light' ? 'hover:bg-gray-200' : 'hover:bg-[#262626]',
				)}
			>
				<div className={cn('flex justify-center', 'w-[60px]')}>
					<EyeIcon
						className="w-[35px] h-[35px]"
						on
						bg={theme === 'dark' ? 'system' : 'black'}
					/>
				</div>
				<div className="flex flex-col flex-1">
					<p className="text-sm font-semibold">{'Create a view-only wallet'}</p>
					<p className="text-sm">
						{
							'Creates a new wallet that can only view and initiate transactions, but requires a spendable wallet to sign transactions before sending.'
						}
					</p>
				</div>
			</div>
			<div
				className={cn(
					'border-gray-300 border-b py-4 flex items-center w-full cursor-pointer',
					theme === 'light' ? 'hover:bg-gray-200' : 'hover:bg-[#262626]',
				)}
			>
				<div className={cn('flex justify-center', 'w-[60px]')}>
					<KeyIcon
						className="w-[30px] h-[30px]"
						bg={theme === 'dark' ? 'system' : 'black'}
					/>
				</div>
				<div className="flex flex-col flex-1">
					<p className="text-sm font-semibold">{'Show seed & keys'}</p>
					<p className="text-sm">
						{
							'Store this information safely to recover your wallet in the future.'
						}
					</p>
				</div>
			</div>
			<div
				className={cn(
					'border-gray-300 border-b py-4 flex items-center w-full cursor-pointer',
					theme === 'light' ? 'hover:bg-gray-200' : 'hover:bg-[#262626]',
				)}
			>
				<div className={cn('flex justify-center', 'w-[60px]')}>
					<Maginifier
						className="w-[30px] h-[30px]"
						bg={theme === 'dark' ? 'system' : 'black'}
					/>
				</div>
				<div className="flex flex-col flex-1">
					<p className="text-sm font-semibold">{'Scan transaction'}</p>
					<p className="text-sm">
						{
							'Use this feature if a transaction is missing in your wallet history. This will expose the transaction ID to the remote node, which can harm your privacy.'
						}
					</p>
				</div>
			</div>
			<div
				className={cn(
					'border-gray-300 border-b py-4 flex items-center w-full cursor-pointer',
					theme === 'light' ? 'hover:bg-gray-200' : 'hover:bg-[#262626]',
				)}
			>
				<div className={cn('flex justify-center', 'w-[60px]')}>
					<Password
						className="w-[30px] h-[30px]"
						bg={theme === 'dark' ? 'system' : 'black'}
					/>
				</div>
				<div className="flex flex-col flex-1">
					<p className="text-sm font-semibold">{'Change wallet password'}</p>
					<p className="text-sm">{'Change the password of your wallet.'}</p>
				</div>
			</div>
			<div
				className={cn(
					'border-gray-300 border-b py-4 flex items-center w-full cursor-pointer',
					theme === 'light' ? 'hover:bg-gray-200' : 'hover:bg-[#262626]',
				)}
			>
				<div className={cn('flex justify-center', 'w-[60px]')}>
					<Printer
						className="w-[30px] h-[30px]"
						bg={theme === 'dark' ? 'system' : 'black'}
					/>
				</div>
				<div className="flex flex-col flex-1">
					<p className="text-sm font-semibold">{'Enter merchant mode'}</p>
					<p className="text-sm">
						{'Receive Monero for your business, easily.'}
					</p>
				</div>
			</div>
		</div>
	);
};
