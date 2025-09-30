import React, { useState, useEffect, useCallback } from 'react';
import { DataType, FormData, QROptions, ToastState } from './types';
import { DATA_TYPE_OPTIONS, DEFAULT_QR_OPTIONS } from './constants';
import { generateShortId } from './utils/helpers';
import Header from './components/Header';
import Toolbar from './components/Toolbar';
import MainPanel from './components/MainPanel';
import Toast from './components/Toast';

const App: React.FC = () => {
    // This logic is correct. It initializes state from the DOM and uses an effect to sync changes.
    // The change to CSS variables happens in the styling layer (index.html and component classNames).
    const [theme, setTheme] = useState<'dark' | 'light'>(
      () => document.documentElement.classList.contains('dark') ? 'dark' : 'light'
    );

    const [selectedType, setSelectedType] = useState<DataType>(DataType.URL);
    const [formData, setFormData] = useState<FormData>({
        [DataType.URL]: 'https://github.com/kozakdenys/qr-code-styling',
        [DataType.TEXT]: 'Welcome to Pixelink!',
        [DataType.EMAIL]: { email: 'test@example.com', subject: 'Hello', body: 'This is a test email.' },
        [DataType.PHONE]: '+11234567890',
        [DataType.SMS]: { phone: '+11234567890', message: 'Hello from QR code!' },
        [DataType.WIFI]: { ssid: 'MyWiFi', encryption: 'WPA', password: 'password123', hidden: false },
        [DataType.MULTI_URL]: {
            title: 'My Links',
            description: 'Check out my links below!',
            links: [
                { id: generateShortId(), title: 'GitHub', url: 'https://github.com' },
                { id: generateShortId(), title: 'React Docs', url: 'https://react.dev' }
            ]
        }
    });
    const [qrOptions, setQrOptions] = useState<QROptions>(DEFAULT_QR_OPTIONS);
    const [toasts, setToasts] = useState<ToastState[]>([]);

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.theme = 'light';
        }
    }, [theme]);

    const toggleTheme = useCallback(() => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    }, []);

    const addToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'info') => {
        const id = Date.now();
        setToasts(prevToasts => [...prevToasts, { id, message, type }]);
        setTimeout(() => {
            removeToast(id);
        }, 5000);
    }, []);

    const removeToast = (id: number) => {
        setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
    };


    return (
        <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)] transition-colors duration-300">
            <Header toggleTheme={toggleTheme} currentTheme={theme} />
            <main className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    <Toolbar options={DATA_TYPE_OPTIONS} selectedType={selectedType} onSelectType={setSelectedType} />
                    <MainPanel
                        selectedType={selectedType}
                        formData={formData}
                        setFormData={setFormData}
                        qrOptions={qrOptions}
                        setQrOptions={setQrOptions}
                        addToast={addToast}
                    />
                </div>
            </main>
            <div aria-live="assertive" className="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start z-50">
                <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
                    {toasts.map(toast => (
                        <Toast
                            key={toast.id}
                            message={toast.message}
                            type={toast.type}
                            onDismiss={() => removeToast(toast.id)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default App;