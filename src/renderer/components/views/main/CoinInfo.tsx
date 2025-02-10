import { cn } from '@/lib/utils';
import React, { useState } from 'react';
import { useTheme } from '@/renderer/context/theme-context';
import { useLocation } from 'react-router-dom';

export const CoinInfo = () => {
  const { theme } = useTheme();
  const location = useLocation();
  return (
    <>
      {location.pathname}
    </>
  );
};
