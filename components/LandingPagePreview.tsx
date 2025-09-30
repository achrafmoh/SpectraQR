import React from 'react';
import { MultiUrlData } from '../types';
import { IconLink } from './Icons';

interface LandingPagePreviewProps {
    data: MultiUrlData;
}

const LandingPagePreview: React.FC<LandingPagePreviewProps> = ({ data }) => {
    return (
         <div className="bg-[var(--bg-panel)] backdrop-blur-lg border border-[var(--border-panel)] rounded-2xl p-6 shadow-2xl flex flex-col items-center gap-6">
            <h3 className="text-xl font-bold text-[var(--text-title)]">Multi-Link Preview</h3>
            
            <div className="w-full max-w-sm mx-auto">
                 <div className="border-4 border-slate-700 dark:border-slate-500 rounded-[2.5rem] overflow-hidden shadow-2xl">
                    <div className="w-full h-[500px] bg-gray-100 dark:bg-slate-900 p-4 overflow-y-auto">
                        <div className="text-center mb-6">
                             <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100 break-words">{data.title || 'My Links'}</h1>
                             <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 break-words">{data.description || 'Check out my awesome links!'}</p>
                        </div>
                        <div className="space-y-4">
                            {data.links.map(link => (
                                <a
                                    key={link.id}
                                    href={link.url || '#'}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center p-3 bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                                >
                                    <div className="flex-shrink-0 w-10 h-10 bg-sky-100 dark:bg-sky-900/50 rounded-full flex items-center justify-center mr-4">
                                        <IconLink className="w-5 h-5 text-sky-500" />
                                    </div>
                                    <span className="font-semibold text-slate-700 dark:text-slate-200 break-all">{link.title || 'My Link'}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPagePreview;
