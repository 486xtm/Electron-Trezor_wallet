import { cn } from '@/lib/utils';
import React, { useState } from 'react';
import { useTheme } from '@/renderer/context/theme-context';
import { useLocation, useParams } from 'react-router-dom';
import { Header } from '../../header/header';
import { IoIosMore, IoMdTrendingDown } from 'react-icons/io';
import { LuSearch } from 'react-icons/lu';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa6';
import { BarChart } from '../../chart/chart';
import { useGlobalContext } from '@/renderer/context/global-context';
import { groupByFormattedDate, formatDate } from '@/renderer/lib/utls';
import { PiCoins } from 'react-icons/pi';
import { PiEyeSlashBold } from 'react-icons/pi';
import { LuPiggyBank } from 'react-icons/lu';
import { RiLockUnlockLine } from 'react-icons/ri';
import { FaArrowTrendUp } from 'react-icons/fa6';
import { TbHexagon3D } from 'react-icons/tb';
import { GoArrowUpRight } from 'react-icons/go';

export const CoinInfo = () => {
	const { theme } = useTheme();
	const param = useParams();
	const { settings } = useGlobalContext();
	const coinInfo = settings.coinInfo.filter(
		(val) => val.symbol === param.symbol?.split(',')[0],
	)[0];
	const transactions =
		settings.transactions.filter((val) => val.symbol === param.symbol) || [];
	const totalIncoming = transactions.reduce((token, val) => {
		if (val.type === 'receive') {
			return token + Number(val.amount);
		}
		return token;
	}, 0);
	const totalOutgoing = transactions.reduce((token, val) => {
		if (val.type === 'send') {
			return token + Number(val.amount);
		}
		return token;
	}, 0);
	const groupedTransactions = groupByFormattedDate(
		transactions,
		settings.priceInfo[coinInfo.symbol],
	);
	const [coinTab, setCoinTab] = useState(1);

	const sampleData = settings.cartInfo[coinInfo.symbol] || [];
	return (
		<div className="flex flex-col h-screen">
			<Header title={coinInfo.name} coinInfo={coinInfo} />
			<div className="px-5 pt-4 pb-10 flex flex-col flex-1 overflow-y-scroll">
				<div className="flex gap-2 items-center">
					<img src={coinInfo.img} className="rounded-full w-[18px] h-[18px]" />
					<span>
						{coinInfo.amount} {coinInfo.symbol}
					</span>
				</div>
				<div className="mb-5">
					<span className="text-white text-[40px]">
						${Math.floor(coinInfo.amount * settings.priceInfo[coinInfo.symbol]).toLocaleString()}
					</span>
					<span>
						.{((coinInfo.amount * settings.priceInfo[coinInfo.symbol]) % 1).toFixed(2).split('.')[1]}
					</span>
				</div>
				<div className="text-sm font-medium text-center border-b border-[#252525] mb-5">
					<ul className="flex flex-wrap -mb-px text-gray-200">
						<li className="me-2 cursor-pointer">
							<a
								className={cn(
									'inline-block px-2 pb-2 border-b-2 rounded-t-l',
									coinTab === 1 ? '' : 'border-transparent',
								)}
								onClick={() => setCoinTab(1)}
							>
								Overview
							</a>
						</li>
						{coinInfo.symbol === 'ETH' && (
							<>
								<li className="me-2 cursor-pointer">
									<a
										className={cn(
											'inline-block px-2 pb-2 border-b-2 rounded-t-lg',
											coinTab === 2 ? '' : 'border-transparent',
										)}
										onClick={() => setCoinTab(2)}
									>
										Tokens
									</a>
								</li>
								<li className="me-2 cursor-pointer">
									<a
										className={cn(
											'inline-block px-2 pb-2 border-b-2 rounded-t-lg',
											coinTab === 3 ? '' : 'border-transparent',
										)}
										onClick={() => setCoinTab(3)}
									>
										Staking
									</a>
								</li>
							</>
						)}
						<li className="me-2 cursor-pointer">
							<a
								className={cn(
									'inline-block px-2 pb-2 border-b-2 rounded-t-lg',
									coinTab === 4 ? '' : 'border-transparent',
								)}
								onClick={() => setCoinTab(4)}
							>
								Details
							</a>
						</li>
					</ul>
				</div>

				{coinTab === 1 && (
					<>
						<div className="flex flex-row items-center text-sm mb-7 mt-2">
							<div className="flex flex-row border-r gap-2 mr-2 pr-2">
								<span>1D</span>
								<span>1W</span>
								<span>1M</span>
								<span>1Y</span>
								<span className="text-white">ALL</span>
							</div>
							<div>Range</div>
						</div>
						<div className="bg-[#1d1d1d] border rounded-xl border-[#252525] mb-5 py-10">
							<BarChart
								data={sampleData}
								type="coin"
								symbol={coinInfo.symbol}
							/>
						</div>
						<div className="flex gap-4 text-sm mb-5">
							<div className="border h-full rounded-xl border-[#252525] bg-[#1d1d1d] p-3 w-1/3">
								<span className="text-xs">ALL</span>
								<br />
								<br />
								<span className="text-gray-200">
									{transactions.length} transactions
								</span>
								<br />
								<span className="text-xs">
									{transactions.length === 0
										? formatDate(new Date().toISOString())
										: Object.keys(groupedTransactions)[0]}{' '}
									- {formatDate(new Date().toISOString())}
								</span>
							</div>
							<div className="border h-full rounded-xl border-[#252525] bg-[#1d1d1d] p-3 w-1/3">
								<span className="text-xs">INCOMING</span>
								<br />
								<br />
								<span className="text-gray-200">
									<span className="text-green-300">+</span> {totalIncoming}{' '}
									{coinInfo.symbol}
								</span>
								<br />
								<span className="text-xs ml-3">
									${(totalIncoming * settings.priceInfo[coinInfo.symbol]).toLocaleString()}
								</span>
							</div>
							<div className="border h-full rounded-xl border-[#252525] bg-[#1d1d1d] p-3 w-1/3">
								<span className="text-xs">OUTGOING</span>
								<br />
								<br />
								<span className="text-gray-200">
									<span className="text-red-300">-</span> {totalOutgoing}{' '}
									{coinInfo.symbol}
								</span>
								<br />
								<span className="text-xs ml-2">
									${(totalOutgoing * settings.priceInfo[coinInfo.symbol]).toLocaleString()}
								</span>
							</div>
						</div>
						<div className="flex items-center text-white text-xl mb-5">
							Trade
						</div>
						<div className="border h-[100px] rounded-xl border-[#252525] bg-[#1d1d1d] p-3 flex justify-between items-center mb-10">
							<div className="px-4 flex flex-row items-center text-sm xl:w-1/3 w-1/2">
								<div className="w-1/2 flex items-center gap-2">
									<img src={coinInfo.img} className="rounded-full w-[30px]" />
									<div>
										<span className="text-white font-bold">
											{coinInfo.name.split(' #1')}
										</span>
										<br />
										{coinInfo.symbol}
									</div>
								</div>
								<div className="w-1/4">
									Price
									<br />
									<span className="text-white">
										${(settings.priceInfo[coinInfo.symbol]).toLocaleString()}
									</span>
								</div>
								<div className="w-1/4 flex flex-col justify-center text-center">
									7d change
									<br />
									<div className="flex flex-row text-red-300 items-center justify-center gap-1">
										<IoMdTrendingDown />
										-5.9%
									</div>
								</div>
							</div>
							<div className="flex flex-row items-center gap-2 text-sm">
								<div className="text-gray-200 bg-[#2b2b2b] rounded-full py-2 px-4">
									Buy
								</div>
								<div className="text-gray-200 bg-[#2b2b2b] rounded-full py-2 px-4">
									Sell
								</div>
								<div className="text-gray-200 bg-[#2b2b2b] rounded-full py-2 px-4">
									Swap
								</div>
							</div>
						</div>

						<div className="flex flex-row items-center justify-between mb-10">
							<div className="flex items-center text-white text-xl gap-2">
								Transactions
							</div>
							<div className="flex flex-row gap-2">
								<div className="bg-[#1d1d1d] rounded-full py-2 flex items-center px-2 cursor-pointer text-white">
									<LuSearch />
								</div>
								<div className="bg-[#1d1d1d] rounded-full py-2 flex items-center px-2 cursor-pointer">
									<IoIosMore />
								</div>
							</div>
						</div>
						{Object.keys(groupedTransactions).length === 0 ? (
							<div className="mb-10 text-center">No Transactions</div>
						) : (
							Object.keys(groupedTransactions)
								.reverse()
								.map((key) => (
									<div key={key} className="mb-10">
										<div className="flex flex-row justify-between text-sm mb-5">
											<span>{key}</span>
											<span>
												+${(groupedTransactions[key].totalPrice).toLocaleString()}
											</span>
										</div>
										{groupedTransactions[key].transactions
											.reverse()
											.map((val: any, index: number) => (
												<div key={`tx_${index}`}>
													{val.type === 'receive' ? (
														<div className="border rounded-xl border-[#252525] bg-[#1d1d1d] px-3 py-4 mb-2 flex flex-row items-center justify-between">
															<div className="flex flex-row items-center gap-4">
																<FaArrowDown className="text-xl" />
																<div>
																	<span className="text-gray-200">
																		Received {coinInfo.symbol}
																	</span>
																	<br />
																	<span className="text-sm">
																		{val.time} {val.address}
																	</span>
																</div>
															</div>
															<div className="text-right mr-2">
																<span className="text-green-400">+</span>{' '}
																<span className="text-gray-200">
																	{val.amount} {coinInfo.symbol}
																</span>
																<br />
																<span className="text-sm">
																	$
																	{(
																		val.amount * settings.priceInfo[coinInfo.symbol]
																	).toLocaleString()}
																</span>
															</div>
														</div>
													) : (
														<div className="border rounded-xl border-[#252525] bg-[#1d1d1d] px-3 py-4 mb-2 flex flex-row items-center justify-between">
															<div className="flex flex-row items-center gap-4">
																<FaArrowUp className="text-xl" />
																<div>
																	<span className="text-gray-200">
																		Sent {coinInfo.symbol}
																	</span>
																	<br />
																	<span className="text-sm">
																		{val.time} {val.address}
																	</span>
																	<br />
																	<br />
																	<span className="text-sm ml-10">Fee</span>
																</div>
															</div>
															<div className="text-right mr-2">
																<span className="text-gray-200">
																	<span className="text-red-300">-</span>{' '}
																	{val.amount} {coinInfo.symbol}
																</span>
																<br />
																<span className="text-sm">
																	$
																	{(
																		val.amount * settings.priceInfo[coinInfo.symbol]
																	).toLocaleString()}
																</span>
																<br />
																<br />
																<span className="text-sm ">
																	-0.0002538 {coinInfo.symbol}
																</span>
																<br />
																<span className="text-sm ">$24.6</span>
															</div>
														</div>
													)}
												</div>
											))}
									</div>
								))
						)}
					</>
				)}
				{coinTab === 2 && (
					<div className="flex flex-col">
						<div className="flex flex-row justify-between items-center">
							<div className="flex flex-row gap-2">
								<div className="flex flex-row mx-auto px-3 py-1 text-sm items-center cursor-pointer text-gray-200 gap-1 rounded-full bg-[#1d1d1d] border border-[#252525]">
									<PiCoins />
									Tokens
								</div>

								<div className="flex flex-row mx-auto px-3 py-1 text-sm items-center cursor-pointer gap-1 rounded-full  bg-transparent">
									<PiEyeSlashBold />
									Hidden
								</div>
							</div>
							<div className="flex flex-row gap-2">
								<div className="bg-[#1d1d1d] text-white rounded-full py-2 flex items-center px-2 cursor-pointer">
									<LuSearch />
								</div>
							</div>
						</div>
						<div className="flex flex-col items-center justify-center text-[40px] border bg-[#1d1d1d] border-[#252525] pt-10 pb-5 rounded-2xl mt-5 gap-5">
							<div className="flex flex-row gap-2 ">
								<div className="bg-[#252525] rounded-full py-2 flex items-center px-2 cursor-pointer">
									<PiCoins />
								</div>
							</div>
							<div className="text-center text-gray-200 ">
								No tokens. They may be hidden
							</div>
						</div>
					</div>
				)}
				{coinTab === 3 && (
					<>
						<div className="flex items-center text-white text-xl mb-5">
							Stake ETH
						</div>

						<div className="bg-[#1d1d1d] border rounded-xl border-[#252525] p-5 mb-10">
							<div className="flex flex-col border-b border-[#252525] pb-5 mb-10">
								<div className="flex items-center text-white text-lg ">
									What is staking
								</div>
								<div className="flex items-center text-[15px] ">
									Staking involves temporarily locking your ETH to support the
									blockchain's operation, In retur, you'll earn additional ETH
									as a reward.
								</div>
							</div>
							<div className="flex flex-row w-full gap-3  pb-10 mb-5">
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
										Staking locks in your funds, but you can unstake them
										anytime
									</div>
								</div>
								<div className="w-1/3">
									<div className="bg-[#0e3025] rounded-full w-[80px] h-[80px] flex items-center justify-center mb-5">
										<span className="bg-[#186851] flex items-center justify-center rounded-full w-[60px] h-[60px] text-[40px] text-[#6dd9bb]">
											<TbHexagon3D />
										</span>
									</div>
									<div className="flex items-center text-white xl:text-xl text-lg">
										Trezor & Everstake
									</div>
									<div className="flex items-center xl:text-sm text-xs">
										Everstake is a global leader and supplier of staking
										technology
									</div>
								</div>
							</div>
							<div className="flex flex-row gap-2 items-center">
								<div className="py-2 px-4 bg-[#61dbb8] rounded-full text-black cursor-pointer">
									Start staking
								</div>
							</div>
						</div>

						<hr className="border-[#252525] mb-5" />

						<div className="flex flex-row justify-between items-center mb-10">
							<div className="flex items-center gap-1">
								Powered by <TbHexagon3D className="text-gray-200" />
								<span className="text-gray-200"> by everstke</span>
							</div>
							<div className="flex gap-2 items-center w-[130px] justify-center bg-[#252525] text-sm rounded-full py-1 px-2 text-white">
								Learn more <GoArrowUpRight />
							</div>
						</div>
					</>
				)}
				{coinTab === 4 && (
					<>
						<div className="border rounded-xl border-[#252525] bg-[#1d1d1d] p-3">
							<div className="flex flex-row border-b pb-5 border-[#252525] mb-5 items-center">
								<div className="w-3/5">
									<div className="text-white mb-3">Account type</div>
									<div className="flex justify-between items-center text-xs mb-3">
										The current and most widely accepted method of generating and managing Ethereum address ensures interoperability, security, and support for all types of tokens.
									</div>
									<div className="flex gap-2 items-center w-[130px] justify-center bg-[#252525] text-sm rounded-full py-1 px-2 text-white">
										Learn more <GoArrowUpRight />
									</div>
								</div>
								<div className="flex-1 flex flex-col justify-end gap-1">
									<div className="bg-[#252525] ml-auto rounded-full py-2 px-5 text-sm">
										Default
									</div>
									<div className='flex ml-auto text-xs text-white'>
									(BIP44, P2PKH, Base58)
									</div>
								</div>
							</div>
							<div className="flex flex-row pb-5  items-center">
								<div className="w-3/5">
									<div className="text-white mb-3">Derivation path</div>
									<div className="flex justify-between items-center text-xs mb-3">
										The derivation path is a way to navigate and generate specific keys with the organized structure of an HD(Hierarchical Deterministic) wallet
									</div>
									<div className="flex gap-2 items-center w-[130px] justify-center bg-[#252525] text-sm rounded-full py-1 px-2 text-white">
										Learn more <GoArrowUpRight />
									</div>
								</div>
								<div className="flex-1 flex justify-end">
									<div className="text-white rounded-full py-2 px-3 text-sm">
										m/44/60/0/0/0
									</div>
								</div>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
};
