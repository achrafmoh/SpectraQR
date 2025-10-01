import React from 'react';

const IconProps: React.SVGProps<SVGSVGElement> = {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
};

export const IconLink: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...IconProps} {...props}>
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72" />
    </svg>
);

export const IconEmail: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...IconProps} {...props}>
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
);

export const IconPhone: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...IconProps} {...props}>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
);

export const IconSms: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...IconProps} {...props}>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
);

export const IconMultiLink: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...IconProps} {...props}>
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="3" y1="9" x2="21" y2="9"></line>
        <line x1="9" y1="21" x2="9" y2="9"></line>
    </svg>
);

export const BrandIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22d3ee" /> {/* cyan-400 */}
                <stop offset="100%" stopColor="#a855f7" /> {/* purple-500 */}
            </linearGradient>
        </defs>
        {/* Outer Frame */}
        <path 
            fill="url(#grad1)" 
            d="M26,2H6C3.79,2,2,3.79,2,6v20c0,2.21,1.79,4,4,4h20c2.21,0,4-1.79,4-4V6C30,3.79,28.21,2,26,2z M26,26H6V6h20V26z"
        />
        {/* Inner Square */}
        <rect 
            fill="url(#grad1)" 
            x="11" 
            y="11" 
            width="10" 
            height="10" 
            rx="2"
        />
    </svg>
);


export const IconSun: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...IconProps} {...props}>
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    </svg>
);

export const IconMoon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...IconProps} {...props}>
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
);

export const IconCopy: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...IconProps} {...props}>
        <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
    </svg>
);

export const IconTrash: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...IconProps} {...props}>
        <polyline points="3 6 5 6 21 6"></polyline>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        <line x1="10" y1="11" x2="10" y2="17"></line>
        <line x1="14" y1="11" x2="14" y2="17"></line>
    </svg>
);

export const IconAtSign: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...IconProps} {...props}>
        <circle cx="12" cy="12" r="4"></circle>
        <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"></path>
    </svg>
);

export const IconHash: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...IconProps} {...props}>
        <line x1="4" y1="9" x2="20" y2="9"></line>
        <line x1="4" y1="15" x2="20" y2="15"></line>
        <line x1="10" y1="3" x2="8" y2="21"></line>
        <line x1="16" y1="3" x2="14" y2="21"></line>
    </svg>
);

export const IconPalette: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...IconProps} {...props}><path d="M13.5 2c-5.62.44-9.04 5.33-8.5 10.74.48 4.84 4.33 8.76 9.24 8.76 4.33 0 7.92-3.03 8.5-7.26.58-4.23-2.06-8.23-6.5-8.74m-1.5 7.02c-.34.34-.34.89 0 1.22.33.34.88.34 1.22 0 .34-.33.34-.88 0-1.22-.34-.33-.89-.33-1.22 0m-3.41-2.09c-.34.33-.34.88 0 1.22.34.33.89.33 1.22 0 .34-.34.34-.89 0-1.22-.33-.34-.88-.34-1.22 0m2.09-3.41c-.34.34-.34.89 0 1.22.33.34.88.34 1.22 0 .34-.33.34-.88 0-1.22-.34-.33-.89-.33-1.22 0m3.18 8.62c.34-.34.89-.34 1.22 0 .34.34.34.89 0 1.22-.33.34-.88.34-1.22 0-.34-.33-.34-.88 0-1.22z"/></svg>
);

export const IconShapes: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...IconProps} {...props}><path d="M20.15 17.02c.45-1.33.22-2.85-.68-3.95l-3.2-3.84c-.93-1.12-2.4-1.78-3.97-1.78H9.3c-.98 0-1.92.34-2.69.95l-2.63 2.1c-.9.72-1.26 1.9-.92 3.02.34 1.12 1.25 1.95 2.42 2.13l3.52.53c1.94.29 3.84.06 5.56-.68l1.63-.7z"/><path d="M8.5 13.5a5 5 0 1 0 0-10 5 5 0 0 0 0 10z"/></svg>
);

export const IconImage: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...IconProps} {...props}><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
);

export const IconSettings: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...IconProps} {...props}><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
);

export const IconGripVertical: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...IconProps} {...props}>
        <circle cx="9" cy="12" r="1"></circle>
        <circle cx="9" cy="5" r="1"></circle>
        <circle cx="9" cy="19" r="1"></circle>
        <circle cx="15" cy="12" r="1"></circle>
        <circle cx="15" cy="5" r="1"></circle>
        <circle cx="15" cy="19" r="1"></circle>
    </svg>
);

export const IconRotateCcw: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...IconProps} {...props}>
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
        <path d="M3 3v5h5" />
    </svg>
);