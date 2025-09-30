import React from 'react';

// fix: Define DataType enum
export enum DataType {
    URL = 'url',
    TEXT = 'text',
    EMAIL = 'email',
    PHONE = 'phone',
    SMS = 'sms',
    WIFI = 'wifi',
    MULTI_URL = 'multi_url',
}

// fix: Define DataTypeOption interface
export interface DataTypeOption {
    id: DataType;
    label: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

// fix: Define types for QR code styling options, matching the structure in constants.ts
export interface Gradient {
    type: 'linear' | 'radial';
    rotation?: number;
    colorStops: {
        offset: number;
        color: string;
    }[];
}

export type DotsOptions_Type = 'rounded' | 'dots' | 'classy' | 'classy-rounded' | 'square' | 'extra-rounded';
export type CornersSquareOptions_Type = 'dot' | 'square' | 'extra-rounded';
export type CornersDotOptions_Type = 'dot' | 'square';


export interface QROptions {
    width?: number;
    height?: number;
    type?: 'canvas' | 'svg';
    data?: string;
    image?: string;
    margin?: number;
    qrOptions?: {
        typeNumber?: number;
        mode?: 'Numeric' | 'Alphanumeric' | 'Byte' | 'Kanji';
        errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H';
    };
    imageOptions?: {
        hideBackgroundDots?: boolean;
        imageSize?: number;
        margin?: number;
        crossOrigin?: string;
    };
    dotsOptions?: {
        type?: DotsOptions_Type;
        color?: string;
        gradient?: Gradient;
    };
    backgroundOptions?: {
        color?: string;
        gradient?: Gradient;
    };
    cornersSquareOptions?: {
        type?: CornersSquareOptions_Type;
        color?: string;
        gradient?: Gradient;
    };
    cornersDotOptions?: {
        type?: CornersDotOptions_Type;
        color?: string;
        gradient?: Gradient;
    };
}

// fix: Define types for form data structures
export interface LinkData {
    id: string;
    url: string;
    title: string;
}

export interface MultiUrlData {
    title: string;
    description: string;
    links: LinkData[];
}

export interface WifiData {
    ssid: string;
    encryption: 'WPA' | 'WEP' | 'nopass';
    password?: string;
    hidden?: boolean;
}

export interface FormData {
    [DataType.URL]: string;
    [DataType.TEXT]: string;
    [DataType.EMAIL]: { email: string; subject: string; body: string };
    [DataType.PHONE]: string;
    [DataType.SMS]: { phone: string; message: string };
    [DataType.WIFI]: WifiData;
    [DataType.MULTI_URL]: MultiUrlData;
}

export interface ToastState {
    id: number;
    message: string;
    type: 'success' | 'error' | 'info';
}