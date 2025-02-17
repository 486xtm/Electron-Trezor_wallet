import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Outlet } from 'react-router-dom';
import { useTheme } from '@/renderer/context/theme-context';
import { PROTOCOL } from '@/config/config';
import { IoIosArrowDropdown } from 'react-icons/io';
import { PiLinkBreak, PiBellSimple } from 'react-icons/pi';
import { RiSettings4Line } from 'react-icons/ri';
import { GoHome, GoPlus } from 'react-icons/go';
import { LuSearch } from 'react-icons/lu';
import { FaRegEye } from 'react-icons/fa';
import { TbPlayerEject } from 'react-icons/tb';
import { LuDot } from 'react-icons/lu';
import { FiInfo, FiPlus } from 'react-icons/fi';
import { IoCloseOutline } from 'react-icons/io5';
import Modal from '../modal/modal';
import ActivityModal from '../modal/activity';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '@/renderer/context/global-context';
import ModalSR from '../modal/modal_SR';
import { generateWalletAddress, generateChartData } from '@/renderer/lib/utls';
import { FiRefreshCcw } from 'react-icons/fi';
import { MdInfoOutline } from 'react-icons/md';

interface SideBarProps {
	children?: React.ReactNode;
}
export const SideBar: React.FC<SideBarProps> = ({ children }) => {
	const { settings, setSettings } = useGlobalContext();
	const { theme, setTheme } = useTheme();
	const [showValue, setShowValue] = useState(false);
	const [activityShow, setActivityShow] = useState(false);
	const [tab, setTab] = useState(1);
	const location = useLocation();
	const navigate = useNavigate();
	const [receiveModalShow, setReceiveModalShow] = useState(false);
	const [sentModalShow, setSentModalShow] = useState(false);
	const [initialModalShow, setInitialModalShow] = useState(false);
	const [addTokens, setAddTokens] = useState<any>({});
	const [sendTokens, setSendTokens] = useState<any>({});
	const [isConnected, setIsConnected] = useState(false);
	const [isShowEnabled, setIsShowEnabled] = useState(false);

	const [errors, setErrors] = useState<Record<string, string>>({});
	const [searchCoin, setSearchCoin] = useState('');
	const [isHoverAll, setIsHoverAll] = useState(false);

	const lastReceiveTran =
		settings.transactions.reverse().find((val) => val.type === 'receive') || [];
	console.log('========>', settings.transactions.reverse(), lastReceiveTran);
	const totalBalance = settings.coinInfo.reduce(
		(total, token) => total + token.amount * settings.priceInfo[token.symbol],
		0,
	);

	function formatIsoDate(isoString: string): string {
		const date = new Date(isoString);
		const options: Intl.DateTimeFormatOptions = {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
			hour12: false, // Set to true for 12-hour format
		};

		const formattedDate = date
			.toLocaleString('en-US', options)
			.replace(',', '');
		return formattedDate;
	}

	const handleSendInputChange = (
		ev: React.ChangeEvent<HTMLInputElement>,
		val: any,
	) => {
		let newValue = ev.target.value;

		// Allow only numbers and a single decimal point
		newValue = newValue.replace(/[^0-9.]/g, '');

		// Ensure '.' is not the first character unless it's '0.'
		if (newValue.startsWith('.')) {
			newValue = '0' + newValue;
		}

		// Prevent multiple decimals

		const parts = newValue.split('.');

		if (parts.length > 2) {
			newValue = parts[0] + '.' + parts.slice(1).join('');
		}

		setSendTokens((prev: any) => ({
			...prev,
			[val.symbol]: newValue,
		}));

		setErrors((prev) => ({
			...prev,
			[val.symbol]:
				Number(newValue) > val.amount
					? `Insufficient balance for ${val.symbol}`
					: '',
		}));
	};

	const handleReceiveInputChange = (
		ev: React.ChangeEvent<HTMLInputElement>,
		val: any,
	) => {
		let newValue = ev.target.value;

		// Allow only numbers and a single decimal point
		newValue = newValue.replace(/[^0-9.]/g, '');
		// Ensure '.' is not the first character unless it's '0.'
		if (newValue.startsWith('.')) {
			newValue = '0' + newValue;
		}
		// Prevent multiple decimals
		const parts = newValue.split('.');

		if (parts.length > 2) {
			newValue = parts[0] + '.' + parts.slice(1).join('');
		}

		setAddTokens((prev: any) => ({
			...prev,
			[val.symbol]: newValue,
		}));
	};

	// Disable send button if any error exists
	const isSendDisabled = Object.values(errors).some((error) => error !== '');

	const handleKeyDown = (event: KeyboardEvent) => {
		if ((event.ctrlKey || event.metaKey) && event.key === 'a') {
			event.preventDefault();
			setReceiveModalShow(true);
			setAddTokens({});
		}
		if ((event.ctrlKey || event.metaKey) && event.key === 'f') {
			event.preventDefault();
			setSentModalShow(true);
			setSendTokens({});
		}
		if ((event.ctrlKey || event.metaKey) && event.key === 'x') {
			event.preventDefault();
			setInitialModalShow(true);
		}
		if ((event.ctrlKey || event.metaKey) && event.key === 's') {
			event.preventDefault();
			setIsConnected((prev) => !prev);
		}
	};
	const handleAddTokens = () => {
		const updatedToken = settings.coinInfo.map((token) => {
			if (token.symbol in addTokens) {
				return {
					...token,
					amount: token.amount + Number(addTokens[token.symbol]),
				};
			}
			return token;
		});
		const tran = Object.keys(addTokens).map((key) => {
			return {
				date: new Date().toISOString(),
				amount: addTokens[key],
				symbol: key,
				type: 'receive',
				address: generateWalletAddress(key),
			};
		});
		const newTransactions = [...settings.transactions, ...tran];
		let newCarInfo = { ...settings.cartInfo };
		Object.keys(addTokens).forEach((key) => {
			newCarInfo[key] = (settings.cartInfo[key] || []).map(
				(item: any, index: number) => {
					if (index < 5) return item;
					return {
						...item,
						received: Number(item.received) + Number(addTokens[key]),
					};
				},
			);
		});
		let i = 0;
		newCarInfo['ALL'] = (settings.cartInfo['ALL'] || []).map(
			(item: any, index: number) => {
				if (index < 5) return item;
				return {
					...item,
					received:
						Number(item.received) +
						Object.values(addTokens).reduce(
							(total: number, val: any) =>
								total +
								Number(
									val *
										settings.priceInfo[
											settings.coinInfo.find((token) => {
												if (token.symbol === Object.keys(addTokens)[i]) {
													i++;
													return true;
												}
												return false;
											})?.symbol
										] || 0,
								),
							0,
						),
				};
			},
		);
		setSettings({
			transactions: newTransactions,
			coinInfo: updatedToken,
			cartInfo: newCarInfo,
		});
		setReceiveModalShow(false);
	};

	const handleSendTokens = () => {
		const updatedToken = settings.coinInfo.map((token) => {
			if (token.symbol in sendTokens) {
				return {
					...token,
					amount: token.amount - Number(sendTokens[token.symbol]),
				};
			}
			return token;
		});
		const tran = Object.keys(sendTokens).map((key) => {
			return {
				date: new Date().toISOString(),
				amount: sendTokens[key],
				symbol: key,
				type: 'send',
				address: generateWalletAddress(key),
			};
		});
		let newCarInfo = { ...settings.cartInfo };
		Object.keys(sendTokens).forEach((key) => {
			newCarInfo[key] = (settings.cartInfo[key] || []).map(
				(item: any, index: number) => {
					if (index < 5) return item;
					return {
						...item,
						sent: Number(item.sent) + Number(sendTokens[key]),
					};
				},
			);
		});
		let i = 0;
		newCarInfo['ALL'] = (settings.cartInfo['ALL'] || []).map(
			(item: any, index: number) => {
				if (index < 5) return item;
				return {
					...item,
					sent:
						Number(item.sent) +
						Object.values(sendTokens).reduce(
							(total: number, val: any) =>
								total +
								Number(
									val *
										settings.priceInfo[
											settings.coinInfo.find((token) => {
												if (token.symbol === Object.keys(sendTokens)[i]) {
													i++;
													return true;
												}
												return false;
											})?.symbol
										] || 0,
								),
							0,
						),
				};
			},
		);
		setSettings({
			cartInfo: newCarInfo,
			transactions: [...settings.transactions, ...tran],
			coinInfo: updatedToken,
		});
		setSentModalShow(false);
	};
	const handleInitialTokens = () => {
		const updatedToken = settings.coinInfo.map((token) => {
			return {
				...token,
				amount: 0,
			};
		});
		// let newCarInfo = { ...settings.cartInfo };
		// settings.coinInfo.forEach((val) => {
		// 	newCarInfo[val.symbol] = (settings.cartInfo[val.symbol] || []).map(
		// 		(item: any, index: number) => {
		// 			// if (index < 5) return item;
		// 			return {
		// 				...item,
		// 				sent: 0,
		// 				received: 0,
		// 			};
		// 		},
		// 	);
		// });
		// newCarInfo['ALL'] = (settings.cartInfo['ALL'] || []).map(
		// 	(item: any, index: number) => {
		// 		if (index < 5) return item;
		// 		return {
		// 			...item,
		// 			sent: 0,
		// 			received: 0,
		// 		};
		// 	},
		// );
		setSettings({
			coinInfo: updatedToken,
			transactions: [],
			// cartInfo: newCarInfo,
			cartInfo: {
				ALL: generateChartData(1),
				BTC: generateChartData(1),
				ETH: generateChartData(1),
				POL: generateChartData(1),
				SOL: generateChartData(1),
				ADA: generateChartData(1),
				BCH: generateChartData(1),
				XRP: generateChartData(1),
				DOGE: generateChartData(1),
			},
		});
		setInitialModalShow(false);
	};
	useEffect(() => {
		window.addEventListener('keydown', handleKeyDown);

		// Cleanup the event listener on component unmount
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, []);
	return (
		<div className="flex flex-row">
			<div
				className={cn(
					'w-[300px] px-2 h-screen flex flex-col',
					theme === 'dark' ? 'bg-[#0f0f0f]' : '',
				)}
			>
				<div className="flex flex-row justify-between items-center py-6">
					<div className="flex gap-4">
						<img
							src={`${PROTOCOL}://Trezor/trezor-t3t1.png`}
							className="ml-2 w-[20px] blur-[0.8px]"
							alt="hardware"
						/>
						<div className="flex flex-col gap-1">
							<div
								className={cn(
									'leading-none',
									// theme === 'dark' ? 'text-gray-200' : '',
								)}
							>
								My Trezor
							</div>
							<div
								className={cn(
									'text-xs flex items-center gap-1',
									isConnected ? 'text-green-300' : 'text-gray-200',
								)}
							>
								<PiLinkBreak />
								{isConnected ? 'Connected' : 'Disconnected'}
							</div>
						</div>
					</div>
					<div
						className={cn(
							'text-2xl mr-2 rounded-full p-2 cursor-pointer',
							theme === 'dark' ? 'text-gray-200 hover:bg-[#212121]' : '',
						)}
						onClick={() => setShowValue(true)}
					>
						<IoIosArrowDropdown />
					</div>
				</div>
				<div className={cn('flex flex-col gap-1')}>
					<div
						className={cn(
							'flex flex-row items-center border border-transparent rounded-lg py-2 cursor-pointer',
							theme === 'dark'
								? 'hover:bg-[#161616] hover:border-[#1d1d1d] hover:text-gray-200'
								: '',
							location.pathname === '/main/home'
								? 'bg-[#161616] border-[#1d1d1d] text-gray-200'
								: '',
						)}
						onClick={() => navigate('/main/home')}
					>
						<span className="text-[25px] pl-2 px-4">
							<GoHome />
						</span>
						Dashboard
					</div>
					<div
						className={cn(
							'flex flex-row items-center border border-transparent rounded-lg py-2 cursor-pointer',
							theme === 'dark'
								? 'hover:bg-[#161616] hover:border-[#1d1d1d] hover:text-gray-200'
								: '',
							activityShow === true ? 'bg-[#252525] text-gray-200' : '',
						)}
						onClick={() => setActivityShow(true)}
					>
						<span className="text-[25px] pl-2 px-4">
							<PiBellSimple />
						</span>
						Activity
					</div>
					<div
						className={cn(
							'flex flex-row items-center border border-transparent rounded-lg py-2 cursor-pointer',
							theme === 'dark'
								? 'hover:bg-[#161616] hover:border-[#1d1d1d] hover:text-gray-200'
								: '',
							location.pathname === '/main/setting'
								? 'bg-[#161616] border-[#1d1d1d] text-gray-200'
								: '',
						)}
						onClick={() => navigate('/main/setting')}
					>
						<span className="text-[25px] pl-2 px-4">
							<RiSettings4Line />
						</span>
						Settings
					</div>
				</div>
				<hr className="border-[#212121] my-2 -mx-2" />

				<div className="relative my-3">
					<LuSearch className="absolute left-3 top-[2px] h-5 w-5 " />
					<input
						placeholder="Search"
						className="pl-12 w-full bg-transparen placeholder:text-[gray] placeholder:text-sm"
					/>
					<div className="absolute right-1 top-0 bg-[#252525] p-2 rounded-full">
						<GoPlus className="h-4 w-4" />
					</div>
				</div>
				<div className="w-full flex flex-row justify-center mb-5">
					<div className="flex flex-row gap-1">
						{settings.coinInfo.map((val, index) => (
							<img
								src={val.img}
								className={cn(
									'w-[15px] rounded-full cursor-pointer hover:filter-none',
									searchCoin === val.symbol || isHoverAll
										? `filter-none ${isHoverAll ? '' : 'border'} border-green-400`
										: 'grayscale',
								)}
								key={`search_coin_${index}`}
								onMouseEnter={() => setIsHoverAll(true)}
								onMouseLeave={() => setIsHoverAll(false)}
								onClick={() =>
									setSearchCoin((prev) => {
										if (prev == val.symbol) return '';
										return val.symbol;
									})
								}
							/>
						))}
					</div>
				</div>
				<div className="text-xs my-4 ml-[50px]">Default accounts</div>
				<div
					className={cn(
						'text-sm flex-1 overflow-y-scroll pb-3 flex flex-col gap-1',
					)}
					style={{
						WebkitMaskImage:
							'linear-gradient(to bottom, black 90%, transparent)',
					}}
				>
					<div
						className={cn(
							'flex flex-col gap-1',
							searchCoin === '' ? '' : 'border-b border-[#212121] pb-5',
						)}
					>
						{settings.coinInfo
							.filter((val) => {
								if (searchCoin === '') return true;
								return val.symbol === searchCoin;
							})
							.map((val, index) => (
								<div
									className={cn(
										'flex flex-row justify-between pr-2 py-2 rounded-lg cursor-pointer',
										theme === 'dark' ? 'hover:bg-[#1d1d1d]' : '',
										location.pathname === `/main/coin/${val.symbol}`
											? 'bg-[#1d1d1d]'
											: '',
									)}
									onClick={() => navigate(`/main/coin/${val.symbol}`)}
									key={`coin_${index}`}
								>
									<div className="flex flex-row items-center gap-4 ">
										<img
											src={val.img}
											alt="bitcoin"
											className="rounded-full w-[25px] h-[25px] ml-2"
										/>
										<div>
											<span
												className={cn(
													'',
													theme === 'dark' ? 'text-gray-200' : '',
												)}
											>
												{val.name}
											</span>
											<br />
											<span>
												{val.amount} {val.symbol}
											</span>
										</div>
									</div>
									$
									{(
										settings.priceInfo[val.symbol] * val.amount
									).toLocaleString()}
								</div>
							))}
					</div>
					{searchCoin !== '' && (
						<div className="flex flex-col">
							<div className="text-center pt-5">
								Don't see an account after activating a coin?
							</div>
							<div
								className="flex flex-row mx-auto mt-3 px-3 py-1 items-center text-xs cursor-pointer text-gray-200 gap-2 rounded-full bg-[#171717] "
								onClick={() => setSearchCoin('')}
							>
								<FiRefreshCcw />
								Refresh
							</div>
						</div>
					)}
				</div>
				<div
					className={cn(
						'h-[75px] border-t -mx-2 flex flex-row',
						theme === 'dark' ? 'border-[#212121]' : '',
					)}
				>
					<div className="w-1/2 flex flex-row justify-center mt-1">
						<img
							src={`${PROTOCOL}://Trezor/icon/lock.png`}
							className="h-[35px]"
						/>
					</div>
					<div className="w-1/2 flex flex-row justify-center mt-[15px] cursor-pointer">
						<FaRegEye className="w-[15px] h-[15px] scale-x-[-1]" />
					</div>
				</div>
			</div>

			<div className="flex-1">{children || <Outlet />}</div>
			<Modal isOpen={showValue} onClose={() => setShowValue(false)}>
				<div className="flex flex-row justify-between items-center p-3 border-b border-[#212121]">
					<div className="flex gap-4">
						<img
							src={`${PROTOCOL}://Trezor/trezor-t3t1.png`}
							className="w-[20px] blur-[0.8px]"
							alt="hardware"
						/>
						<div className="flex flex-col gap-1">
							<div
								className={cn(
									'leading-none',
									theme === 'dark' ? 'text-gray-200' : '',
								)}
							>
								My Trezor
							</div>
							<div
								className={cn(
									'text-xs flex items-center gap-1',
									isConnected ? 'text-green-300' : 'text-gray-200',
								)}
							>
								<PiLinkBreak />
								{isConnected ? 'Connected' : 'Disconnected'}
							</div>
						</div>
					</div>
					<div
						className={cn(
							'text-2xl  rounded-full p-2 cursor-pointer transition-transform duration-300',
							theme === 'dark' ? 'text-gray-200 hover:bg-[#212121]' : '',
							showValue === true ? 'rotate-180' : '',
						)}
						onClick={() => setShowValue(false)}
					>
						<IoIosArrowDropdown />
					</div>
				</div>
				<div className="m-3 border rounded-xl overflow-hidden border-[#212121]">
					<div className="border-l-4 pt-5 px-2 border-[#2dbb7f]">
						<div className="flex flex-row justify-between">
							<span className="text-gray-200 font-bold">Standard wallet</span>
							<span className="text-2xl">
								<TbPlayerEject />
							</span>
						</div>
						<div className="mb-1">
							<span className="text-gray-200 text-[37px]">
								${Math.floor(totalBalance).toLocaleString()}
							</span>
							<span>.{(totalBalance % 1).toFixed(2).split('.')[1]}</span>
						</div>
						<hr className="-mx-2 border-[#212121]" />
						<div className="flex flex-row justify-between p-3 items-center">
							<div className="flex items-center -ml-4 text-[#2dbb7f]">
								<LuDot className="text-[30px]" />
								<span className="text-sm font-bold">View-only enabled</span>
							</div>
							<div
								className={cn(
									'rounded-full cursor-pointer transition-transform duration-300',
									theme === 'dark' ? 'text-gray-200 hover:bg-[#212121]' : '',
									isShowEnabled === true ? 'rotate-180' : '',
								)}
								onClick={() => setIsShowEnabled(!isShowEnabled)}
							>
								<IoIosArrowDropdown />
							</div>
						</div>
						{isShowEnabled && (
							<div className="flex flex-col gap-1">
								<div
									className={cn(
										'flex flex-row gap-2 items-center border p-3 rounded-xl',
										isConnected ? 'border-green-300' : 'border-[#212121]',
									)}
								>
									<div className="flex flex-col gap-1">
										<div className="text-white">Enabled</div>
										<div className="text-xs">
											Balances & transactions remain visible in app after Trezor
											is disconnected
										</div>
									</div>

									<div
										className={cn(
											'rounded-full border cursor-pointer',
											isConnected
												? 'border-green-300 p-1'
												: 'border-[white] pl-5 pt-5',
										)}
										onClick={() => setIsConnected(true)}
									>
										<div
											className={cn(
												'rounded-full ',
												isConnected ? 'bg-green-300 w-3 h-3' : '',
											)}
										></div>
									</div>
								</div>

								<div
									className={cn(
										'flex flex-row gap-2 items-center border p-3 rounded-xl',
										!isConnected ? 'border-green-300' : 'border-[#212121]',
									)}
								>
									<div className="flex flex-col gap-1">
										<div className="text-white">Disabled</div>
										<div className="text-xs">
											Balances & transactions aren't visible in the app after
											Tezor is disconnected
										</div>
									</div>
									<div
										className={cn(
											' rounded-full border cursor-pointer',
											!isConnected
												? 'border-green-300 p-1'
												: 'border-[white] pl-5 pt-5',
										)}
										onClick={() => setIsConnected(false)}
									>
										<div
											className={cn(
												'rounded-full ',
												!isConnected ? 'bg-green-300 w-3 h-3' : '',
											)}
										></div>
									</div>
								</div>

								<div className="flex flex-row text-xs text-center py-3 justify-center items-center gap-1">
									<MdInfoOutline />
									You must always connect your Trezor to move coins
								</div>
							</div>
						)}
					</div>
				</div>
				<div
					className={cn(
						'bg-[#252525] mx-3 text-center py-3 flex flex-row justify-center items-center gap-2 rounded-full',
						isConnected ? 'text-white' : '',
					)}
				>
					<GoPlus className="w-[25px] h-[25px]" /> Passphrase wallet{' '}
					{isConnected && (
						<span className="text-gray-200 bg-black px-1 rounded-full text-xs">
							ALT + P
						</span>
					)}
				</div>
				<div className="pb-3"></div>
			</Modal>

			<ActivityModal
				isOpen={activityShow}
				onClose={() => setActivityShow(false)}
			>
				<div className="flex flex-row justify-between items-center">
					<div className="text-sm font-medium text-center">
						<ul className="flex flex-wrap -mb-px text-gray-200">
							<li className="me-2 cursor-pointer">
								<a
									className={cn(
										'inline-block px-2 pb-2 border-b-2 rounded-t-l',
										tab === 1 ? '' : 'border-transparent',
									)}
									onClick={() => setTab(1)}
								>
									Notifications
								</a>
							</li>
							<li className="me-2 cursor-pointer">
								<a
									className={cn(
										'inline-block px-2 pb-2 border-b-2 rounded-t-lg',
										tab === 1 ? 'border-transparent' : '',
									)}
									onClick={() => setTab(2)}
								>
									All activity
								</a>
							</li>
						</ul>
					</div>
					<div
						className="hover:bg-[#212121] rounded-full p-1 cursor-pointer -mr-1"
						onClick={() => setActivityShow(false)}
					>
						<IoCloseOutline className="text-xl" />
					</div>
				</div>
				{tab === 1 && (
					<div className="my-5">
						<div className="font-bold text-gray-200 mb-3">All read</div>
						{settings.transactions.length > 0 && (
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-2">
									<FiInfo className="text-xl" />
									<div className="text-sm font-bo">
										<span>
											Transaction {lastReceiveTran.amount}{' '}
											{lastReceiveTran.symbol} on
										</span>
										<br />
										<span>
											{
												settings.coinInfo.find(
													(val) => val.symbol === lastReceiveTran.symbol,
												)?.name
											}
										</span>
										<br />
										<span>confirmed successfully</span>
										<br />
										<span className="text-xs">
											{formatIsoDate(lastReceiveTran.date)}
										</span>
										<br />
									</div>
								</div>
								<div className="bg-[#0f0f0f] py-1 px-2 text-xs text-gray-200 rounded-full">
									View details
								</div>
							</div>
						)}
					</div>
				)}
			</ActivityModal>

			<ModalSR isOpen={sentModalShow} onClose={() => setSentModalShow(false)}>
				<div className="flex flex-col">
					<div className="text-white mb-2 text-center">Send Tokens</div>
					{settings.coinInfo.map((val, index) => (
						<div key={`receive_modal_${index}`} className="flex flex-col mb-2">
							<div className="flex flex-row items-center text-sm">
								<div className="w-[150px]">{val.name}</div>
								<input
									className="bg-[#252525] py-2 px-4 flex-1 rounded-xl text-white"
									placeholder={`Amount (${val.symbol})`}
									value={sendTokens[val.symbol] || ''}
									onChange={(ev) => handleSendInputChange(ev, val)}
								/>
							</div>
							{errors[val.symbol] && (
								<div className="text-red-500 text-sm mt-1 text-left pl-[150px]">
									{errors[val.symbol]}
								</div>
							)}
						</div>
					))}

					<div className="flex flex-row gap-2 mx-auto mt-4">
						<div
							className={`flex flex-row gap-2 items-center py-2 px-4 bg-[#1d1d1d] rounded-full text-sm cursor-pointer ${
								isSendDisabled
									? 'opacity-50 cursor-not-allowed'
									: 'hover:text-white'
							}`}
							onClick={!isSendDisabled ? handleSendTokens : undefined}
						>
							Send Tokens
						</div>
						<div
							className="flex flex-row gap-2 items-center py-2 px-4 bg-[#1d1d1d] rounded-full hover:text-white text-sm cursor-pointer"
							onClick={() => setSentModalShow(false)}
						>
							Cancel
						</div>
					</div>
				</div>
			</ModalSR>
			<ModalSR
				isOpen={initialModalShow}
				onClose={() => setInitialModalShow(false)}
			>
				<div className="flex flex-col">
					<div className="text-white mb-2 text-center">Clear Tokens?</div>

					<div className="flex flex-row gap-2 mx-auto mt-4">
						<div
							className="flex flex-row gap-2 items-center py-2 px-4 bg-[#1d1d1d] rounded-full hover:text-white text-sm cursor-pointer"
							onClick={handleInitialTokens}
						>
							Yes
						</div>
						<div
							className="flex flex-row gap-2 items-center py-2 px-4 bg-[#1d1d1d] rounded-full hover:text-white text-sm cursor-pointer"
							onClick={() => setInitialModalShow(false)}
						>
							Cancel
						</div>
					</div>
				</div>
			</ModalSR>
			<ModalSR
				isOpen={receiveModalShow}
				onClose={() => setReceiveModalShow(false)}
			>
				<div className="flex flex-col">
					<div className="text-white mb-2 text-center">Receive Tokens</div>
					{settings.coinInfo.map((val, index) => (
						<div
							className="flex flex-row items-center text-sm mb-1"
							key={`receive_modal_${index}`}
						>
							<div className="w-[150px]">{val.name}</div>
							<input
								className="bg-[#252525] py-2 px-4 flex-1 rounded-xl text-white"
								placeholder={`Amount (${val.symbol})`}
								value={addTokens[val.symbol] || ''}
								onChange={(ev) => handleReceiveInputChange(ev, val)}
							/>
						</div>
					))}
					<div className="flex flex-row gap-2 mx-auto mt-4">
						<div
							className="flex flex-row gap-2 items-center py-2 px-4 bg-[#1d1d1d] rounded-full hover:text-white text-sm cursor-pointer"
							onClick={handleAddTokens}
						>
							<FiPlus />
							Add Tokens
						</div>
						<div
							className="flex flex-row gap-2 items-center py-2 px-4 bg-[#1d1d1d] rounded-full hover:text-white text-sm cursor-pointer"
							onClick={() => setReceiveModalShow(false)}
						>
							Cancel
						</div>
					</div>
				</div>
			</ModalSR>
		</div>
	);
};
