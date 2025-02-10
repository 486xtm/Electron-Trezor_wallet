import { PROTOCOL } from '@/config/config';

export const Loading = () => {
	return (
		<div className="relative flex items-center justify-center w-[100px] h-[100px]">
			<img
				src={`${PROTOCOL}://Trezor/load.png`}
				alt="Loading Indicator"
				className="absolute w-full h-full object-contain transition-transform animate-rotate"
			/>
		</div>
	);
};
