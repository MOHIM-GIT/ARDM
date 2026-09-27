import React, { createContext, useContext, useEffect, useState } from 'react';

export type ColorMode = 'white' | 'black';

interface ThemeContextType {
  colorMode: ColorMode;
  toggleColorMode: () => void;
  setColorMode: (mode: ColorMode) => void;
  isBlack: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [colorMode, setColorModeState] = useState<ColorMode>(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('ardm_color_theme', 'black');
    }
    return 'black';
  });

  const applyTheme = (mode: ColorMode = 'black') => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    const body = document.body;

    root.classList.add('dark', 'theme-black');
    body.classList.add('dark', 'theme-black');
    root.setAttribute('data-theme', 'dark');
    root.style.colorScheme = 'dark';
  };

  useEffect(() => {
    applyTheme('black');
  }, [colorMode]);

  const setColorMode = (mode: ColorMode) => {
    setColorModeState(mode);
    if (typeof window !== 'undefined') {
      localStorage.setItem('ardm_color_theme', mode);
    }
    applyTheme(mode);
  };

  const toggleColorMode = () => {
    // Retain black theme
    setColorMode('black');
  };

  return (
    <ThemeContext.Provider
      value={{
        colorMode,
        toggleColorMode,
        setColorMode,
        isBlack: true,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
