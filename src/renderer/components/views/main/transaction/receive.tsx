import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/renderer/context/theme-context';
import { cn } from '@/lib/utils';
import { IoIosArrowBack, IoIosMore } from 'react-icons/io';
export const Receive = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const { theme } = useTheme();
	const coinInfo = location.state;
	return (
		<div className="flex flex-col h-screen">
			<div className="flex flex-row justify-between py-1 px-4 border-b border-[#212121] mb-3">
				<div className={cn('flex flex-row gap-3 items-center')}>
					<div
						className="p-3 hover:bg-[#252525] rounded-full cursor-pointer"
						onClick={() =>
							navigate(`${location.pathname.split('/receive')}`, {
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
								{coinInfo.amount} {coinInfo.symbol} ≈ $0
							</span>
						</div>
					</div>
				</div>
			</div>
			<div className=" px-5 pb-10 flex flex-col flex-1 overflow-y-scroll">
				<div className="text-white text-[30px] mb-5 flex flex-row items-center justify-between">
					Receive
				</div>

				<div className="border rounded-xl border-[#252525] bg-[#1d1d1d] py-3 px-5 flex flex-row items-center justify-between mb-5">
					<div className="flex flex-col">
						<div className="text-sm">Fresh address</div>
						<div
							className="text-white text-[40px]"
							style={{
								WebkitMaskImage:
									'linear-gradient(to right, black 10%, transparent)',
							}}
						>
							bc1q56ll3jc3ze
						</div>
					</div>
					<div className="text-black bg-[#d3ac4c] rounded-full py-3 px-5 cursor-pointer">
						Generate unverified address
					</div>
				</div>

				<div className="border rounded-xl border-[#252525] bg-[#1d1d1d] py-3 mb-5">
					<div className="flex flex-row items-center justify-between px-5  pb-3">
						<span>Address</span>
						<span>Total received</span>
					</div>
					{[{address: "bc1qk15ce54n23e7", amount: "0.33879329"},
            {address: "bc1qk15ce54n23e7", amount: "0.45723939"},
            {address: "bc1qk15ce54n23e7", amount: "0.83618746"},
            {address: "bc1qk15ce54n23e7", amount: "2.95014624"},
            {address: "bc1qk15ce54n23e7", amount: "0.33879329"},
            {address: "bc1qk15ce54n23e7", amount: "0.33879329"},
            {address: "bc1qk15ce54n23e7", amount: "0.33879329"},
            {address: "bc1qk15ce54n23e7", amount: "0.33879329"},
            {address: "bc1qk15ce54n23e7", amount: "0.33879329"},
          ].map((val, index) => (
						<div className="flex flex-row items-center justify-between px-5 py-3 border-[#252525] border-t text-white">
							<div
								style={{
									WebkitMaskImage:
										'linear-gradient(to right, black 10%, transparent)',
								}}
							>
								{val.address}
							</div>
							<div>{val.amount} {coinInfo.symbol}</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
