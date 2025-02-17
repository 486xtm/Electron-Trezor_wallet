import React, { useEffect, useState } from 'react';
import { PROTOCOL } from '@/config/config';
import { useTheme } from '@/renderer/context/theme-context';
import { cn } from '@/lib/utils';
import { useGlobalContext } from '@/renderer/context/global-context';
import { Header } from '../header/header';
import { IoIosMore } from 'react-icons/io';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { GoPlus } from 'react-icons/go';
import { MdWindow } from 'react-icons/md';
import { BsReverseLayoutTextWindowReverse } from 'react-icons/bs';
import { FaArrowRight } from 'react-icons/fa6';
import { PiWallet } from 'react-icons/pi';
import { IoMdTrendingDown } from 'react-icons/io';
import { LuPiggyBank } from 'react-icons/lu';
import { RiLockUnlockLine } from 'react-icons/ri';
import { FaArrowTrendUp } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import {BarChart} from '../chart/chart';
export const Home = () => {
	const { theme, setTheme } = useTheme();
	const { settings, setSettings } = useGlobalContext();
	const navigate = useNavigate();
	const sampleData = settings.cartInfo["ALL"] || [];
	
	const totalBalance = settings.coinInfo.reduce((total, token) => total + (token.amount * settings.priceInfo[token.symbol]), 0);

	return (
		<div className="flex flex-col h-screen">
			<Header title="Dashboard" coinInfo="" />
			<div className="px-5 py-4 flex flex-col flex-1 overflow-y-scroll pb-10">
				<div className="flex flex-row items-center justify-between mb-4">
					<div className="flex items-center text-white text-xl gap-2">
						Portfolio
						<AiOutlineQuestionCircle className="text-sm" />
					</div>
					<div className="bg-[#1d1d1d] rounded-full py-2 flex items-center px-3 cursor-pointer">
						<IoIosMore />
					</div>
				</div>
				<div className="bg-[#1d1d1d] border rounded-xl border-[#212121] mb-5 pb-10">
					<div className="flex flex-row items-center justify-between px-5 border-b border-[#252525] mb-10">
						<div>
							<span className="text-[50px] text-white">${Math.floor(totalBalance).toLocaleString()}</span>
							<span>.{(totalBalance % 1).toFixed(2).split('.')[1]}</span>
						</div>
						<div className='flex flex-row items-center text-sm'>
							<div className='flex flex-row border-r gap-2 mr-2 pr-2'>
								<span>1D</span>
								<span>1W</span>
								<span>1M</span>
								<span>1Y</span>
								<span className='text-white'>ALL</span>
							</div>
							<div>Range</div>
						</div>
					</div>
					<BarChart data={sampleData} type='dashboard' symbol='' />
				</div>

				<div className="flex flex-row items-center justify-between mb-4">
					<div className="flex items-center text-white text-xl gap-2">
						Assets
					</div>
					<div className="flex gap-2 items-center">
						<div className="bg-[#1d1d1d] rounded-full py-2 flex items-center px-3 cursor-pointer text-sm gap-2 text-gray-200">
							<GoPlus className="text-xl" /> Enable more coins
						</div>
						<BsReverseLayoutTextWindowReverse className="" />
						<MdWindow className="text-xl text-[#61bbb8]" />
					</div>
				</div>
				<div className="flex flex-wrap mb-10">
					{settings.coinInfo.map((val, index) => (
						<div
							className="xl:w-1/3 w-1/2  p-1"
							key={`dashboard_coin_${index}`}
						>
							<div className="border h-full rounded-xl border-[#252525] bg-[#1d1d1d] p-3">
								<div className="flex items-center flex-row justify-between mb-5">
									<div className="flex gap-2 items-center">
										<div className="p-2 rounded-full bg-[#171717]">
											<img
												src={val.img}
												className="rounded-full w-[30px] border-2 border-[#252525]"
												alt="coin"
											/>
										</div>
										<div className="flex flex-col text-sm ">
											<div className="text-white">{val.name.split(' #1')}</div>
											<div className="flex items-center gap-2">
												<PiWallet />{1}
											</div>
										</div>
									</div>
									<div
										className="cursor-pointer"
										onClick={() =>
											navigate(`/main/coin/${val.symbol}`, { state: val })
										}
									>
										<FaArrowRight />
									</div>
								</div>
								<div>
									<span className="text-white text-[30px] pl-2">${(Math.floor(val.amount * settings.priceInfo[val.symbol])).toLocaleString()}</span>
									<span>.{((val.amount * settings.priceInfo[val.symbol]) % 1).toFixed(2).split('.')[1]}</span>
								</div>
								<div className="text-sm mb-1 pl-2">
									{val.amount} {val.symbol}
								</div>
								<div className="bg-[#252525] rounded-xl p-4 flex flex-row items-center text-sm">
									<div className="w-1/3">
										Price
										<br />
										<span className="text-white">${(settings.priceInfo[val.symbol]).toLocaleString()}</span>
									</div>
									<div className="w-1/3 flex flex-col justify-center text-center">
										7d change
										<br />
										<div className="flex flex-row text-red-300 items-center justify-center gap-1">
											<IoMdTrendingDown />
											-5.9%
										</div>
									</div>
									<div className="w-1/3 flex justify-end">
										<span className="text-gray-200 bg-[#2b2b2b] rounded-full py-2 px-4 cursor-pointer">
											Buy
										</span>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
				<div className="flex items-center text-white text-xl mb-5">
					Stake ETH
				</div>

				<div className="bg-[#1d1d1d] border rounded-xl border-[#212121] p-5 mb-10">
					<div className="flex items-center text-white text-xl ">
						The easiest way to earn ETH
					</div>
					<div className="flex items-center text-white  mb-10">
						Stake. Earn rewards. Repeat
					</div>
					<div className="flex flex-row w-full gap-3 border-b border-[#212121] pb-10 mb-5">
						<div className="w-1/3">
							<div className="bg-[#0e3025] rounded-full w-[80px] h-[80px] flex items-center justify-center mb-5">
								<span className="bg-[#186851] flex items-center justify-center rounded-full w-[60px] h-[60px] text-[40px] text-[#6dd9bb]">
									<LuPiggyBank />
								</span>
							</div>
							<div className="flex items-center text-white xl:text-xl text-lg">
								Watch your money dance
							</div>
							<div className="flex items-center xl:text-sm text-xs">
								Earn 3.46% APY by staking your ETH with Trezor
							</div>
						</div>
						<div className="w-1/3">
							<div className="bg-[#0e3025] rounded-full w-[80px] h-[80px] flex items-center justify-center mb-5">
								<span className="bg-[#186851] flex items-center justify-center rounded-full w-[60px] h-[60px] text-[40px] text-[#6dd9bb]">
									<RiLockUnlockLine />
								</span>
							</div>
							<div className="flex items-center text-white xl:text-xl text-lg">
								Lock in funds with flexibility
							</div>
							<div className="flex items-center xl:text-sm text-xs">
								Staking locks in your funds, but you can unstake them anytime
							</div>
						</div>
						<div className="w-1/3">
							<div className="bg-[#0e3025] rounded-full w-[80px] h-[80px] flex items-center justify-center mb-5">
								<span className="bg-[#186851] flex items-center justify-center rounded-full w-[60px] h-[60px] text-[40px] text-[#6dd9bb]">
									<FaArrowTrendUp />
								</span>
							</div>
							<div className="flex items-center text-white xl:text-xl text-lg">
								Maximize your rewards
							</div>
							<div className="flex items-center xl:text-sm text-xs">
								Soar high! Earn rewards on your rewards. Staking has never felt
								so good
							</div>
						</div>
					</div>
					<div className="flex flex-row justify-between items-center">
						<div>
							<div className="text-xs">Available now for</div>
							<div className="flex flex-row gap-1 items-center text-white">
								<img
									src={`${PROTOCOL}://Trezor/coin/ethereum.png`}
									className="rounded-full w-[18px] h-[18px]"
								/>
								Ethereum
							</div>
						</div>
						<div className="flex flex-row gap-2 items-center">
							<div className="py-2 px-4 bg-[#61dbb8] rounded-full text-black cursor-pointer">
								Start staking
							</div>
							<div className="py-2 px-4 bg-[#252525] rounded-full text-gray-200 cursor-pointer">
								Maybe later
							</div>
						</div>
					</div>
				</div>
				<hr className="border-[#212121] mb-5" />

				<div className="flex flex-row items-center justify-between mb-3">
					<div className="text-white text-sm ml-5">
						Sync & track on your phone with Trezor Suit Lite
					</div>
					<div className="flex flex-row items-center gap-2">
						<img
							src={`${PROTOCOL}://Trezor/app-store-badge.svg`}
							className="xl:h-[40px] h-[30px] cursor-pointer"
						/>
						<img
							src={`${PROTOCOL}://Trezor/play-store-badge.svg`}
							className="xl:h-[40px] h-[30px] cursor-pointer"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
