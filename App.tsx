import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { DataType, FormData, QROptions, ToastState, MultiUrlData } from './types';
// fix: Corrected typo in imported constant name from DATA_type_OPTIONS to DATA_TYPE_OPTIONS. This fixes both compilation errors.
import { DATA_TYPE_OPTIONS, DEFAULT_QR_OPTIONS } from './constants';
import { generateShortId } from './utils/helpers';
import Header from './components/Header';
import Toolbar from './components/Toolbar';
import MainPanel from './components/MainPanel';
import Toast from './components/Toast';
import { IconLink, BrandIcon } from './components/Icons';

declare const pako: any;

// Decodes a base64, pako-compressed string from the URL hash
const decodePayload = (encoded: string): MultiUrlData | null => {
    try {
        const decoded_b64 = atob(encoded.replace(/-/g, '+').replace(/_/g, '/'));
        const inflated = pako.inflate(decoded_b64, { to: 'string' });
        const data = JSON.parse(inflated);

        // Basic validation
        if (typeof data === 'object' && data !== null && Array.isArray(data.links)) {
            return {
                title: data.title || '',
                description: data.description || '',
                links: data.links.map((link: any) => ({
                    id: generateShortId(), // ID is only for client-side rendering
                    title: link.title || '',
                    url: link.url || ''
                }))
            };
        }
        return null;
    } catch (error) {
        console.error("Failed to decode payload:", error);
        return null;
    }
};

// Parses the URL hash to find a compressed payload (prefixed with #H-)
const parseHash = (): { type: 'H'; data: MultiUrlData | null } | null => {
    const hash = window.location.hash;
    if (!hash || !hash.startsWith('#H-')) return null;
    try {
        const encoded = hash.substring(3);
        const data = decodePayload(encoded);
        return { type: 'H', data };
    } catch (error) {
        console.error("Failed to parse hash:", error);
        return null;
    }
};

// Viewer for Multi-Link content, rendered when a valid hash is present
const MultiLinkViewer: React.FC<{ data: MultiUrlData }> = ({ data }) => {
     useEffect(() => {
        document.title = data.title || "Links";
    }, [data.title]);
    return (
        <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)] transition-colors duration-300 flex items-center justify-center p-4">
            <main className="max-w-md w-full bg-[var(--bg-panel)] backdrop-blur-lg border border-[var(--border-panel)] rounded-2xl p-6 shadow-2xl">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-[var(--text-title)] break-words">{data.title || 'My Links'}</h1>
                    {data.description && <p className="text-md text-[var(--text-secondary)] mt-2 break-words">{data.description}</p>}
                </div>
                <div className="space-y-4">
                    {data.links.map((link, index) => (
                        <a
                            key={index}
                            href={link.url.includes('://') ? link.url : `//${link.url}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center p-4 bg-[var(--bg-input)] hover:bg-[var(--bg-panel-hover)] border border-[var(--border-input)] rounded-lg shadow-sm transition-all duration-200"
                        >
                            <div className="flex-shrink-0 w-10 h-10 bg-sky-100 dark:bg-sky-900/50 rounded-full flex items-center justify-center mr-4">
                                <IconLink className="w-5 h-5 text-sky-500" />
                            </div>
                            <span className="font-semibold text-[var(--text-primary)] break-all">{link.title || 'My Link'}</span>
                        </a>
                    ))}
                </div>
                 <div className="text-center mt-8">
                    <a href={window.location.origin + window.location.pathname} className="flex items-center justify-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
                        <BrandIcon className="w-5 h-5 text-sky-500"/>
                        Powered by SpectraQR
                    </a>
                </div>
            </main>
        </div>
    );
};


const App: React.FC = () => {
    // Check for a viewer hash on initial load
    const viewerPayload = useMemo(() => parseHash(), []);
    
    const [theme, setTheme] = useState<'dark' | 'light'>(
      () => document.documentElement.classList.contains('dark') ? 'dark' : 'light'
    );

    const [selectedType, setSelectedType] = useState<DataType>(DataType.URL);
    const [formData, setFormData] = useState<FormData>({
        [DataType.URL]: 'https://github.com/kozakdenys/qr-code-styling',
        [DataType.EMAIL]: { email: 'test@example.com', subject: 'Hello', body: 'This is a test email.' },
        [DataType.PHONE]: '+11234567890',
        [DataType.SMS]: { phone: '+11234567890', message: 'Hello from QR code!' },
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

    // If a valid Multi-Link payload was found in the hash, render the viewer page.
    if (viewerPayload && viewerPayload.type === 'H' && viewerPayload.data) {
        return <MultiLinkViewer data={viewerPayload.data} />;
    }
    
    // If the hash was present but data could not be parsed, show an error.
    if (viewerPayload && (viewerPayload.type === 'H' && !viewerPayload.data)) {
        return (
            <div className="min-h-screen bg-[var(--bg-page)] flex items-center justify-center text-center p-4">
                 <main className="max-w-md w-full bg-[var(--bg-panel)] backdrop-blur-lg border border-[var(--border-panel)] rounded-2xl p-8 shadow-2xl">
                    <h1 className="text-2xl font-bold text-red-500">Invalid Link</h1>
                    <p className="text-[var(--text-secondary)] mt-2">The QR code link is corrupted or invalid. Please try scanning again.</p>
                    <a href={window.location.origin + window.location.pathname} className="mt-6 inline-flex items-center justify-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
                        <BrandIcon className="w-5 h-5 text-sky-500"/>
                        Create your own SpectraQR
                    </a>
                 </main>
            </div>
        );
    }

    // Otherwise, render the main QR code generator app.
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