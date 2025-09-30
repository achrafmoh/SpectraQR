import React from 'react';
import { DataType, FormData, QROptions } from '../types';
import DataInputForm from './DataInputForm';
import CustomizationPanel from './CustomizationPanel';
import QRCodePreview from './QRCodePreview';
import LandingPagePreview from './LandingPagePreview';

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
                    />
                </div>
            </div>

            <div className="relative">
                <div className="sticky top-24">
                     {selectedType === DataType.MULTI_URL ? (
                        <LandingPagePreview
                            data={formData[DataType.MULTI_URL]}
                        />
                    ) : (
                        <QRCodePreview
                            data={formData}
                            selectedType={selectedType}
                            options={qrOptions}
                            addToast={addToast}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default MainPanel;