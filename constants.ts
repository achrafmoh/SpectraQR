import { QROptions, DataType, DataTypeOption } from './types';
import { 
    IconLink, IconText, IconEmail, IconPhone, IconSms, IconWifi, IconMultiLink 
} from './components/Icons';

export const DEFAULT_QR_OPTIONS: QROptions = {
    width: 300,
    height: 300,
    type: 'svg',
    image: '',
    margin: 10,
    qrOptions: {
        typeNumber: 0,
        mode: 'Byte',
        errorCorrectionLevel: 'Q',
    },
    imageOptions: {
        hideBackgroundDots: true,
        imageSize: 0.4,
        margin: 10,
        crossOrigin: 'anonymous',
    },
    dotsOptions: {
        color: '#ffffff',
        type: 'rounded',
        gradient: {
            type: 'linear',
            rotation: 0.785, // 45 degrees
            colorStops: [{ offset: 0, color: '#22d3ee' }, { offset: 1, color: '#a855f7' }] // cyan-400 to purple-500
        }
    },
    backgroundOptions: {
        color: '#0f172a', // slate-900
    },
    cornersSquareOptions: {
        type: 'extra-rounded',
        color: '#22d3ee' // cyan-400
    },
    cornersDotOptions: {
        type: 'dot',
        color: '#a855f7' // purple-500
    },
};


export const DATA_TYPE_OPTIONS: DataTypeOption[] = [
    { id: DataType.URL, label: 'URL', icon: IconLink },
    { id: DataType.TEXT, label: 'Text', icon: IconText },
    { id: DataType.EMAIL, label: 'Email', icon: IconEmail },
    { id: DataType.PHONE, label: 'Phone', icon: IconPhone },
    { id: DataType.SMS, label: 'SMS', icon: IconSms },
    { id: DataType.WIFI, label: 'Wi-Fi', icon: IconWifi },
    { id: DataType.MULTI_URL, label: 'Multi Link', icon: IconMultiLink }
];