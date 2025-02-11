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
export const Home = () => {
	const { theme, setTheme } = useTheme();
	const { settings, setSettings } = useGlobalContext();

	// const handleChangeTokenType = async () => {
	// 	if (tokenType == 'XMR') {
	// 		try {
	// 			const res = await fetch(
	// 				`https://api.coingecko.com/api/v3/simple/price?ids=monero&vs_currencies=usd`,
	// 			);
	// 			const data = await res.json();
	// 			setPrice(data.monero.usd);
	// 			setTokenType('USD');
	// 		} catch {
	// 			setPrice(1);
	// 			setTokenType('XMR');
	// 		}
	// 	} else {
	// 		setTokenType('XMR');
	// 		setPrice(1);
	// 	}
	// };

	return (
		<div className="flex flex-col h-screen">
			<Header title="Dashboard" />
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
				<div className="bg-[#1d1d1d] border rounded-xl border-[#212121] h-[300px] mb-5">
					aaa
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
					{mockCoin.map((val, index) => (
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
												<PiWallet />1
											</div>
										</div>
									</div>
									<div>
										<FaArrowRight />
									</div>
								</div>
								<div>
									<span className="text-white text-[30px] pl-2">$0</span>
									<span>.00</span>
								</div>
								<div className="text-sm mb-1 pl-2">
									{val.amount} {val.symbol}
								</div>
								<div className="bg-[#252525] rounded-xl p-4 flex flex-row items-center text-sm">
									<div className="w-1/3">
										Price
										<br />
										<span className="text-white">$96,407</span>
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
										<span className="text-gray-200 bg-[#2b2b2b] rounded-full py-2 px-4">
											Buy
										</span>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
				<div className="flex items-center text-white text-xl gap-2">
					Stake ETH
				</div>

				<div className="bg-[#1d1d1d] border rounded-xl border-[#212121] p-5 mb-5">
					<div className="flex items-center text-white text-xl gap-2">
						The easiest way to earn ETH
					</div>
					<div className="flex items-center text-white gap-2 mb-10">
						Stake. Earn rewards. Repeat
					</div>
					<div className="flex flex-row w-full gap-3 border-b border-[#212121] pb-10 mb-5">
						<div className="w-1/3">
							<div className="flex items-center text-white xl:text-xl text-lg">
								Watch your money dance
							</div>
							<div className="flex items-center xl:text-sm text-xs">
								Earn 3.46% APY by staking your ETH with Trezor
							</div>
						</div>
						<div className="w-1/3">
							<div className="flex items-center text-white xl:text-xl text-lg">
								Lock in funds with flexibility
							</div>
							<div className="flex items-center xl:text-sm text-xs">
								Staking locks in your funds, but you can unstake them anytime
							</div>
						</div>
						<div className="w-1/3">
							<div className="flex items-center text-white xl:text-xl text-lg">
								Maximize your rewards
							</div>
							<div className="flex items-center xl:text-sm text-xs">
								Soar high! Earn rewards on your rewards. Staking has never felt so good
							</div>
						</div>
					</div>
					<div className='flex flex-row justify-between items-center'>
						<div>
							<div className='text-xs'>Available now for</div>
							<div className='flex flex-row gap-1 items-center text-white'>
								<img src={`${PROTOCOL}://Trezor/coin/ethereum.png`} className='rounded-full w-[18px] h-[18px]' />
								Ethereum
							</div>
						</div>
						<div className='flex flex-row gap-2 items-center'>
							<div className='py-2 px-4 bg-[#61dbb8] rounded-full text-black'>Start staking</div>
							<div className='py-2 px-4 bg-[#252525] rounded-full text-gray-200'>Start staking</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
