import React, { useState } from 'react';
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
import { FiInfo } from 'react-icons/fi';
import { IoCloseOutline } from 'react-icons/io5';
import Modal from '../modal/modal';
import ActivityModal from '../modal/activity';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

interface SideBarProps {
	children?: React.ReactNode;
}
const mockCoin = [
	{
		img: `${PROTOCOL}://Trezor/coin/bitcoin.png`,
		name: 'Bitcoin #1',
		amount: '0',
		symbol: 'BTC',
	},
	{
		img: `${PROTOCOL}://Trezor/coin/ethereum.png`,
		name: 'Ethereum #1',
		amount: '0',
		symbol: 'ETH',
	},
	{
		img: `${PROTOCOL}://Trezor/coin/polygon.png`,
		name: 'Polygon PoS #1',
		amount: '0',
		symbol: 'POL',
	},
	{
		img: `${PROTOCOL}://Trezor/coin/solana.png`,
		name: 'Solana #1',
		amount: '0',
		symbol: 'SOL',
	},
	{
		img: `${PROTOCOL}://Trezor/coin/cardano.webp`,
		name: 'Cardano #1',
		amount: '0',
		symbol: 'ADA',
	},
	{
		img: `${PROTOCOL}://Trezor/coin/xrp.png`,
		name: 'XRP #1',
		amount: '0',
		symbol: 'XRP',
	},
	{
		img: `${PROTOCOL}://Trezor/coin/bitcoincash.png`,
		name: 'Bitcoin Cash #1',
		amount: '0',
		symbol: 'BCH',
	},
	{
		img: `${PROTOCOL}://Trezor/coin/doge.svg`,
		name: 'Dogecoin #1',
		amount: '0',
		symbol: 'DOGE',
	},
];
export const SideBar: React.FC<SideBarProps> = ({ children }) => {
	const { theme, setTheme } = useTheme();
	const [showValue, setShowValue] = useState(false);
	const [activityShow, setActivityShow] = useState(false);
	const [tab, setTab] = useState(1);
  const location = useLocation();
  const navigate = useNavigate();
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
									theme === 'dark' ? 'text-gray-200' : '',
								)}
							>
								My Trezor
							</div>
							<div className="text-xs flex items-center gap-1">
								<PiLinkBreak />
								Disconnected
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
               location.pathname === '/main/home' ? 'bg-[#161616] border-[#1d1d1d] text-gray-200' : ''
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
							activityShow === true ? 'bg-[#252525]' : '',
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
               location.pathname === '/main/setting' ? 'bg-[#161616] border-[#1d1d1d] text-gray-200' : ''
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
						{mockCoin.map((val, index) => (
							<img src={val.img} className="w-[15px] grayscale" key={`search_coin_${index}`} />
						))}
					</div>
				</div>
				<div className="text-xs my-4 ml-[50px]">Default accounts</div>
				<div
					className="text-sm flex-1 overflow-y-scroll pb-3 flex flex-col gap-1"
					style={{
						WebkitMaskImage:
							'linear-gradient(to bottom, black 90%, transparent)',
					}}
				>
					{mockCoin.map((val, index) => (
						<div
							className={cn(
								'flex flex-row justify-between pr-2 py-2 rounded-lg cursor-pointer',
								theme === 'dark' ? 'hover:bg-[#1d1d1d]' : '',
                location.pathname === `/main/coin/${val.symbol}` ? 'bg-[#1d1d1d]': ''
							)}
              onClick={() => navigate(`/main/coin/${val.symbol}`, {state: val})}
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
										className={cn('', theme === 'dark' ? 'text-gray-200' : '')}
									>
										{val.name}
									</span>
									<br />
									<span>
										{val.amount} {val.symbol}
									</span>
								</div>
							</div>
							$0
						</div>
					))}
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
							<div className="text-xs flex items-center gap-1">
								<PiLinkBreak />
								Disconnected
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
							<span className="text-gray-200 text-[37px]">$384,246</span>
							<span>.40</span>
						</div>
						<hr className="-mx-2 border-[#212121]" />
						<div className="flex flex-row justify-between p-3 items-center">
							<div className="flex items-center -ml-4 text-[#2dbb7f]">
								<LuDot className="text-[30px]" />
								<span className="text-sm font-bold">View-only enabled</span>
							</div>
							<IoIosArrowDropdown />
						</div>
					</div>
				</div>
				<div className="bg-[#252525] mx-3 text-center py-3 flex flex-row justify-center items-center gap-2 rounded-full">
					<GoPlus className="w-[25px] h-[25px]" /> Passphrase wallet
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
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-2">
								<FiInfo className="text-xl" />
								<div className="text-sm font-bo">
									<span>Transaction 0.33879329 BTC on</span>
									<br />
									<span>Bitcoin #1</span>
									<br />
									<span>confirmed successfully</span>
									<br />
									<span className="text-xs">February 7,2025 15:29</span>
									<br />
								</div>
							</div>
							<div className="bg-[#0f0f0f] py-1 px-2 text-xs text-gray-200 rounded-full">
								View details
							</div>
						</div>
					</div>
				)}
			</ActivityModal>
		</div>
	);
};
