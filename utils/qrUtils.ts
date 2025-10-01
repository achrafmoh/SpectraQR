import { DataType, FormData, MultiUrlData } from '../types';

declare const pako: any;

/**
 * Generates a long URL containing the compressed and encoded Multi-Link data.
 * This URL is self-contained and can be decoded by the client-side app.
 * @param data The MultiUrlData object from the form.
 * @returns A long URL with the data in the hash (e.g., "https://yourapp.com/#H-compressedstring").
 */
const generateLongViewerUrl = (data: MultiUrlData): string => {
    // 1. Create a cleaner payload, stripping internal 'id' fields.
    const payload = {
        title: data.title,
        description: data.description,
        links: data.links.map(({ title, url }) => ({ title, url }))
    };

    // 2. Compress the JSON string using pako (zlib).
    const compressed = pako.deflate(JSON.stringify(payload));
    
    // 3. Convert Uint8Array to a base64 string.
    const base64String = btoa(String.fromCharCode.apply(null, compressed as any));
    
    // 4. Make the base64 string URL-safe.
    const urlSafeBase64 = base64String.replace(/\+/g, '-').replace(/\//g, '_');

    // 5. Construct the final URL.
    const baseUrl = window.location.href.split('#')[0];
    return `${baseUrl}#H-${urlSafeBase64}`;
};

/**
 * Asynchronously shortens a given URL using the TinyURL API.
 * @param longUrl The URL to shorten.
 * @returns A promise that resolves to the shortened URL.
 * @throws Will throw an error if the API request fails.
 */
const shortenUrl = async (longUrl: string): Promise<string> => {
    try {
        const response = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`);
        if (!response.ok) {
            throw new Error(`TinyURL API failed with status ${response.status}`);
        }
        const shortUrl = await response.text();
        return shortUrl;
    } catch (error) {
        console.error("Failed to shorten URL:", error);
        throw error; // Re-throw to be caught by the calling function.
    }
};


// Generates the final data string for the QR code. This is now an async function.
export const getQrData = async (type: DataType, formData: FormData): Promise<string> => {
    switch (type) {
        case DataType.URL:
            return formData[DataType.URL] || ' ';
        case DataType.EMAIL: {
            const { email, subject, body } = formData[DataType.EMAIL];
            if (!email) return ' ';
            return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        }
        case DataType.PHONE:
            return `tel:${formData[DataType.PHONE] || ''}`;
        case DataType.SMS: {
            const { phone, message } = formData[DataType.SMS];
            return `sms:${phone || ''}?body=${encodeURIComponent(message)}`;
        }
        case DataType.MULTI_URL:
            // The new, definitive flow: compress data, create a long URL, then shorten it.
            const longUrl = generateLongViewerUrl(formData[DataType.MULTI_URL]);
            return await shortenUrl(longUrl);
        default:
            return ' ';
    }
}