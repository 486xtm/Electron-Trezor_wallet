import { cn } from '@/lib/utils';
import React, { useState } from 'react';
import { useTheme } from '@/renderer/context/theme-context';
import { PROTOCOL } from '@/config/config';

export const Coins = () => {
	const { theme } = useTheme();
	return (
		<div className="flex flex-col">
			<div className="border rounded-xl border-[#252525] bg-[#1d1d1d] p-5 mb-10 flex flex-row gap-3 font-bold text-white xl:text-md  text-sm items-center">
				<img
					src={`${PROTOCOL}://Trezor/brush.png`}
					className="rounded-full"
					alt="brush"
				/>
				Connect & unlock your Trezor to change settings
			</div>
		</div>
	);
};
