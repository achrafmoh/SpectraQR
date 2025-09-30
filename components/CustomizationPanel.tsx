import React, { useState } from 'react';
import { QROptions, DotsOptions_Type, CornersSquareOptions_Type, CornersDotOptions_Type } from '../types';
import { fileToBase64 } from '../utils/helpers';
import { IconPalette, IconShapes, IconImage, IconSettings } from './Icons';

interface CustomizationPanelProps {
    options: QROptions;
    setOptions: React.Dispatch<React.SetStateAction<QROptions>>;
    addToast: (message: string, type: 'success' | 'error' | 'info') => void;
}

const Section: React.FC<{ title: string; icon: React.FC<React.SVGProps<SVGSVGElement>>; children: React.ReactNode; defaultOpen?: boolean }> = ({ title, icon: Icon, children, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    return (
        <div className="border-t border-[var(--border-panel)]">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center text-left py-4">
                <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-sky-500" />
                    <h4 className="font-semibold text-[var(--text-secondary)]">{title}</h4>
                </div>
                 <svg className={`w-5 h-5 transition-transform text-slate-400 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
                <div className="pb-4 space-y-4">{children}</div>
            </div>
        </div>
    );
};


const ColorInput: React.FC<{ label: string; value: string; onChange: (color: string) => void }> = ({ label, value, onChange }) => (
    <div className="flex items-center justify-between">
        <label className="text-sm text-[var(--text-secondary)]">{label}</label>
        <div className="flex items-center gap-2">
             <span className="text-sm font-mono text-[var(--text-muted)]">{value}</span>
             <input type="color" value={value} onChange={(e) => onChange(e.target.value)} className="w-8 h-8 p-0 border-none rounded-md cursor-pointer bg-transparent" style={{backgroundColor: 'transparent'}}/>
        </div>
    </div>
);

const StyledSelect = ({ label, id, children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement> & { label: string; children: React.ReactNode }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-[var(--text-secondary)] mb-1">{label}</label>
        <select
            id={id}
            className="w-full px-3 py-2 bg-[var(--bg-input)] border border-[var(--border-input)] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition appearance-none text-[var(--text-primary)]"
             style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2364748b' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: 'right 0.5rem center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '1.5em 1.5em',
                paddingRight: '2.5rem',
            }}
            {...props}
        >
            {children}
        </select>
    </div>
);


const CustomizationPanel: React.FC<CustomizationPanelProps> = ({ options, setOptions, addToast }) => {

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 1024 * 1024) { // 1MB limit
                addToast('Image size should be less than 1MB.', 'error');
                return;
            }
            try {
                const base64 = await fileToBase64(file);
                setOptions(prev => ({ ...prev, image: base64 }));
                addToast('Image uploaded successfully.', 'success');
            } catch (error) {
                addToast('Failed to upload image.', 'error');
                console.error(error);
            }
        }
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4 text-[var(--text-title)]">Customize Design</h2>
            
            <Section title="Colors" icon={IconPalette} defaultOpen={true}>
                 <ColorInput label="Background" value={options.backgroundOptions?.color || '#ffffff'} onChange={color => setOptions(prev => ({...prev, backgroundOptions: {...prev.backgroundOptions, color}}))} />
                 <ColorInput label="Dots" value={options.dotsOptions?.color || '#000000'} onChange={color => setOptions(prev => ({...prev, dotsOptions: {...prev.dotsOptions, color, gradient: undefined}}))} />
                 <ColorInput label="Corner Squares" value={options.cornersSquareOptions?.color || '#000000'} onChange={color => setOptions(prev => ({...prev, cornersSquareOptions: {...prev.cornersSquareOptions, color, gradient: undefined}}))} />
                 <ColorInput label="Corner Dots" value={options.cornersDotOptions?.color || '#000000'} onChange={color => setOptions(prev => ({...prev, cornersDotOptions: {...prev.cornersDotOptions, color, gradient: undefined}}))} />
            </Section>

            <Section title="Shapes & Styles" icon={IconShapes}>
                <StyledSelect 
                    label="Dots Style" 
                    id="dots-style" 
                    value={options.dotsOptions?.type} 
                    onChange={e => setOptions(prev => ({...prev, dotsOptions: {...prev.dotsOptions, type: e.target.value as DotsOptions_Type}}))}
                >
                    <option value="square">Square</option>
                    <option value="dots">Dots</option>
                    <option value="rounded">Rounded</option>
                    <option value="extra-rounded">Extra Rounded</option>
                    <option value="classy">Classy</option>
                    <option value="classy-rounded">Classy Rounded</option>
                </StyledSelect>
                 <StyledSelect 
                    label="Corner Square Style" 
                    id="corner-square-style" 
                    value={options.cornersSquareOptions?.type} 
                    onChange={e => setOptions(prev => ({...prev, cornersSquareOptions: {...prev.cornersSquareOptions, type: e.target.value as CornersSquareOptions_Type}}))}
                >
                    <option value="square">Square</option>
                    <option value="dot">Dot</option>
                    <option value="extra-rounded">Extra Rounded</option>
                </StyledSelect>
                 <StyledSelect 
                    label="Corner Dot Style" 
                    id="corner-dot-style" 
                    value={options.cornersDotOptions?.type} 
                    onChange={e => setOptions(prev => ({...prev, cornersDotOptions: {...prev.cornersDotOptions, type: e.target.value as CornersDotOptions_Type}}))}
                >
                    <option value="square">Square</option>
                    <option value="dot">Dot</option>
                </StyledSelect>
            </Section>

             <Section title="Logo Image" icon={IconImage}>
                 <div className="flex flex-col gap-2">
                    <label htmlFor="logo-upload" className="text-sm font-medium text-[var(--text-secondary)]">Upload Logo</label>
                    <input type="file" id="logo-upload" accept="image/png, image/jpeg, image/svg+xml" onChange={handleImageUpload} className="text-sm text-[var(--text-secondary)] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100 dark:file:bg-sky-900/50 dark:file:text-sky-300 dark:hover:file:bg-sky-900"/>
                    {options.image && (
                         <div className="flex items-center justify-between mt-2">
                            <img src={options.image} alt="Logo preview" className="w-10 h-10 rounded-md object-contain bg-slate-200"/>
                            <button onClick={() => setOptions(prev => ({...prev, image: ''}))} className="text-sm text-red-500 hover:underline">Remove</button>
                        </div>
                    )}
                 </div>
                 <div>
                    <label htmlFor="margin" className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Image Margin ({options.imageOptions?.margin})</label>
                    <input type="range" id="margin" min="0" max="40" value={options.imageOptions?.margin} onChange={e => setOptions(prev => ({...prev, imageOptions: { ...prev.imageOptions, margin: parseInt(e.target.value)}}))} className="w-full h-2 bg-[var(--range-track)] rounded-lg appearance-none cursor-pointer"/>
                </div>
            </Section>

             <Section title="Advanced" icon={IconSettings}>
                <div>
                    <label htmlFor="qr-margin" className="block text-sm font-medium text-[var(--text-secondary)] mb-1">QR Margin ({options.margin})</label>
                    <input type="range" id="qr-margin" min="0" max="40" value={options.margin} onChange={e => setOptions(prev => ({...prev, margin: parseInt(e.target.value)}))} className="w-full h-2 bg-[var(--range-track)] rounded-lg appearance-none cursor-pointer"/>
                </div>
                 <StyledSelect 
                    label="Error Correction" 
                    id="error-correction" 
                    value={options.qrOptions?.errorCorrectionLevel} 
                    onChange={e => setOptions(prev => ({...prev, qrOptions: {...prev.qrOptions, errorCorrectionLevel: e.target.value as 'L' | 'M' | 'Q' | 'H'}}))}
                >
                    <option value="L">Low (L)</option>
                    <option value="M">Medium (M)</option>
                    <option value="Q">Quartile (Q)</option>
                    <option value="H">High (H)</option>
                </StyledSelect>
            </Section>

        </div>
    );
};

export default CustomizationPanel;