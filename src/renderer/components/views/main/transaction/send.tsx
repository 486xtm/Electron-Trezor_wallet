import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/renderer/context/theme-context';
import { cn } from '@/lib/utils';
import { IoIosArrowBack, IoIosMore } from 'react-icons/io';
import { IoSwapHorizontalOutline } from 'react-icons/io5';
import { PiCalendar, PiBroadcast } from 'react-icons/pi';
import { FiPlus } from 'react-icons/fi';
import { LuCircleDashed } from 'react-icons/lu';
import { useGlobalContext } from '@/renderer/context/global-context';
export const Send = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const { theme } = useTheme();
	const coinInfo = location.state;
	const [maxToogle, setMaxToggle] = useState(false);
	const { settings } = useGlobalContext();
	const [fee, setFee] = useState(1);
	return (
		<div className="flex flex-col h-screen">
			<div className="flex flex-row justify-between py-1 px-4 border-b border-[#212121] mb-3">
				<div className={cn('flex flex-row gap-3 items-center')}>
					<div
						className="p-3 hover:bg-[#252525] rounded-full cursor-pointer"
						onClick={() =>
							navigate(`${location.pathname.split('/send')}`, {
								state: coinInfo,
							})
						}
					>
						<IoIosArrowBack className="text-xl text-white" />
					</div>
					<div>
						<div className="text-gray-200">{coinInfo.name}</div>
						<div className="flex flex-row gap-1 items-center">
							<img
								src={coinInfo.img}
								className="rounded-full w-[20px] h-[20px]"
								alt="coin"
							/>
							<span>
								{coinInfo.amount} {coinInfo.symbol} ≈ ${(settings.priceInfo[coinInfo.symbol] * coinInfo.amount).toLocaleString()}
							</span>
						</div>
					</div>
				</div>
			</div>
			<div className=" px-5 pb-10 flex flex-col flex-1 overflow-y-scroll">
				<div className="text-white  mb-5 flex flex-row items-center justify-between">
					<div className='text-[30px]'>Send</div>
					<div className="bg-[#1d1d1d] rounded-full text-gray-400 p-3 flex items-center cursor-pointer">
						<IoIosMore />
					</div>
				</div>
				<div className="flex gap-3">
					<div className="w-2/3">
						<div className="flex flex-col border rounded-xl py-3 px-5 border-[#252525] bg-[#1d1d1d] mb-5">
							<div className="text-white mb-3">To</div>
							<input
								className="bg-[#252525] py-3 px-5 w-full rounded-xl text-white mb-3"
								placeholder="Address"
							/>

							<div className="flex flex-row justify-between items-center text-white mb-3">
								Amount
								<div className="flex flex-row items-center gap-5 text-xs">
									Send max
									<div
										className={cn(
											'bg-[#0d3025] rounded-full w-[30px] h-[17px] flex items-center  transition-all duration-200 cursor-pointer',
											maxToogle ? 'pl-[15px]' : 'bg-[#2b2b2b]',
										)}
										onClick={() => setMaxToggle(!maxToogle)}
									>
										<div className="rounded-full w-[15px] h-[15px] bg-gray-400"></div>
									</div>
								</div>
							</div>
							<div className="flex flex-row items-center">
								<div className="w-[45%] flex items-center">
									<input className="bg-[#252525] py-3 px-5 w-full rounded-l-xl text-white" />
									<div className="bg-[#252525] rounded-r-xl py-3 pr-2">
										{coinInfo.symbol}
									</div>
								</div>
								<div className="w-[10%] text-xl flex items-center justify-center cursor-pointer">
									<IoSwapHorizontalOutline />
								</div>
								<div className="w-[45%] flex items-center">
									<input className="bg-[#252525] py-3 px-5 w-full rounded-l-xl text-white" />
									<select className="bg-[#252525] rounded-r-xl py-[14px] -mt-[1px] outline-none pr-2">
										<option selected>USD</option>
										<option value="US">USDT</option>
									</select>
								</div>
							</div>
						</div>
						<div className="flex flex-row items-center justify-between mb-5">
							<div className="flex flex-row gap-2 items-center">
								<div className="flex flex-row gap-2 items-center py-2 px-4 bg-[#1d1d1d] rounded-full text-white text-sm cursor-pointer">
									<PiCalendar />
									Add Locktime
								</div>
								<div className="flex flex-row gap-2 items-center py-2 px-4 bg-[#1d1d1d] rounded-full text-white text-sm cursor-pointer">
									<PiBroadcast />
									Broadcast = <span className="text-green-500">ON</span>
								</div>
								<div className="flex flex-row gap-2 items-center py-2 px-4 bg-[#1d1d1d] rounded-full text-white text-sm cursor-pointer">
									<LuCircleDashed />
									Add Locktime
								</div>
							</div>
							<div className="flex flex-row gap-2 items-center py-2 px-4 bg-[#1d1d1d] rounded-full text-white text-sm cursor-pointer">
								<FiPlus />
								Add Recipient
							</div>
						</div>

						<div className="flex flex-col border rounded-xl py-3 px-5 border-[#252525] bg-[#1d1d1d] mb-5">
							<div className="mb-5">Fee</div>
							<div className="flex flex-row items-center bg-[#252525] py-1 px-1 rounded-full mb-3">
								<div
									className={cn(
										'w-1/4 text-center rounded-full cursor-pointer py-1',
										fee === 1 ? 'bg-[#2b2b2b] text-[#69d9b8] font-bold' : '',
									)}
									onClick={() => setFee(1)}
								>
									Low
								</div>
								<div
									className={cn(
										'w-1/4 text-center rounded-full cursor-pointer py-1',
										fee === 2 ? 'bg-[#2b2b2b] text-[#69d9b8] font-bold' : '',
									)}
									onClick={() => setFee(2)}
								>
									Normal
								</div>
								<div
									className={cn(
										'w-1/4 text-center rounded-full cursor-pointer py-1',
										fee === 3 ? 'bg-[#2b2b2b] text-[#69d9b8] font-bold' : '',
									)}
									onClick={() => setFee(3)}
								>
									High
								</div>
								<div
									className={cn(
										'w-1/4 text-center rounded-full cursor-pointer py-1',
										fee === 4 ? 'bg-[#2b2b2b] text-[#69d9b8] font-bold' : '',
									)}
									onClick={() => setFee(4)}
								>
									Custom
								</div>
							</div>
							<div className="text-sm mb-3">
								Estimated tme: <span className="text-white">10 minutes</span>{' '}
								Fee rate: <span className="text-white">2 sat/vB</span>
							</div>
						</div>
					</div>
					<div className="w-1/3">
						<div className="flex flex-col border rounded-xl border-[#252525] bg-[#171717] py-3 px-5">
							<div className="text-white">Total</div>
							<div className="text-sm mb-5">Incl.fee</div>
							<div className="rounded-full bg-[#3b3b3b] py-3 px-5 mr-auto xl:text-md text-xs">
								Connect Trezor to Send
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
