import React, { useState, useEffect, useCallback } from 'react';
import { QROptions, DotsOptions_Type, CornersSquareOptions_Type, CornersDotOptions_Type, Gradient } from '../types';
import { fileToBase64 } from '../utils/helpers';
import { IconPalette, IconShapes, IconImage, IconSettings, IconRotateCcw } from './Icons';

interface CustomizationPanelProps {
    options: QROptions;
    setOptions: React.Dispatch<React.SetStateAction<QROptions>>;
    addToast: (message: string, type: 'success' | 'error' | 'info') => void;
    onResetOptions: () => void;
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
            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[1000px]' : 'max-h-0'}`}>
                <div className="pb-4 space-y-4">{children}</div>
            </div>
        </div>
    );
};

const ColorControl: React.FC<{
    label: string,
    colorValue?: string,
    gradientValue?: Gradient,
    onColorChange: (color?: string) => void,
    onGradientChange: (gradient?: Gradient) => void
}> = ({ label, colorValue, gradientValue, onColorChange, onGradientChange }) => {
    
    const isGradient = !!gradientValue;
    const [hexValue, setHexValue] = useState(colorValue || '#000000');
    const [isHexValid, setIsHexValid] = useState(true);

    useEffect(() => {
        if(!isGradient && colorValue){
            setHexValue(colorValue);
            setIsHexValid(true); // Reset validation state on prop change
        }
    }, [colorValue, isGradient]);

    const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newHex = e.target.value;
        setHexValue(newHex);
        const isValid = /^#([0-9A-F]{3}){1,2}$/i.test(newHex);
        setIsHexValid(isValid);
        if (isValid) {
            let fullHex = newHex;
            if (newHex.length === 4) { // Expand #rgb to #rrggbb
                fullHex = `#${newHex[1]}${newHex[1]}${newHex[2]}${newHex[2]}${newHex[3]}${newHex[3]}`;
            }
            onColorChange(fullHex);
        }
    };
    
    const handlePickerChange = (color: string) => {
        setHexValue(color);
        setIsHexValid(true);
        onColorChange(color);
    }

    const handleModeToggle = (mode: 'solid' | 'gradient') => {
        if (mode === 'gradient' && !isGradient) {
            onGradientChange({
                type: 'linear',
                rotation: 0.785, // Default to 45 deg
                colorStops: [{ offset: 0, color: colorValue || '#22d3ee' }, { offset: 1, color: '#a855f7' }]
            });
        } else if (mode === 'solid' && isGradient) {
            onColorChange(gradientValue?.colorStops[0]?.color || '#000000');
        }
    }
    
    const getGradientCss = (grad?: Gradient) => {
        if (!grad) return '';
        const angle = grad.type === 'linear' ? `${(grad.rotation || 0)}rad` : 'circle';
        const colors = grad.colorStops.map(stop => stop.color).join(', ');
        return `${grad.type}-gradient(${angle}, ${colors})`;
    }

    return (
        <div className="p-3 bg-black/[.05] dark:bg-white/[.05] rounded-lg">
            <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-medium text-[var(--text-secondary)]">{label}</label>
                <div className="flex items-center text-xs p-0.5 bg-[var(--bg-input)] rounded-md border border-[var(--border-input)]">
                    <button onClick={() => handleModeToggle('solid')} className={`px-2 py-0.5 rounded transition-colors ${!isGradient ? 'bg-sky-500 text-white' : 'text-[var(--text-muted)] hover:bg-black/5 dark:hover:bg-white/5'}`}>Solid</button>
                    <button onClick={() => handleModeToggle('gradient')} className={`px-2 py-0.5 rounded transition-colors ${isGradient ? 'bg-sky-500 text-white' : 'text-[var(--text-muted)] hover:bg-black/5 dark:hover:bg-white/5'}`}>Gradient</button>
                </div>
            </div>
            {isGradient && gradientValue ? (
                <div className="space-y-4">
                    <div 
                        className="h-8 w-full rounded-md border border-slate-300/50 dark:border-slate-600/50"
                        style={{ background: getGradientCss(gradientValue) }}
                        aria-label="Gradient preview"
                    />
                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center gap-2 bg-[var(--bg-input)] border border-[var(--border-input)] rounded-md p-1">
                            <input type="color" value={gradientValue.colorStops[0].color} onChange={(e) => onGradientChange({...gradientValue, colorStops: [{...gradientValue.colorStops[0], color: e.target.value}, gradientValue.colorStops[1]]})} className="w-7 h-7 p-0 border-none rounded cursor-pointer bg-transparent"/>
                            <span className="text-sm font-mono text-[var(--text-muted)]">{gradientValue.colorStops[0].color}</span>
                        </div>
                         <div className="flex items-center gap-2 bg-[var(--bg-input)] border border-[var(--border-input)] rounded-md p-1">
                            <input type="color" value={gradientValue.colorStops[1].color} onChange={(e) => onGradientChange({...gradientValue, colorStops: [gradientValue.colorStops[0], {...gradientValue.colorStops[1], color: e.target.value}]})} className="w-7 h-7 p-0 border-none rounded cursor-pointer bg-transparent"/>
                            <span className="text-sm font-mono text-[var(--text-muted)]">{gradientValue.colorStops[1].color}</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3 items-center">
                        <div className="col-span-2">
                             <StyledSelect label="" id={`${label}-grad-type`} value={gradientValue.type} onChange={e => onGradientChange({...gradientValue, type: e.target.value as 'linear' | 'radial'})}>
                                 <option value="linear">Linear</option>
                                 <option value="radial">Radial</option>
                             </StyledSelect>
                        </div>
                        {gradientValue.type === 'linear' && (
                             <div className="text-center">
                                <label htmlFor={`${label}-rotation`} className="text-xs text-[var(--text-secondary)] block">{Math.round((gradientValue.rotation || 0) * 180 / Math.PI)}°</label>
                            </div>
                        )}
                    </div>
                    {gradientValue.type === 'linear' && (
                         <div>
                            <label htmlFor={`${label}-rotation`} className="sr-only">Rotation</label>
                            <input id={`${label}-rotation`} type="range" min="0" max="6.28" step="0.01" value={gradientValue.rotation} onChange={(e) => onGradientChange({...gradientValue, rotation: parseFloat(e.target.value)})} className="w-full h-2 bg-[var(--range-track)] rounded-lg appearance-none cursor-pointer"/>
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                         <input type="color" value={colorValue || '#000000'} onChange={(e) => handlePickerChange(e.target.value)} className="w-8 h-8 p-0 border-none rounded-md cursor-pointer bg-transparent"/>
                         <div className="relative">
                            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[var(--text-muted)] font-mono">#</span>
                             <input 
                                type="text" 
                                value={hexValue.substring(1)} 
                                onChange={(e) => handleHexChange('#' + e.target.value.replace(/[^0-9a-fA-F]/g, ''))}
                                maxLength={6}
                                className={`w-24 pl-5 pr-2 py-1 bg-transparent border-b ${!isHexValid ? 'border-red-500' : 'border-[var(--border-input)]'} text-sm font-mono text-[var(--text-primary)] focus:outline-none focus:border-sky-500 transition-colors`} 
                            />
                         </div>
                    </div>
                </div>
            )}
        </div>
    )
}


const StyledSelect = ({ label, id, children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement> & { label: string; children: React.ReactNode }) => (
    <div>
        {label && <label htmlFor={id} className="block text-sm font-medium text-[var(--text-secondary)] mb-1">{label}</label>}
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


const CustomizationPanel: React.FC<CustomizationPanelProps> = ({ options, setOptions, addToast, onResetOptions }) => {

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

    const updateOption = (key: keyof QROptions, value: any) => {
        setOptions(prev => ({ ...prev, [key]: { ...(prev[key] as object), ...value } }));
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-[var(--text-title)]">Customize Design</h2>
                <button onClick={onResetOptions} className="flex items-center gap-2 text-xs font-semibold text-[var(--text-muted)] hover:text-sky-500 transition-colors" aria-label="Reset design to default">
                    <IconRotateCcw className="w-4 h-4" />
                    Reset
                </button>
            </div>
            
            <Section title="Colors" icon={IconPalette} defaultOpen={true}>
                 <ColorControl 
                     label="Background"
                     colorValue={options.backgroundOptions?.color}
                     gradientValue={options.backgroundOptions?.gradient}
                     onColorChange={(color) => updateOption('backgroundOptions', { color, gradient: undefined })}
                     onGradientChange={(gradient) => updateOption('backgroundOptions', { gradient, color: undefined })}
                 />
                 <ColorControl 
                     label="Dots"
                     colorValue={options.dotsOptions?.color}
                     gradientValue={options.dotsOptions?.gradient}
                     onColorChange={(color) => updateOption('dotsOptions', { color, gradient: undefined })}
                     onGradientChange={(gradient) => updateOption('dotsOptions', { gradient, color: undefined })}
                 />
                 <ColorControl 
                     label="Corner Squares"
                     colorValue={options.cornersSquareOptions?.color}
                     gradientValue={options.cornersSquareOptions?.gradient}
                     onColorChange={(color) => updateOption('cornersSquareOptions', { color, gradient: undefined })}
                     onGradientChange={(gradient) => updateOption('cornersSquareOptions', { gradient, color: undefined })}
                 />
                 <ColorControl 
                     label="Corner Dots"
                     colorValue={options.cornersDotOptions?.color}
                     gradientValue={options.cornersDotOptions?.gradient}
                     onColorChange={(color) => updateOption('cornersDotOptions', { color, gradient: undefined })}
                     onGradientChange={(gradient) => updateOption('cornersDotOptions', { gradient, color: undefined })}
                 />
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