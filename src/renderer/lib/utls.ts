function generateRandomHex(length: number) {
	const chars = 'abcdef0123456789';
	let result = '';
	for (let i = 0; i < length; i++) {
		result += chars[Math.floor(Math.random() * chars.length)];
	}
	return result;
}

export function generateWalletAddress(symbol: string) {
	switch (symbol) {
		case 'BTC':
			return `b${generateRandomHex(33)}`; // Bitcoin (Legacy)
		case 'ETH':
		case 'POL':
		case 'BCH':
			return `0x${generateRandomHex(40)}`; // Ethereum-based (EVM)
		case 'SOL':
			return generateRandomHex(44); // Solana (Base58-like)
		case 'ADA':
			return `addr1${generateRandomHex(50)}`; // Cardano
		case 'XRP':
			return `${generateRandomHex(33)}`; // XRP (Ripple)
		case 'DOGE':
			return `${generateRandomHex(33)}`; // Dogecoin
		default:
			return `0x${generateRandomHex(40)}`; // Default (EVM style)
	}
}

export function formatDate(isoDate: string) {
	const dateObj = new Date(isoDate);
	return new Intl.DateTimeFormat('en-US', {
		month: 'long',
		day: 'numeric',
		year: 'numeric',
	}).format(dateObj);
}

// Function to format time (HH:MM, 24-hour format)
function formatTime(isoDate: string) {
	const dateObj = new Date(isoDate);
	return dateObj.toLocaleTimeString('en-US', {
		hour: '2-digit',
		minute: '2-digit',
		hour12: false,
	});
}

// Function to group transactions by formatted date
export function groupByFormattedDate(transactions: any[], price:number) {
	return transactions.reduce((acc, tx) => {
		const formattedDate = formatDate(tx.date); // Convert to "February 6, 2025"
		const totalPrice = tx.amount * (price || 0); // Calculate total price for each transaction

		if (!acc[formattedDate]) {
			acc[formattedDate] = { transactions: [], totalPrice: 0 };
		}

		acc[formattedDate].transactions.push({
			...tx,
			time: formatTime(tx.date), // HH:MM
			totalPrice,
		});

		acc[formattedDate].totalPrice += totalPrice; // Sum total price for the date

		return acc;
	}, {});
}


export function generateChartData(value: number) {
	const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	let data = [];
	let currentDate = new Date();
	
	for (let i = 5; i >= 0; i--) {
			let date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
			let month = months[date.getMonth()];
			let year = date.getFullYear();
			
			data.push({
					date: `${month} ${year}`,
					// received: i === 0 ? 0 : (Math.random() * value).toFixed(3),
					// sent: i === 0 ? 0 : (Math.random() * value).toFixed(3)
					received: 0,
					sent: 0,
			});
	}
	
	return data;
}
