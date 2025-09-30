import React from 'react';
import { DataType, DataTypeOption } from '../types';

interface ToolbarProps {
    options: DataTypeOption[];
    selectedType: DataType;
    onSelectType: (type: DataType) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ options, selectedType, onSelectType }) => {
    return (
        <div className="bg-[var(--bg-panel)] backdrop-blur-lg border border-[var(--border-panel)] rounded-2xl p-3 shadow-2xl">
            <div className="flex lg:flex-col items-center justify-around lg:justify-start gap-2">
                {options.map((option) => (
                    <button
                        key={option.id}
                        onClick={() => onSelectType(option.id)}
                        className={`flex flex-col items-center justify-center w-16 h-16 rounded-lg transition-all duration-300 group focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-panel)] focus-visible:ring-sky-500 ${
                            selectedType === option.id
                                ? 'bg-sky-100 dark:bg-slate-700'
                                : 'hover:bg-[var(--bg-panel-hover)]'
                        }`}
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