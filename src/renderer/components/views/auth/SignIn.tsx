import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loading } from '../../common/Loading';
import { cn } from '@/lib/utils';
import { useTheme } from '@/renderer/context/theme-context';

export const SignIn = () => {
	const [visible, setVisible] = useState(true);
	const [isLoading, setIsLoading] = useState(true);
	const { theme } = useTheme();
	const navigate = useNavigate();

	useEffect(() => {
		if (!isLoading) return;
		const timer = setTimeout(() => {
			setIsLoading(false); // Ensure loading state is reset
			navigate('/main/home');
		}, 500);

		// Cleanup timeout on unmount
		return () => clearTimeout(timer);
	}, [isLoading, navigate]);

	return (
		<div className="h-full w-full flex justify-center items-center">
			<div className="flex flex-col gap-2">
				{!isLoading ? (
					<>
						<p className={cn(theme === 'light' ? 'text-black' : 'text-white')}>
							Please enter wallet password for: Administrator
						</p>
						<div className="flex gap-1 w-[400px] border border-gray-200 p-2 rounded items-center">
							<input
								className={cn(
									'outline-none flex-1',
									theme === 'light' ? 'text-black' : 'text-white',
								)}
								style={{ lineHeight: '16px' }}
								type={visible ? 'password' : 'text'}
							/>
							<div onClick={() => setVisible(!visible)}>
							</div>
						</div>
						<div className="flex gap-3 ml-auto">
							<div className="bg-gray-200 text-gray-500 text-sm px-2 py-1 rounded cursor-pointer hover:bg-gray-300 transition-colors duration-200">
								Cancel
							</div>
							<div
								className="bg-orange-500 text-white text-sm px-2 py-1 rounded cursor-pointer hover:bg-orange-600 transition-colors duration-200"
								onClick={() => setIsLoading(true)}
							>
								Ok
							</div>
						</div>
					</>
				) : (
					<Loading />
				)}
			</div>
		</div>
	);
};
