import React from 'react';
import { DataType, FormData, LinkData } from '../types';
import { generateShortId } from '../utils/helpers';
// fix: Import IconPhone
import { IconCopy, IconTrash, IconLink, IconAtSign, IconHash, IconUser, IconPhone } from './Icons';

interface DataInputFormProps {
    selectedType: DataType;
    formData: FormData;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
    addToast: (message: string, type: 'success' | 'error' | 'info') => void;
}

const InputField = ({ label, id, icon: Icon, onCopy, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string; icon?: React.FC<React.SVGProps<SVGSVGElement>>; onCopy?: () => void; }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-[var(--text-secondary)] mb-1">{label}</label>
        <div className="relative">
            {Icon && <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Icon className="h-5 w-5 text-[var(--icon-color-input)]" />
            </div>}
            <input
                id={id}
                className={`w-full px-3 py-2 bg-[var(--bg-input)] border border-[var(--border-input)] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition text-[var(--text-primary)] ${Icon ? 'pl-10' : ''} ${onCopy ? 'pr-10' : ''}`}
                {...props}
            />
            {onCopy && <button onClick={onCopy} className="absolute inset-y-0 right-0 flex items-center pr-3 group" aria-label="Copy">
                <IconCopy className="h-5 w-5 text-[var(--icon-color-input)] group-hover:text-sky-500 transition" />
            </button>}
        </div>
    </div>
);

