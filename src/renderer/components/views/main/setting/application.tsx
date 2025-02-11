import { cn } from '@/lib/utils';
import React, { useState } from 'react';
import { useTheme } from '@/renderer/context/theme-context';
import { FiFlag } from 'react-icons/fi';
import { GoTag } from 'react-icons/go';
import { SiTorbrowser } from 'react-icons/si';
import { GoArrowUpRight } from 'react-icons/go';
export const Application = () => {
	const { theme } = useTheme();
	const [toogle, setToggle] = useState<boolean>(true);
	const [toogleTor, setToggleTor] = useState<boolean>(false);
	return (
		<div className="flex flex-col">
			<div className="flex flex-row items-start text-white  mb-5">
				<div className="flex flex-row items-center gap-3 w-1/4 text-xl">
					<FiFlag />
					Localization
				</div>
				<div className="border rounded-xl border-[#252525] bg-[#1d1d1d] px-5 flex-1">
					<div className="flex items-center justify-between border-b border-[#252525] py-5">
						<span>Language</span>
						<select className="bg-[#252525] text-sm rounded-lg outline-none w-[150px] p-2">
							<option selected>System</option>
							<option value="US">Ethereum</option>
							<option value="CA">Tron</option>
							<option value="FR">Solana</option>
						</select>
					</div>

					<div className="flex items-center justify-between border-b border-[#252525] py-5">
						<span>Fiat currency</span>
						<select className="bg-[#252525] text-sm rounded-lg outline-none w-[150px] p-2">
							<option selected>USD</option>
							<option value="US">USDT</option>
						</select>
					</div>

					<div className="flex items-center justify-between py-5">
						<span>Bitcoin units</span>
						<select className="bg-[#252525] text-sm rounded-lg outline-none w-[150px] p-2">
							<option selected>Bitcoin</option>
							<option value="US">Ethereum</option>
							<option value="CA">Tron</option>
							<option value="FR">Solana</option>
						</select>
					</div>
				</div>
			</div>

			<div className="flex flex-row items-start  mb-5">
				<div className="flex flex-row items-center gap-3 w-1/4 text-xl text-white">
					<GoTag />
					Labeling
				</div>
				<div className="border rounded-xl border-[#252525] bg-[#1d1d1d] p-3 flex-1">
					<div className="flex flex-row border-b pb-5 border-[#252525] mb-5 items-center">
						<div className="w-3/5">
							<div className="text-white mb-3">Labeling</div>
							<div className="flex justify-between items-center text-xs mb-3">
								Rename your wallets, accounts, and addresses, Labels are applied
								by syncing with Dropbox or Google Drive
							</div>
							<div className="flex gap-2 items-center w-[130px] justify-center bg-[#252525] text-sm rounded-full py-1 px-2 text-white">
								Learn more <GoArrowUpRight />
							</div>
						</div>
						<div className="flex-1 flex justify-end">
							<div
								className={cn(
									'bg-[#0d3025] rounded-full w-[48px] h-[25px] flex items-center px-1 transition-all duration-200 cursor-pointer',
									toogle ? 'pl-[25px]' : 'bg-[#2b2b2b]',
								)}
								onClick={() => setToggle(!toogle)}
							>
								<div className="rounded-full w-[20px] h-[20px] bg-gray-400"></div>
							</div>
						</div>
					</div>

					<div className="flex flex-row items-center justify-between">
						<div className="w-3/5">
							<div className="text-white mb-3">Labels not synced</div>
							<div className="flex justify-between items-center text-xs mb-3">
								To make your labels consistent and available on different
								devices, connect to a cloud storage provider
							</div>
						</div>
						<div className="flex-1 justify-end flex">
							<div className="bg-[#252525] rounded-full py-2 px-10 text-sm">
								Connect
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="flex flex-row items-start  mb-5">
				<div className="flex flex-row items-center gap-3 w-1/4 text-xl text-white">
					<SiTorbrowser />
					Tor
				</div>
				<div className="border rounded-xl border-[#252525] bg-[#1d1d1d] p-3 flex-1">

        <div className="flex flex-row mb-5 items-center">
						<div className="w-3/5">
							<div className="text-white mb-3">Tor</div>
							<div className="flex justify-between items-center text-xs mb-3">
								Route all of Trezor Suite's traffic through the Tor network, increasing your privacy and security, It may take some time for Tor to load and establish a connection
							</div>
							<div className="flex gap-2 items-center w-[130px] justify-center bg-[#252525] text-sm rounded-full py-1 px-2 text-white">
								Learn more <GoArrowUpRight />
							</div>
						</div>
						<div className="flex-1 flex justify-end">
							<div
								className={cn(
									'bg-[#0d3025] rounded-full w-[48px] h-[25px] flex items-center px-1 transition-all duration-200 cursor-pointer',
									toogleTor ? 'pl-[25px]' : 'bg-[#2b2b2b]',
								)}
								onClick={() => setToggleTor(!toogleTor)}
							>
								<div className="rounded-full w-[20px] h-[20px] bg-gray-400"></div>
							</div>
						</div>
					</div>
        </div>
			</div>
		</div>
	);
};
