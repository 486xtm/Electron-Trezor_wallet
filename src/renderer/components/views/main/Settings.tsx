import { cn } from '@/lib/utils';
import React, { useState } from 'react';
import { useTheme } from '@/renderer/context/theme-context';

export const Settings = () => {
	const { theme } = useTheme();

	return (
		<div>
			Settings
		</div>
	);
};
