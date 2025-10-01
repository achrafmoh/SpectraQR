import React, { useEffect, useState } from 'react';
import { DataType, FormData, QROptions } from '../types';
import DataInputForm from './DataInputForm';
import CustomizationPanel from './CustomizationPanel';
import QRCodePreview from './QRCodePreview';
import LandingPagePreview from './LandingPagePreview';
import { getQrData } from '../utils/qrUtils';
import { DEFAULT_QR_OPTIONS } from '../constants';

interface MainPanelProps {
    selectedType: DataType;
    formData: FormData;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
    qrOptions: QROptions;
    setQrOptions: React.Dispatch<React.SetStateAction<QROptions>>;
    addToast: (message: string, type: 'success' | 'error' | 'info') => void;
}

const MainPanel: React.FC<MainPanelProps> = ({
    selectedType,
    formData,
    setFormData,
    qrOptions,
    setQrOptions,
    addToast
}) => {
    const [qrData, setQrData] = useState<string>(' ');
    const [isQrLoading, setIsQrLoading] = useState<boolean>(false);
    const [isDataTooLong, setIsDataTooLong] = useState<boolean>(false);

    useEffect(() => {
        // Debounce mechanism
        const handler = setTimeout(() => {
            const generateQrData = async () => {
                if (selectedType === DataType.MULTI_URL) {
                    setIsQrLoading(true);
                    setIsDataTooLong(false);
                    try {
                        const data = await getQrData(selectedType, formData);
                        setQrData(data);
                        addToast('Short link for QR code created!', 'success');
                    } catch (error) {
                        addToast('Could not create short link. Please try again.', 'error');
                        setQrData(' ');
                        setIsDataTooLong(true);
                    } finally {
                        setIsQrLoading(false);
                    }
                } else {
                    // Instantly update for simple types
                    const data = await getQrData(selectedType, formData);
                    setQrData(data);
                    setIsDataTooLong(data.length > 2800); // A generic check for other types
                }
            };
            generateQrData();
        }, 500); // 500ms debounce delay

        return () => {
            clearTimeout(handler);
        };
    }, [selectedType, JSON.stringify(formData), addToast]);

    const handleResetOptions = () => {
        setQrOptions(DEFAULT_QR_OPTIONS);
        addToast('Design has been reset to default.', 'info');
    };

    return (
        <div className="flex-1 grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="xl:col-span-2 flex flex-col gap-8">
                <div className="bg-[var(--bg-panel)] backdrop-blur-lg border border-[var(--border-panel)] rounded-2xl p-6 shadow-2xl">
                    <DataInputForm
                        selectedType={selectedType}
                        formData={formData}
                        setFormData={setFormData}
                        addToast={addToast}
                    />
                </div>
                <div className="bg-[var(--bg-panel)] backdrop-blur-lg border border-[var(--border-panel)] rounded-2xl p-6 shadow-2xl">
                    <CustomizationPanel
                        options={qrOptions}
                        setOptions={setQrOptions}
                        addToast={addToast}
                        onResetOptions={handleResetOptions}
                    />
                </div>
            </div>

            <div className="relative">
                <div className="sticky top-24 space-y-8">
                    <QRCodePreview
                        qrData={qrData}
                        isDataTooLong={isDataTooLong}
                        isLoading={isQrLoading}
                        options={qrOptions}
                        addToast={addToast}
                    />
                    {selectedType === DataType.MULTI_URL && (
                        <LandingPagePreview data={formData[DataType.MULTI_URL]} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default MainPanel;