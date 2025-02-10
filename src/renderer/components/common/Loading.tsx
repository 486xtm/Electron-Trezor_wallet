import { PROTOCOL } from '@/config/config';

export const Loading = () => {
	return (
		<div className="relative flex items-center justify-center w-[100px] h-[100px]">
			<img
				src={`${PROTOCOL}://busy-indicator2x.png`}
				alt="Loading Indicator"
				className="absolute w-full h-full object-contain transition-transform animate-rotate"
			/>
			<img
				src={`${PROTOCOL}://moneroIcon-28x282x.png`}
				alt="Monero Icon"
				className="absolute w-20 h-20" // Adjust size as needed
			/>
		</div>
	);
};