const TextAreaField = ({ label, id, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) => (
     <div>
        <label htmlFor={id} className="block text-sm font-medium text-[var(--text-secondary)] mb-1">{label}</label>
        <textarea
            id={id}
            rows={4}
            className="w-full px-3 py-2 bg-[var(--bg-input)] border border-[var(--border-input)] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition text-[var(--text-primary)]"
            {...props}
        />
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

const DataInputForm: React.FC<DataInputFormProps> = ({ selectedType, formData, setFormData, addToast }) => {

    const handleChange = (field: string, value: any) => {
        setFormData(prev => ({
            ...prev,
            [selectedType]: {
                ...(prev[selectedType] as object),
                [field]: value
            }
        }));
    };
    
    const handleSimpleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
         setFormData(prev => ({
            ...prev,
            [selectedType]: e.target.value
        }));
    };

    const handleCopyToClipboard = (text: string, type: string) => {
        navigator.clipboard.writeText(text).then(() => {
            addToast(`${type} copied to clipboard!`, 'success');
        }, () => {
            addToast(`Failed to copy ${type}.`, 'error');
        });
    }

    const handleMultiUrlLinkChange = (index: number, field: keyof LinkData, value: string) => {
        const newLinks = [...formData[DataType.MULTI_URL].links];
        newLinks[index] = { ...newLinks[index], [field]: value };
        handleChange('links', newLinks);
    };

    const addLink = () => {
        const newLinks = [...formData[DataType.MULTI_URL].links, {id: generateShortId(), title: '', url: ''}];
        handleChange('links', newLinks);
    };

    const removeLink = (index: number) => {
        const newLinks = formData[DataType.MULTI_URL].links.filter((_, i) => i !== index);
        handleChange('links', newLinks);
    };


    const renderForm = () => {
        switch (selectedType) {
            case DataType.URL:
                return <InputField label="Your URL" id="url" type="url" value={formData[DataType.URL]} onChange={handleSimpleChange} placeholder="https://example.com" icon={IconLink} onCopy={() => handleCopyToClipboard(formData[DataType.URL], 'URL')} />;
            case DataType.TEXT:
                return <TextAreaField label="Your Text" id="text" value={formData[DataType.TEXT]} onChange={handleSimpleChange} placeholder="Enter any text" />;
            case DataType.EMAIL:
                return (
                    <div className="space-y-4">
                        <InputField label="Email Address" id="email" type="email" value={formData[DataType.EMAIL].email} onChange={(e) => handleChange('email', e.target.value)} icon={IconAtSign} />
                        <InputField label="Subject" id="subject" type="text" value={formData[DataType.EMAIL].subject} onChange={(e) => handleChange('subject', e.target.value)} />
                        <TextAreaField label="Body" id="body" value={formData[DataType.EMAIL].body} onChange={(e) => handleChange('body', e.target.value)} />
                    </div>
                );
            case DataType.PHONE:
                return <InputField label="Phone Number" id="phone" type="tel" value={formData[DataType.PHONE]} onChange={handleSimpleChange} icon={IconPhone} />;
            case DataType.SMS:
                 return (
                    <div className="space-y-4">
                        <InputField label="Phone Number" id="sms-phone" type="tel" value={formData[DataType.SMS].phone} onChange={(e) => handleChange('phone', e.target.value)} icon={IconPhone} />
                        <TextAreaField label="Message" id="sms-message" value={formData[DataType.SMS].message} onChange={(e) => handleChange('message', e.target.value)} />
                    </div>
                );
            case DataType.WIFI:
                return (
                     <div className="space-y-4">
                        <InputField label="Network SSID" id="wifi-ssid" type="text" value={formData[DataType.WIFI].ssid} onChange={(e) => handleChange('ssid', e.target.value)} icon={IconUser} />
                        <InputField label="Password" id="wifi-password" type="password" value={formData[DataType.WIFI].password} onChange={(e) => handleChange('password', e.target.value)} disabled={formData[DataType.WIFI].encryption === 'nopass'} />
                         <StyledSelect id="wifi-encryption" label="Encryption" value={formData[DataType.WIFI].encryption} onChange={(e) => handleChange('encryption', e.target.value as 'WPA' | 'WEP' | 'nopass')}>
                            <option value="WPA">WPA/WPA2</option>
                            <option value="WEP">WEP</option>
                            <option value="nopass">None</option>
                        </StyledSelect>
                        <div className="flex items-center">
                            <input type="checkbox" id="wifi-hidden" checked={!!formData[DataType.WIFI].hidden} onChange={(e) => handleChange('hidden', e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500" />
                            <label htmlFor="wifi-hidden" className="ml-2 block text-sm text-[var(--text-secondary)]">Hidden Network</label>
                        </div>
                    </div>
                );
            case DataType.MULTI_URL:
                 return (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-[var(--text-secondary)]">Landing Page</h3>
                        <InputField label="Title" id="multi-title" type="text" value={formData[DataType.MULTI_URL].title} onChange={(e) => handleChange('title', e.target.value)} />
                        <TextAreaField label="Description" id="multi-desc" value={formData[DataType.MULTI_URL].description} onChange={(e) => handleChange('description', e.target.value)} />
                         <h3 className="text-lg font-semibold text-[var(--text-secondary)] pt-4">Links</h3>
                        {formData[DataType.MULTI_URL].links.map((link, index) => (
                            <div key={link.id} className="relative p-4 border border-[var(--border-input)] rounded-lg bg-black/[.05] dark:bg-white/[.05]">
                                <button onClick={() => removeLink(index)} className="absolute top-3 right-3 p-1 text-slate-400 hover:text-red-500 rounded-full hover:bg-red-500/10 transition" aria-label="Remove link">
                                     <IconTrash className="w-5 h-5" />
                                </button>
                                <div className="space-y-3 pr-8">
                                    <InputField label={`Link ${index + 1} Title`} id={`link-title-${index}`} type="text" value={link.title} onChange={(e) => handleMultiUrlLinkChange(index, 'title', e.target.value)} icon={IconHash} />
                                    <InputField label={`Link ${index + 1} URL`} id={`link-url-${index}`} type="url" value={link.url} onChange={(e) => handleMultiUrlLinkChange(index, 'url', e.target.value)} icon={IconLink} />
                                </div>
                            </div>
                        ))}
                        <button onClick={addLink} className="w-full py-2 px-4 border border-dashed border-sky-500 text-sky-500 rounded-lg hover:bg-sky-500/10 transition">Add Link</button>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4 text-[var(--text-title)]">Content</h2>
            {renderForm()}
        </div>
    );
};

export default DataInputForm;