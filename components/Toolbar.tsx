import React, { useState, useEffect, useRef } from 'react';
import { DataType, DataTypeOption } from '../types';

interface ToolbarProps {
    options: DataTypeOption[];
    selectedType: DataType;
    onSelectType: (type: DataType) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ options, selectedType, onSelectType }) => {
    const [indicatorStyle, setIndicatorStyle] = useState({});
    const containerRef = useRef<HTMLDivElement>(null);
    const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

    const updateIndicator = () => {
        const selectedIndex = options.findIndex(opt => opt.id === selectedType);
        const selectedButton = buttonRefs.current[selectedIndex];
        
        if (selectedButton && containerRef.current) {
            const isVertical = window.innerWidth >= 1024; // Tailwind's 'lg' breakpoint
            
            if (isVertical) {
                 setIndicatorStyle({
                    top: `${selectedButton.offsetTop}px`,
                    height: `${selectedButton.offsetHeight}px`,
                    left: '0px',
                    width: '100%'
                });
            } else {
                 setIndicatorStyle({
                    left: `${selectedButton.offsetLeft}px`,
                    width: `${selectedButton.offsetWidth}px`,
                    top: '0px',
                    height: '100%'
                });
            }
        }
    };

    useEffect(() => {
        updateIndicator();
        window.addEventListener('resize', updateIndicator);
        return () => window.removeEventListener('resize', updateIndicator);
    }, [selectedType, options]);

    return (
        <div className="bg-[var(--bg-panel)] backdrop-blur-lg border border-[var(--border-panel)] rounded-2xl p-3 shadow-2xl">
            <div ref={containerRef} className="relative flex lg:flex-col items-center justify-around lg:justify-start gap-2">
                <div 
                    className="absolute bg-sky-100 dark:bg-slate-700 rounded-lg transition-all duration-300 ease-in-out"
                    style={indicatorStyle}
                    aria-hidden="true"
                />
                
                {options.map((option, index) => (
                    <button
                        ref={el => buttonRefs.current[index] = el}
                        key={option.id}
                        onClick={() => onSelectType(option.id)}
                        className="relative flex flex-col items-center justify-center w-16 h-16 rounded-lg transition-colors duration-300 group focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-panel)] focus-visible:ring-sky-500"
                        title={option.label}
                        aria-label={option.label}
                    >
                        <option.icon className={`h-6 w-6 mb-1 transition-colors duration-300 ${
                            selectedType === option.id ? 'text-sky-500' : 'text-[var(--icon-color)] group-hover:text-sky-500'
                        }`} />
                        <span className={`text-xs font-semibold transition-colors duration-300 ${
                            selectedType === option.id ? 'text-sky-600 dark:text-sky-400' : 'text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]'
                        }`}>{option.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Toolbar;