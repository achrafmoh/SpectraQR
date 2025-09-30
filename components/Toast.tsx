import React, { useState, useEffect } from 'react';
import { ToastState } from '../types';

interface ToastProps extends Omit<ToastState, 'id'> {
    onDismiss: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onDismiss }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(true);
        // This component doesn't auto-dismiss, relies on App component's timer
    }, []);

    const baseClasses = "max-w-sm w-full bg-[var(--bg-toast)] shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden transition-all duration-300 ease-in-out";
    
    // Using a simpler animation logic based on parent state removal
    const visibleClasses = "translate-x-0 opacity-100";
    
    const typeClasses = {
        success: 'border-l-4 border-green-500',
        error: 'border-l-4 border-red-500',
        info: 'border-l-4 border-sky-500',
    };

    const Icon = () => {
        switch (type) {
            case 'success':
                return <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
            case 'error':
                 return <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
            case 'info':
                return <svg className="h-6 w-6 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
        }
    }

    return (
        <div className={`${baseClasses} ${visibleClasses} ${typeClasses[type]}`}>
            <div className="p-4">
                <div className="flex items-start">
                    <div className="flex-shrink-0">
                        <Icon />
                    </div>
                    <div className="ml-3 w-0 flex-1 pt-0.5">
                        <p className="text-sm font-medium text-[var(--text-primary)]">{message}</p>
                    </div>
                    <div className="ml-4 flex-shrink-0 flex">
                        <button onClick={onDismiss} className="inline-flex text-[var(--text-muted)] hover:text-[var(--text-secondary)] focus:outline-none">
                            <span className="sr-only">Close</span>
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Toast;