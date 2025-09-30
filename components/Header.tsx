import React from 'react';
import { BrandIcon, IconSun, IconMoon } from './Icons';

interface HeaderProps {
    toggleTheme: () => void;
    currentTheme: 'dark' | 'light';
}

const Header: React.FC<HeaderProps> = ({ toggleTheme, currentTheme }) => {
    return (
        <header className="bg-[var(--bg-header)] backdrop-blur-lg border-b border-[var(--border-header)] sticky top-0 z-50 transition-colors">
            <div className="container mx-auto px-4 py-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                         <BrandIcon className="w-9 h-9" />
                         <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
                            <span className="bg-gradient-to-r from-cyan-400 via-sky-500 to-purple-500 text-transparent bg-clip-text">
                                SpectraQR
                            </span>
                        </h1>
                    </div>
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full text-[var(--icon-color)] hover:bg-[var(--bg-header-hover)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-100 dark:focus-visible:ring-offset-slate-900 focus-visible:ring-sky-500 transition-all duration-300"
                        aria-label="Toggle theme"
                    >
                        {currentTheme === 'dark' ? (
                            <IconSun className="w-6 h-6 text-[var(--icon-theme-sun)]" />
                        ) : (
                            <IconMoon className="w-6 h-6 text-[var(--icon-theme-moon)]" />
                        )}
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;