import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react';
import { ArrowUp, PurePlus, ArrowDown, DocumentEdit } from '../../images/Icons';
import { useTheme } from '@/renderer/context/theme-context';
import { useGlobalContext } from '@/renderer/context/global-context';
import { timeAgo } from '@/renderer/lib/utls';
import { FaAngleDown, FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
export const Transactions = () => {
	const { settings } = useGlobalContext();
	const [transactions, setTransactions] = useState(settings.transactions);
	const [optionVisible, setOptionVisible] = useState(false);
	const [detailsOpens, setDetailsOpens] = useState<boolean[]>(
		transactions.map(() => false),
	);
	useEffect(() => {
		setTransactions(settings.transactions);
		setDetailsOpens([...detailsOpens, false]);
	}, [settings.transactions]);
	const { theme } = useTheme();

	return (
		<div
			className={
				cn(
					`transition-transform duration-1000 ease-in-out transform w-full h-full py-10 flex flex-col`,
					theme === 'dark' ? 'text-gray-300' : 'text-black',
				) /*${isVisible ? 'ml-0' : '-ml-[100%]'}*/
			}
			// ref={ref}
		>
			<div className='flex justify-between px-10'>
				<p className="text-2xl my-4">Transactions</p>
				<div className='text-sm flex items-center gap-2 mt-3'>Sort & filter <FaAngleDown/> </div>
			</div>
			{transactions.length !== 0 && (
				<div className="mb-3 flex justify-between text-xs px-10">
					<span>{transactions.length} transactions total, showing {transactions.length}.</span>
					<div className="flex items-center">
						Page: 1/1 &nbsp;
						<span className="text-gray-500">
							<FaAngleLeft />
						</span>{' '}
						<FaAngleRight />{' '}
					</div>
				</div>
			)}
			{transactions.length === 0 ? (
				<>
					<span className="text-sm px-10">No transaction history yet.</span>
				</>
			) : (
				<div
					className={cn(
						'border-t text-sm',
						theme === 'dark' ? ' border-gray-700' : ' border-gray-300',
					)}
				>
					{transactions.map((tran, index) => (
						<div
							className={cn(
								'w-full flex flex-col border-b gap-2',
								theme === 'dark' ? 'border-gray-700' : 'border-gray-300',
								detailsOpens[index] ? theme === 'dark' ? 'bg-[#1b1b1b]' : 'bg-gray-200' : ''
							)}
							key={`transaction-${index}`}
						>
							<div className={cn('flex w-full py-2')}>
								<div className={cn('w-[7%] flex items-center justify-center')}>
									<div
										className={cn(
											'w-[10px] h-[10px] rounded-full',
											tran.type === 'Sent' ? 'bg-orange-500' : 'bg-green-500',
										)}
									></div>
								</div>
								<div className={cn('w-[33%]')}>
									<span>{tran.type}</span>
									<br />
									<span>{tran.amount} XMR</span>
								</div>
								<div className={cn('w-[35%]')}>
									<span>{tran.type === 'Sent' ? 'To' : 'In'}</span>
									<br />
									<span>
										{tran.address.slice(0, 8)}...{tran.address.slice(-8)}
									</span>
								</div>
								<div className={cn('w-[20%]')}>
									<span>Date</span>
									<br />
									<span>{timeAgo(tran.date)}</span>
								</div>
								<div className={cn('w-[5%] flex items-center justify-center')}>
									<div
										className={cn(
											'cursor-pointer transition-transform duration-200',
											detailsOpens[index] && 'rotate-180',
										)}
										onClick={() =>
											setDetailsOpens([
												...detailsOpens.map((open, i) =>
													i === index ? !open : open,
												),
											])
										}
									>
										<ArrowDown />
									</div>
								</div>
							</div>
							{detailsOpens[index] && (
								<div className="flex flex-col gap-2 mb-2">
									<div className={cn('flex w-full')}>
										<div className={cn('w-[40%] pl-[7%]')}>
											<span>Fee</span>
											<br />
											<span>{tran.fee} XMR</span>
										</div>
										<div className={cn('w-[35%]')}>
											<span>Confirmation</span>
											<br />
											<span>{tran.confirmNumber}</span>
										</div>
										<div className={cn('w-[25%] flex gap-2 items-center')}>
											<div className="font-[900] text-xl w-[30px] h-[30px] flex items-center justify-center text-white rounded-sm bg-orange-500">
												i
											</div>
											{tran.type === 'Sent' && (
												<div className="font-[900] w-[30px] h-[30px] flex items-center justify-center rounded-sm bg-orange-500">
													<div className="w-[20px] h-[20px] bg-white rounded-full text-orange-500 flex items-center justify-center">
														P
													</div>
												</div>
											)}
										</div>
									</div>
									<div className={cn('pl-[7%]')}>
										<span>Description</span>
										<div className="flex items-center gap-2">
											-
											<DocumentEdit
												bg={theme === 'dark' ? 'bg-gray-200' : 'black'}
											/>
										</div>
									</div>
									<div className={cn('pl-[7%]')}>
										<span>Transaction ID</span>
										<div>{tran.tranID}</div>
									</div>
									<div className={cn('pl-[7%]')}>
										<span>Transaction key</span>
										<div>Click to reveal</div>
									</div>
									<div className={cn('pl-[7%]')}>
										<span>Blockheight</span>
										<div>{tran.block}</div>
									</div>
								</div>
							)}
						</div>
					))}
				</div>
			)}
			<div className="flex flex-col pb-10 px-10">
				<div className="flex mt-12 gap-2 items-center">
					<span className="text-sm">Advanced options</span>
					<div
						className={cn(
							'cursor-pointer transition-transform duration-200',
							optionVisible && 'rotate-180',
						)}
						onClick={() => setOptionVisible(!optionVisible)}
					>
						<ArrowDown />
					</div>
				</div>
				{optionVisible && (
					<>
						<div className="flex gap-3 mr-auto my-3">
							<div className="cursor-pointer rounded border border-gray-400 p-1 mr-auto">
								<PurePlus color={theme === 'dark' ? '#e5e7eb' : 'black'} />
							</div>
							<span className="text-sm">Human readable data format</span>
						</div>

						<div
							className={cn(
								'mr-auto flex gap-2 text-white text-xs px-3 py-2 font-bold rounded cursor-pointer transition-colors duration-200',
								'bg-orange-500 hover:bg-orange-600',
							)}
						>
							Export all history
						</div>
					</>
				)}
			</div>
		</div>
	);
};
