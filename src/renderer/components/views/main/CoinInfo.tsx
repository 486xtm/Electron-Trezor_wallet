import { cn } from '@/lib/utils';
import React, { useState } from 'react';
import { useTheme } from '@/renderer/context/theme-context';
import { useLocation, useParams } from 'react-router-dom';
import { Header } from '../../header/header';
import { IoIosMore, IoMdTrendingDown } from 'react-icons/io';
import { LuSearch } from 'react-icons/lu';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa6';

export const CoinInfo = () => {
	const { theme } = useTheme();
	const param = useParams();
	const location = useLocation();
	const coinInfo = location.state;
	const [coinTab, setCoinTab] = useState(1);
	return (
		<div className="flex flex-col h-screen">
			<Header title={coinInfo.name} />
			<div className="px-5 pt-4 pb-10 flex flex-col flex-1 overflow-y-scroll">
				<div className="flex gap-2 items-center">
					<img src={coinInfo.img} className="rounded-full w-[18px] h-[18px]" />
					<span>
						{coinInfo.amount} {coinInfo.symbol}
					</span>
				</div>
				<div className="mb-5">
					<span className="text-white text-[40px]">$0</span>
					<span>.00</span>
				</div>
				<div className="text-sm font-medium text-center border-b border-[#212121] mb-5">
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
						<div className="border rounded-xl border-[#252525] bg-[#1d1d1d] p-3 mb-5"></div>
						<div className="flex gap-4 text-sm mb-5">
							<div className="border h-full rounded-xl border-[#252525] bg-[#1d1d1d] p-3 w-1/3">
								<span className="text-xs">ALL</span>
								<br />
								<br />
								<span className="text-gray-200">105 transactions</span>
								<br />
								<span className="text-xs">
									August 28, 2024 - February 5, 2025
								</span>
							</div>
							<div className="border h-full rounded-xl border-[#252525] bg-[#1d1d1d] p-3 w-1/3">
								<span className="text-xs">INCOMING</span>
								<br />
								<br />
								<span className="text-gray-200">
									<span className="text-green-300">+</span> 58.27611455608199935{' '}
									{coinInfo.symbol}
								</span>
								<br />
								<span className="text-xs ml-3">$186,806.55</span>
							</div>
							<div className="border h-full rounded-xl border-[#252525] bg-[#1d1d1d] p-3 w-1/3">
								<span className="text-xs">OUTGOING</span>
								<br />
								<br />
								<span className="text-gray-200">
									<span className="text-red-300">-</span> 58.27611455608199935{' '}
									{coinInfo.symbol}
								</span>
								<br />
								<span className="text-xs ml-2">$186,806.55</span>
							</div>
						</div>
						<div className="flex items-center text-white text-xl mb-5">
							Trade
						</div>
						<div className="border h-[100px] rounded-xl border-[#252525] bg-[#1d1d1d] p-3 flex justify-between items-center mb-10">
							<div className="px-4 flex flex-row items-center text-sm xl:w-1/4 w-1/2">
								<div className="w-1/3 flex items-center gap-2">
									<img src={coinInfo.img} className="rounded-full w-[30px]" />
									<div>
										<span className="text-white font-bold">
											{coinInfo.name.split(' #1')}
										</span>
										<br />
										{coinInfo.symbol}
									</div>
								</div>
								<div className="w-1/3 pl-5">
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
							<div className='flex flex-row gap-2'>
								<div className="bg-[#1d1d1d] rounded-full py-2 flex items-center px-2 cursor-pointer text-white">
									<LuSearch />
								</div>
								<div className="bg-[#1d1d1d] rounded-full py-2 flex items-center px-2 cursor-pointer">
									<IoIosMore />
								</div>
							</div>
						</div>

            <div className='flex flex-row justify-between text-sm mb-5'>
              <span>February 6, 2025</span>
              <span>+$25,818.59</span>
            </div>

						<div className="border rounded-xl border-[#252525] bg-[#1d1d1d] px-3 py-4 mb-2 flex flex-row items-center justify-between">
              <div className='flex flex-row items-center gap-4'>
                <FaArrowDown className='text-xl' />
                <div>
                  <span className='text-gray-200'>Received {coinInfo.symbol}</span><br/>
                  <span className='text-sm'>21:35 bc1qk5ce5423e7h34xexgk54l6a6lmsdjx6pnkyd</span>
                </div>
              </div>
              <div className='text-right mr-2'>
                <span className='text-green-400'>+</span> <span className='text-gray-200'>0.33879329 {coinInfo.symbol}</span><br/>
                <span className='text-sm'>$33,018.50</span>
              </div>
            </div>

            <div className="border rounded-xl border-[#252525] bg-[#1d1d1d] px-3 py-4 mb-2 flex flex-row items-center justify-between">
              <div className='flex flex-row items-center gap-4'>
                <FaArrowUp className='text-xl' />
                <div>
                  <span className='text-gray-200'>Sent {coinInfo.symbol}</span><br/>
                  <span className='text-sm'>15:37 bc1qk5ce5423e7h34xexgk54l6a6lmsdjx6pnkyd</span><br/><br/>
                  <span className='text-sm ml-10'>Fee</span>
                </div>
              </div>
              <div className='text-right mr-2'>
                <span className='text-green-400'>+</span> <span className='text-gray-200'>0.07402653 {coinInfo.symbol}</span><br/>
                <span className='text-sm'>$7,175.31</span><br/><br/>
                <span className='text-sm '>-0.0002538 {coinInfo.symbol}</span><br/>
                <span className='text-sm '>$24.6</span>
              </div>
            </div>

					</>
				)}
			</div>
		</div>
	);
};
