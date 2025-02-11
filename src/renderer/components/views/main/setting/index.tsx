import { cn } from '@/lib/utils';
import React, { useState } from 'react';
import { useTheme } from '@/renderer/context/theme-context';
import { Application } from './application';
import { Device } from './device';
import { Coins } from './coins';

export const Settings = () => {
	const { theme } = useTheme();
	const [settingTab, setSettingTab] = useState(1);
	return (
		<div className="flex flex-col h-screen">
			<div className="flex flex-row justify-between py-2 px-4 border-b border-[#212121] mb-3">
				<div
					className={cn(
						'text-[30px]',
						theme === 'dark' ? 'text-white' : 'text-black',
					)}
				>
					Settings
				</div>
			</div>
			<div className="ml-1 pt-4 pb-10 flex flex-col flex-1 overflow-y-scroll">
				<div className="text-sm font-medium text-center border-b border-[#212121] mb-5">
					<ul className="flex flex-wrap -mb-px text-gray-200 ml-5">
						<li className="me-2 cursor-pointer">
							<a
								className={cn(
									'inline-block px-2 pb-2 border-b-2 rounded-t-l',
									settingTab === 1 ? '' : 'border-transparent',
								)}
								onClick={() => setSettingTab(1)}
							>
								Application
							</a>
						</li>
						<li className="me-2 cursor-pointer">
							<a
								className={cn(
									'inline-block px-2 pb-2 border-b-2 rounded-t-lg',
									settingTab === 2 ? '' : 'border-transparent',
								)}
								onClick={() => setSettingTab(2)}
							>
								Device
							</a>
						</li>
						<li className="me-2 cursor-pointer">
							<a
								className={cn(
									'inline-block px-2 pb-2 border-b-2 rounded-t-lg',
									settingTab === 3 ? '' : 'border-transparent',
								)}
								onClick={() => setSettingTab(3)}
							>
								Coins
							</a>
						</li>
					</ul>
				</div>
			<div className='px-7'>
				{settingTab === 1 && <Application/>}
				{settingTab === 2 && <Device/>}
				{settingTab === 3 && <Coins/>}
			</div>

			</div>
		</div>
	);
};
