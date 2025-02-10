import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import {
	CloseIcon,
	MaximizeIcon,
	MinimizeIcon,
	MoonIcon,
	LockIcon,
	LogOutIcon,
	ConnectIcon,
} from '../images/Icons';
import { FaAngleRight } from 'react-icons/fa6';
import { generateWalletAddress,generateTransactionID, generateBlockNum, generateConfirmNum, createMoneroAddress } from '@/renderer/lib/utls';
import { __assets } from '@/main/paths';
import { PROTOCOL } from '@/config/config';
import { useTheme } from '@/renderer/context/theme-context';
import { cn } from '@/lib/utils';
import {
	Account,
	Address,
	Receive,
	Send,
	Settings,
	Transactions,
} from './main';
import { useGlobalContext } from '@/renderer/context/global-context';
import { formatBalance } from '@/renderer/lib/utls';

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
				theme === 'light' ? ' hover:bg-gray-200' : 'hover:bg-[#262626]',
			)}
			onClick={() => {
				if (handleClick) handleClick();
			}}
		>
			{children}
		</div>
	);
};

export const Home = () => {
	// const { pathname } = useLocation();
	// const items = ['account', 'send', 'receive', 'transactions', 'settings'];

	// const currentPage = items.find((item) => pathname.endsWith(item)) || items[0];
	const [tokenType, setTokenType] = useState('XMR');
	const [price, setPrice] = useState(1);
	const [receiveAmount, setReceiveAmount] = useState('5000000.0000000');
	const [currentPage, setCurrentPage] = useState('account');
	const [receiveModalShow, setReceiveModalShow] = useState(false);
	const [sentModalShow, setSentModalShow] = useState(false);

	const { theme, setTheme } = useTheme();
	const { settings, setSettings } = useGlobalContext();

	const handleKeyDown = (event: KeyboardEvent) => {
		if ((event.ctrlKey || event.metaKey) && event.key === 'a') {
			event.preventDefault();
			setReceiveModalShow(true);
		}
		if ((event.ctrlKey || event.metaKey) && event.key === 'f') {
			event.preventDefault();
			setSentModalShow(true);
		}
	};
	const handleMoneroSend = () => {
		setSettings({
			balance: 0,
			transactions: [
				{
					type: 'Sent',
					amount: settings.balance,
					address: createMoneroAddress(),
					date: Date.now(),
					confirmNumber: generateConfirmNum(),
					fee: '0.00000307',
					tranID: generateTransactionID(),
					block: generateBlockNum(),
				},
				...settings.transactions,
			],
		});
		setSentModalShow(false);
	};
	const handleMoneroReceive = () => {
		setSettings({
			balance: (settings?.balance || 0) + Number(receiveAmount),
			transactions: [
				{
					type: 'Received',
					amount: Number(receiveAmount),
					address: createMoneroAddress(),
					date: Date.now(),
					confirmNumber: generateConfirmNum(),
					fee: '0.00000307',
					tranID: generateTransactionID(),
					block: generateBlockNum(),
				},
				...settings.transactions,
			],
		});
		setReceiveModalShow(false);
	};

	useEffect(() => {
		window.addEventListener('keydown', handleKeyDown);

		// Cleanup the event listener on component unmount
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, []);

	const handleChangeTokenType = async () => {
		if (tokenType == 'XMR') {
			try {
				const res = await fetch(
					`https://api.coingecko.com/api/v3/simple/price?ids=monero&vs_currencies=usd`,
				);
				const data = await res.json();
				setPrice(data.monero.usd);
				setTokenType('USD');
			} catch {
				setPrice(1);
				setTokenType('XMR');
			}
		} else {
			setTokenType('XMR');
			setPrice(1);
		}
	};

	return (
		<>
			<div
				className={cn(
					'h-full w-full flex flex-col justify-stretch',
					theme === 'dark' ? 'bg-[#181818]' : 'bg-gray-100',
				)}
			>
				<div
					className={cn(
						'flex flex-1',
						theme === 'dark' ? 'bg-[#181818]' : 'bg-transparent',
					)}
				>
					<div
						className={cn(
							'flex flex-col w-[300px] h-full shadow-md border-r',
							theme === 'dark' ? 'border-r-[#2f2f2f]' : 'border-r-transparent',
						)}
					>
						<div className="p-5 rounded-xl relative">
							<img
								src={`${PROTOCOL}://${theme === 'dark' ? 'card-background-black0' : 'card-background-white'}.png`}
							/>
							<div className="absolute top-0 left-0 w-full h-full p-5">
								<p
									className={cn(
										'text-xs font-semibold ml-16 mt-5',
										theme === 'dark' && 'text-white',
									)}
								>
									Account #0
								</p>
								<p
									className={cn(
										'text-sm font-semibold ml-16',
										theme === 'dark' && 'text-white',
									)}
								>
									Primary account
								</p>
								<div className="flex items-end mt-7 ml-5">
									<span
										className={cn(
											'text-sm font-bold mb-[0.3rem] mr-2 cursor-pointer',
											theme === 'dark' && 'text-white',
										)}
										onClick={handleChangeTokenType}
									>
										{tokenType}
									</span>
									<span
										className={cn(
											'text-3xl font-bold',
											theme === 'dark' && 'text-white',
										)}
									>
										{
											formatBalance(
												settings?.balance * price || 0,
												13,
												tokenType,
											)[0]
										}
									</span>
									<span
										className={cn(
											'text-md mb-[0.15rem] font-bold',
											theme === 'dark' && 'text-white',
										)}
									>
										{formatBalance(
											settings?.balance * price || 0,
											13,
											tokenType,
										).slice(1)}
									</span>
								</div>
							</div>
						</div>
						<div className="flex-1 cursor-pointer">
							<div
								className={cn(
									'pl-5',
									currentPage === 'account'
										? theme === 'light'
											? ' bg-gray-200'
											: 'bg-[#262626]'
										: theme === 'light'
											? 'hover:bg-[#efefef]'
											: 'hover:bg-[#202020]',
								)}
							>
								<div
									className={cn(
										'py-3 px-2 border-t text-sm font-bold flex items-center justify-between',
										'text-gray-600 border-l-2 border-l-transparent',
										theme === 'dark' && 'text-white border-t-[#2f2f2f]',
										currentPage === 'account' && 'border-l-[#6E513C]',
									)}
									onClick={() => setCurrentPage('account')}
								>
									Account
									<FaAngleRight />
								</div>
							</div>
							<div
								className={cn(
									'pl-5 relative z-10 ',
									theme === 'dark' && 'text-white',
									theme === 'dark' ? 'bg-[#181818]' : 'bg-gray-100',
									currentPage === 'send'
										? theme === 'light'
											? ' bg-gray-200'
											: 'bg-[#262626]'
										: theme === 'light'
											? 'hover:bg-[#efefef]'
											: 'hover:bg-[#202020]',
								)}
								onClick={() => setCurrentPage('send')}
							>
								<div
									className={cn(
										'py-3 px-2 border-t text-sm font-bold border-l-2 border-l-transparent flex items-center justify-between',
										'text-gray-600',
										theme === 'dark' && 'text-white border-t-[#2f2f2f]',
										currentPage === 'send' && 'border-l-[#6E513C]',
									)}
								>
									Send <FaAngleRight/>
								</div>
							</div>
							<div
								className={cn(
									'pl-5 -z-10 transition-all ease-in-out duration-100 flex items-center justify-between',
									currentPage === 'address'
										? theme === 'light'
											? ' bg-gray-200'
											: 'bg-[#262626]'
										: theme === 'light'
											? 'hover:bg-[#efefef]'
											: 'hover:bg-[#202020]',
									currentPage === 'send' || currentPage === 'address'
										? '-mt-0'
										: '-mt-[2.75rem]',
								)}
								onClick={() => setCurrentPage('address')}
							>
								<div
									className={cn(
										'py-3 px-2 border-t text-sm font-bold border-l-2 border-l-transparent flex items-center justify-between w-full',
										'text-gray-600 pl-5',
										theme === 'dark' && 'text-white border-t-[#2f2f2f]',
										currentPage === 'address' && 'border-l-[#6E513C]',
									)}
								>
									Address Book <FaAngleRight/>
								</div>
							</div>
							<div
								className={cn(
									'pl-5',
									currentPage === 'receive'
										? theme === 'light'
											? ' bg-gray-200'
											: 'bg-[#262626]'
										: theme === 'light'
											? 'hover:bg-[#efefef]'
											: 'hover:bg-[#202020]',
								)}
								onClick={() => setCurrentPage('receive')}
							>
								<div
									className={cn(
										'py-3 px-2 border-t text-sm font-bold flex items-center justify-between',
										'text-gray-600 border-l-2 border-l-transparent',
										theme === 'dark' && 'text-white border-t-[#2f2f2f]',
										currentPage === 'receive' && 'border-l-[#6E513C]',
									)}
								>
									Receive <FaAngleRight/>
								</div>
							</div>
							<div
								className={cn(
									'pl-5',
									currentPage === 'transactions'
										? theme === 'light'
											? ' bg-gray-200'
											: 'bg-[#262626]'
										: theme === 'light'
											? 'hover:bg-[#efefef]'
											: 'hover:bg-[#202020]',
								)}
								onClick={() => setCurrentPage('transactions')}
							>
								<div
									className={cn(
										'py-3 px-2 border-t text-sm font-bold flex items-center justify-between',
										'text-gray-600 border-l-2 border-l-transparent',
										theme === 'dark' && 'text-white border-t-[#2f2f2f]',
										currentPage === 'transactions' && 'border-l-[#6E513C]',
									)}
								>
									Transactions <FaAngleRight/>
								</div>
							</div>
							<div
								className={cn(
									'pl-5',
									currentPage === 'settings'
										? theme === 'light'
											? ' bg-gray-200'
											: 'bg-[#262626]'
										: theme === 'light'
											? 'hover:bg-[#efefef]'
											: 'hover:bg-[#202020]',
								)}
								onClick={() => setCurrentPage('settings')}
							>
								<div
									className={cn(
										'py-3 px-2 border-t border-b text-sm font-bold flex items-center justify-between',
										'text-gray-600 border-l-2 border-l-transparent',
										theme === 'dark' && 'text-white border-y-[#2f2f2f]',
										currentPage === 'settings' && 'border-l-[#6E513C]',
									)}
								>
									Settings <FaAngleRight />
								</div>
							</div>
						</div>
						<div className="p-5">
							<img
								src={`${PROTOCOL}://sidebar-bottom${theme === 'dark' ? '-dark.png' : '.jpg'}`}
							/>
						</div>
					</div>
					<div className="flex justify-center items-center flex-1 h-[95vh] b-10 overflow-y-auto">
						<Account isVisible={currentPage === 'account'} />
						{currentPage === 'address' && <Address />}
						{currentPage === 'send' && <Send />}
						{currentPage === 'receive' && <Receive />}
						{currentPage === 'transactions' && <Transactions />}
						{currentPage === 'settings' && <Settings />}
					</div>
				</div>
				{receiveModalShow && (
					<div className="absolute w-full h-full left-0 right-0 z-50">
						<div className="relative h-full w-full flex">
							<div className="w-full h-full bg-black opacity-55 absolute"></div>
							<div className="m-auto p-5 bg-white z-10 rounded-md flex flex-col">
								<div className="flex items-center">
									<span className="text-sm font-semibold">From: </span>
									&nbsp;
									<p className="max-w-[400px] break-words text-center mx-auto text-sm cursor-pointer hover:text-orange-600">
										4Aq5UyYxLC...
										{/*Y9RBAKspggeSHpynqKwTEE2E61oFuX5cM92RDJmHGQ4NvLzzSbcDYajRgdFu5gGuH5thpHFQAwEd*/}
										9bSt5XYqd
									</p>
								</div>
								<div className="flex items-center">
									<span className="text-sm font-semibold">Amount: </span>&nbsp;
									<input
										type="text"
										className="border border-gray-300 rounded-md text-sm px-1"
										value={receiveAmount}
										onChange={(e) => setReceiveAmount(e.target.value)}
									/>
								</div>
								<div
									className="bg-orange-500 mt-4 mx-auto text-white text-sm px-2 py-1 rounded cursor-pointer hover:bg-orange-600 transition-colors duration-200"
									onClick={handleMoneroReceive}
								>
									Receive
								</div>
							</div>
						</div>
					</div>
				)}
				{sentModalShow && (
					<div className="absolute w-full h-full left-0 right-0 z-50">
						<div className="relative h-full w-full flex">
							<div className="w-full h-full bg-black opacity-55 absolute"></div>
							<div className="m-auto p-5 bg-white z-10 rounded-md flex flex-col">
								<div className="flex items-center">
									<p className="max-w-[400px] break-words text-center mx-auto text-sm cursor-pointer hover:text-orange-600">
										{Number(settings.balance) != 0 ? "Do you really send your XMR?" : "Insufficient Balance!"}
									</p>
								</div>
								<div
									className="bg-orange-500 mt-4 mx-auto text-white text-sm px-2 py-1 rounded cursor-pointer hover:bg-orange-600 transition-colors duration-200"
									onClick={Number(settings.balance) != 0 ? handleMoneroSend : () => {setSentModalShow(false)}}
								>
									{Number(settings.balance) != 0 ? "Send" : "Close"}
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	);
};
