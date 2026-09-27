import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface ThemeToggleProps {
  variant?: 'compact' | 'full' | 'floating';
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = () => {
  // White button removed per request; theme remains black
  return null;
};
