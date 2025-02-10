
export const formatBalance = (
	num: number,
	totalLength: number = 13,
	type = 'XMR',
) => {
	if (type != 'XMR') {
		return num.toFixed(2);
	}
	// Convert the number to a string
	let numStr = (num || 0).toString();
	// Split the number into integer and decimal parts
	let [integerPart, decimalPart] = numStr.split('.');

	// If there's no decimal part, set it to an empty string
	decimalPart = decimalPart ? decimalPart : '';

	// Calculate the current length of the formatted number
	let currentLength =
		integerPart.length + decimalPart.length + (decimalPart ? 1 : 0); // +1 for the decimal point

	// If the current length is less than totalLength, add trailing zeros
	while (currentLength < totalLength) {
		if (decimalPart.length < 6) {
			// Limit decimal places to 6
			decimalPart += '0'; // Append a trailing zero
		} else {
			break; // Stop if we reach the maximum decimal places
		}
		currentLength++;
	}

	// Reconstruct the number string
	const formattedNumber =
		integerPart + (decimalPart.length > 0 ? '.' + decimalPart : '');

	// Pad the integer part if needed (to ensure total length)
	const paddedNumber = formattedNumber.padStart(totalLength, ' '); // Pad with spaces if necessary
	return formattedNumber;
};

export const generateWalletAddress = () => {
	const hexChars = '0123456789abcdef';
	let address = '0x';
	for (let i = 0; i < 40; i++) {
		address += hexChars[Math.floor(Math.random() * 16)];
	}
	return address;
};
export const generateTransactionID = () => {
	const hexChars = '0123456789abcdef';
	let id = '';
	for (let i = 0; i < 64; i++) {
		id += hexChars[Math.floor(Math.random() * 16)];
	}
	return id;
};
export const generateConfirmNum = () => {
	const hexChars = '123456789';
	let num = '';
	for (let i = 0; i < 5; i++) {
		num += hexChars[Math.floor(Math.random() * 9)];
	}
	return num;
};
export const generateBlockNum = () => {
	const hexChars = '123456789';
	let num = '';
	for (let i = 0; i < 7; i++) {
		num += hexChars[Math.floor(Math.random() * 9)];
	}
	return num;
};
export const timeAgo = (date: string | Date): string => {
	const now = new Date();
	const past = new Date(date);
	const diff = Math.floor((now.getTime() - past.getTime()) / 1000); // Difference in seconds

	if (diff < 60) {
		return `${diff} second(s) ago`;
	} else if (diff < 3600) {
		return `${Math.floor(diff / 60)} minute(s) ago`;
	} else if (diff < 86400) {
		return `${Math.floor(diff / 3600)} hour(s) ago`;
	} else if (diff < 172800) {
		// Less than 2 days
		return `Yesterday`;
	} else if (diff < 31536000) {
		// Less than 1 year
		return `${Math.floor(diff / 86400)} day(s) ago`;
	} else {
		return `${Math.floor(diff / 31536000)} year(s) ago`;
	}
};
function getRandomBytes(size: number): Uint8Array {
	const bytes = new Uint8Array(size);
	window.crypto.getRandomValues(bytes);
	return bytes;
}

function bytesToHex(bytes: Uint8Array): string {
	return Array.from(bytes)
			.map(byte => ('0' + byte.toString(16)).slice(-2))
			.join('');
}

export const createMoneroAddress = (): string => {
	// Step 1: Generate random keys
	const privateSpendKey = getRandomBytes(32);
	const privateViewKey = getRandomBytes(32);

	// Step 2: Derive public keys (simplified, not actual derivation)
	const publicSpendKey = privateSpendKey; // Placeholder for actual derivation
	const publicViewKey = privateViewKey; // Placeholder for actual derivation

	// Step 3: Create the wallet address
	const address = bytesToHex(publicSpendKey) + bytesToHex(publicViewKey);
	return address;
}
