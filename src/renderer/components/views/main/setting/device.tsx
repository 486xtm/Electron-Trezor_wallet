import { cn } from '@/lib/utils';
import React, { useState } from 'react';
import { useTheme } from '@/renderer/context/theme-context';
import { IoWalletOutline } from 'react-icons/io5';
import { GoArrowUpRight } from 'react-icons/go';
import { PROTOCOL } from '@/config/config';
export const Device = () => {
	const { theme } = useTheme();
	return (
		<div className="flex flex-col">
      <div className="border rounded-xl border-[#252525] bg-[#1d1d1d] p-5 mb-10 flex flex-row gap-3 font-bold text-white xl:text-md  text-sm items-center">
        <img src={`${PROTOCOL}://Trezor/brush.png`} className='rounded-full' alt = "brush" />
        Connect & unlock your Trezor to change settings
      </div>
			<div className="flex flex-row items-start  mb-5">
				<div className="flex flex-row items-center gap-3 w-1/4 text-xl text-white">
					<IoWalletOutline />
					Wallet backup
				</div>
				<div className="border rounded-xl border-[#252525] bg-[#1d1d1d] p-3 flex-1">
					<div className="flex flex-row border-b pb-5 border-[#252525] mb-5 items-center">
						<div className="w-3/5">
							<div className="text-white mb-3">Backup</div>
							<div className="flex justify-between items-center text-xs mb-3">
								A wallet backup is a series of randomly generated words created
								by your Trezor. It's important to write down your wallet backup
								and keep it safe, as it's the only way to recover and access
								your funds.
							</div>
							<div className="flex gap-2 items-center w-[130px] justify-center bg-[#252525] text-sm rounded-full py-1 px-2 text-white">
								Learn more <GoArrowUpRight />
							</div>
						</div>
						<div className="flex-1 flex justify-end">
							<div className="bg-[#252525] rounded-full py-2 px-5 text-sm">
								Backup successful
							</div>
						</div>
					</div>
					<div className="flex flex-row border-b pb-5 border-[#252525] mb-5 items-center">
						<div className="w-3/5">
							<div className="text-white mb-3">Multi-share Backup</div>
							<div className="flex justify-between items-center text-xs mb-3">
								Generates multiple 20-word shares (wordlists) to recover your
								wallet. A minimum number of shares, set by you, are needed to
								regain access to your wallet.
							</div>
							<div className="flex gap-2 items-center w-[130px] justify-center bg-[#252525] text-sm rounded-full py-1 px-2 text-white">
								Learn more <GoArrowUpRight />
							</div>
						</div>
						<div className="flex-1 flex justify-end">
							<div className="bg-[#252525] rounded-full py-2 px-3 text-sm">
								Create Multi-share Backup
							</div>
						</div>
					</div>
					<div className="flex flex-row pb-5  items-center">
						<div className="w-3/5">
							<div className="text-white mb-3">Check wallet backup</div>
							<div className="flex justify-between items-center text-xs mb-3">
								Perform a simulated recovery to verify your wallet backup
							</div>
							<div className="flex gap-2 items-center w-[130px] justify-center bg-[#252525] text-sm rounded-full py-1 px-2 text-white">
								Learn more <GoArrowUpRight />
							</div>
						</div>
						<div className="flex-1 flex justify-end">
							<div className="bg-[#252525] rounded-full py-2 px-3 text-sm">
								Check wllet backup
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
