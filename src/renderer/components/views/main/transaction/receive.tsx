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
export const Receive = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const { theme } = useTheme();
	const coinInfo = location.state;
	const [maxToogle, setMaxToggle] = useState(false);
	const [fee, setFee] = useState(1);
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

        <div className='border rounded-xl border-[#252525] bg-[#1d1d1d] py-3 px-5 flex flex-row items-center justify-between'>
          <div className='flex flex-col'>
            <div className='text-sm'>Fresh address</div>
            <div className='text-white text-[50px]'>bc1q56ll3jc3ze</div>
          </div>
        </div>
				
			</div>
		</div>
	);
};
