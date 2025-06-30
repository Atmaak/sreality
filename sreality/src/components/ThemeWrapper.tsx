'use client';

import { useTheme } from '@/contexts/ThemeContext';

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  
  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-gray-900 text-white' 
        : 'bg-sky-100 text-gray-900'
    }`}>
      {children}
    </div>
  );
}
