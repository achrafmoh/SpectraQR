

import React, { useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { DataType, FormData, QROptions } from '../types';

interface QRCodePreviewProps {
    data: FormData;
    selectedType: DataType;
    options: QROptions;
    addToast: (message: string, type: 'success' | 'error' | 'info') => void;
}

const getQrData = (type: DataType, formData: FormData): string => {
    switch (type) {
        case DataType.URL:
            return formData[DataType.URL];
        case DataType.TEXT:
            return formData[DataType.TEXT];
        case DataType.EMAIL: {
            const { email, subject, body } = formData[DataType.EMAIL];
            return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        }
        case DataType.PHONE:
            return `tel:${formData[DataType.PHONE]}`;
        case DataType.SMS: {
            const { phone, message } = formData[DataType.SMS];
            return `sms:${phone}?body=${encodeURIComponent(message)}`;
        }
        case DataType.WIFI: {
            const { ssid, password, encryption, hidden } = formData[DataType.WIFI];
            return `WIFI:T:${encryption};S:${ssid};P:${password || ''};H:${!!hidden};`;
        }
        case DataType.MULTI_URL:
            return 'https://example.com/multi-link-page';
        default:
            return '';
    }
}


const QRCodePreview: React.FC<QRCodePreviewProps> = ({ data, selectedType, options, addToast }) => {
    const ref = useRef<HTMLDivElement>(null);
    const qrCode = useRef<QRCodeStyling>();

    const qrData = getQrData(selectedType, data);

    // This avoids potential issues like stale closures from using two separate effects.
    useEffect(() => {
        if (!ref.current) {
            return;
        }

        if (!qrCode.current) {
            qrCode.current = new QRCodeStyling({
                ...options,
                data: qrData,
            });
            qrCode.current.append(ref.current);
        } else {
            qrCode.current.update({
                ...options,
                data: qrData,
            });
        }
    }, [options, qrData]);


    const handleDownload = (extension: 'svg' | 'png' | 'jpeg') => {
        if (qrCode.current) {
            // fix: The 'download' method in qr-code-styling was called without the required options object. This provides the extension to specify the download format.
            qrCode.current.download({ extension });
            addToast(`QR Code downloaded as ${extension.toUpperCase()}`, 'success');
        } else {
            addToast('Could not download QR Code.', 'error');
        }
    };


    return (
        <div className="bg-[var(--bg-panel)] backdrop-blur-lg border border-[var(--border-panel)] rounded-2xl p-6 shadow-2xl flex flex-col items-center gap-6">
            <h3 className="text-xl font-bold text-[var(--text-title)]">Preview</h3>
            <div ref={ref} className="overflow-hidden rounded-lg" />
            <div className="flex gap-4">
                <button onClick={() => handleDownload('png')} className="px-4 py-2 bg-sky-500 text-white font-semibold rounded-lg hover:bg-sky-600 transition shadow-md">Download PNG</button>
                <button onClick={() => handleDownload('svg')} className="px-4 py-2 bg-slate-600 text-white font-semibold rounded-lg hover:bg-slate-700 transition shadow-md">Download SVG</button>
            </div>
        </div>
    );
};

export default QRCodePreview;