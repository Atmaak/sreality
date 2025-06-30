'use client';

import { useTheme } from '@/contexts/ThemeContext';

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={`sticky top-0 z-50 border-b transition-colors duration-300 ${ theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-sky-200 border-gray-200' }`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <a href="/"><h1 className="text-2xl">S<sub>reality</sub> A<sub>pi <sup>by</sup></sub> K<sub>ubjak</sub></h1></a>
        <button
          onClick={toggleTheme}
          className={`transition-colors duration-300 cursor-pointer`}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  );
}