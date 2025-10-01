import React, { useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { QROptions } from '../types';

interface QRCodePreviewProps {
    qrData: string;
    isDataTooLong: boolean;
    options: QROptions;
    addToast: (message: string, type: 'success' | 'error' | 'info') => void;
    isLoading: boolean;
}

const QRCodePreview: React.FC<QRCodePreviewProps> = ({ qrData, isDataTooLong, isLoading, options, addToast }) => {
    const ref = useRef<HTMLDivElement>(null);
    const qrCode = useRef<QRCodeStyling>();

    useEffect(() => {
        if (isDataTooLong && !isLoading) {
            addToast('Content is too long or could not be processed. Please shorten it.', 'error');
        }
    }, [isDataTooLong, isLoading, addToast]);

    useEffect(() => {
        if (isLoading || isDataTooLong) {
            if (ref.current) {
                ref.current.innerHTML = '';
            }
            qrCode.current = undefined;
            return;
        }

        if (!ref.current) {
            return;
        }

        const qrInstance = new QRCodeStyling({
            ...options,
            data: qrData || ' ', 
        });

        ref.current.innerHTML = '';
        qrInstance.append(ref.current);
        qrCode.current = qrInstance;

    }, [qrData, isDataTooLong, isLoading, options]);


    const handleDownload = (extension: 'svg' | 'png' | 'jpeg') => {
        if (isDataTooLong || isLoading) {
            addToast('Cannot download: QR code is not ready.', 'error');
            return;
        }
        if (qrCode.current) {
            qrCode.current.download({ extension });
            addToast(`QR Code downloaded as ${extension.toUpperCase()}`, 'success');
        } else {
            addToast('Could not download QR Code.', 'error');
        }
    };


    return (
        <div className="bg-[var(--bg-panel)] backdrop-blur-lg border border-[var(--border-panel)] rounded-2xl p-6 shadow-2xl flex flex-col items-center gap-6">
            <h3 className="text-xl font-bold text-[var(--text-title)]">Preview</h3>
            <div className="w-[300px] h-[300px] flex items-center justify-center rounded-lg bg-[var(--bg-input)]">
                {isLoading ? (
                     <div className="flex flex-col items-center gap-4 text-center text-[var(--text-secondary)]">
                        <svg className="animate-spin h-10 w-10 text-sky-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <p className="text-sm font-medium">Generating short link...</p>
                    </div>
                ) : isDataTooLong ? (
                    <div className="text-center text-red-500 p-4 bg-red-500/10 rounded-lg w-full mx-4" aria-live="polite">
                        <p className="font-semibold">Error Generating QR</p>
                        <p className="text-sm">Could not generate QR code. Please try again or shorten content.</p>
                    </div>
                ) : (
                    <div ref={ref} className="overflow-hidden rounded-lg" />
                )}
            </div>
            <div className="flex gap-4">
                <button 
                    onClick={() => handleDownload('png')} 
                    disabled={isDataTooLong || isLoading} 
                    className="px-4 py-2 bg-sky-500 text-white font-semibold rounded-lg hover:bg-sky-600 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Download PNG
                </button>
                <button 
                    onClick={() => handleDownload('svg')} 
                    disabled={isDataTooLong || isLoading} 
                    className="px-4 py-2 bg-slate-600 text-white font-semibold rounded-lg hover:bg-slate-700 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Download SVG
                </button>
            </div>
        </div>
    );
};

export default QRCodePreview;