import { cn } from '@/lib/utils';
import React, { useState } from 'react';
import { useTheme } from '@/renderer/context/theme-context';
import { PROTOCOL } from '@/config/config';
import { BiCoin } from 'react-icons/bi';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
const mockCoinSetting = [
	{
		img: `${PROTOCOL}://Trezor/coin/bitcoin.png`,
		name: 'Bitcoin',
		content: '',
	},
	{
		img: `${PROTOCOL}://Trezor/coin/ethereum.png`,
		name: 'Ethereum',
		content: 'Incl. tokens & staking',
	},
	{
		img: `${PROTOCOL}://Trezor/coin/polygon.png`,
		name: 'Polygon PoS',
		content: 'Including tokens',
	},
	{
		img: `${PROTOCOL}://Trezor/coin/solana.png`,
		name: 'Solana',
		content: 'Including tokens',
	},
	{
		img: `${PROTOCOL}://Trezor/coin/cardano.webp`,
		name: 'Cardano',
		content: 'Incl, tokens & staking',
	},
	{
		img: `${PROTOCOL}://Trezor/coin/xrp.png`,
		name: 'XRP',
		content: '',
	},
	{
		img: `${PROTOCOL}://Trezor/coin/bitcoincash.png`,
		name: 'Bitcoin Cash',
		content: '',
	},
	{
		img: `${PROTOCOL}://Trezor/coin/doge.svg`,
		name: 'Dogecoin',
		content: '',
	},
];

const mockTestCoinSetting = [
	{
		img: `${PROTOCOL}://Trezor/coin/bitcoin.png`,
		name: 'Bitcoin Testnet',
		content: 'TEST COIN',
	},
	{
		img: `${PROTOCOL}://Trezor/coin/ethereum.png`,
		name: 'Ethereum Sepolia',
		content: 'TEST COIN',
	},
	{
		img: `${PROTOCOL}://Trezor/coin/ethereum.png`,
		name: 'Ethereum Holesky',
		content: 'TEST COIN',
	},
	{
		img: `${PROTOCOL}://Trezor/coin/solana.png`,
		name: 'Solana Devnet',
		content: 'TEST COIN',
	},
	{
		img: `${PROTOCOL}://Trezor/coin/cardano.webp`,
		name: 'Cardano Testnet',
		content: 'TEST COIN',
	},
	{
		img: `${PROTOCOL}://Trezor/coin/xrp.png`,
		name: 'XRP Testnet',
		content: 'TEST COIN',
	},
];
export const Coins = () => {
	const { theme } = useTheme();
	return (
		<div className="flex flex-col pb-10">
			<div className="border rounded-xl border-[#252525] bg-[#1d1d1d] p-5 mb-10 flex flex-row gap-3 font-bold text-white xl:text-md  text-sm items-center">
				<img
					src={`${PROTOCOL}://Trezor/brush.png`}
					className="rounded-full"
					alt="brush"
				/>
				Connect & unlock your Trezor to change settings
			</div>

			<div className="flex flex-row items-start mb-5">
				<div className="flex flex-row items-center gap-3 w-1/3 text-xl text-white">
					<BiCoin />
					Coins
				</div>
				<div className="border rounded-xl border-[#252525] bg-[#1d1d1d] p-3 gap-3 flex flex-1 flex-wrap">
					{mockCoinSetting.map((val, index) => (
						<div
							className="border rounded-full border-[#252525] bg-[#1d1d1d] px-4 h-[50px] font-bold flex gap-2 items-center"
							key={`setting_coin_${index}`}
						>
							<img
								src={val.img}
								className="rounded-full w-[25px] h-[25px] contrast-50"
								alt="bitcoin"
							/>
							<div>
								<span className="text-gray-300 text-sm leading-none">
									{val.name}
								</span>
								<br />
								<span className="text-xs leading-none">{val.content}</span>
							</div>
						</div>
					))}
				</div>
			</div>

			<div className="flex flex-row items-start mb-5">
				<div className="flex flex-row items-center gap-3 w-1/3 text-xl text-white">
					<BiCoin />
					<div className="flex items-center gap-1">
						Testnet coins <AiOutlineQuestionCircle className="text-sm" />
					</div>
				</div>
				<div className="border rounded-xl border-[#252525] bg-[#1d1d1d] p-3 gap-3 flex flex-1 flex-wrap">
					{mockTestCoinSetting.map((val, index) => (
						<div
							className="border rounded-full border-[#252525] bg-[#1d1d1d] px-4 h-[50px] font-bold flex gap-2 items-center"
							key={`testcoin_${index}`}
						>
							<img
								src={val.img}
								className="rounded-full w-[25px] h-[25px] contrast-50"
								alt="bitcoin"
							/>
							<div>
								<span className="text-gray-300 text-sm leading-none">
									{val.name}
								</span>
								<br />
								<span className="text-xs leading-none">{val.content}</span>
							</div>
						</div>
					))}
				</div>
			</div>

			<div className="bg-[#252525] rounded-full py-2 px-4 mr-auto">
				Activate coins
			</div>
		</div>
	);
};
