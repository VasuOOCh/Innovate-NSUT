import { Button } from '@/components/ui/button';
import { useEffect, useRef, useState } from 'react';

interface CloudinaryUploadWidgetProps {
    uwConfig: object;
    setPublicId: any;
}

declare global {
    interface Window {
        cloudinary?: {
            createUploadWidget: (
                options: object,
                callback: (
                    error: any,
                    result: { event: string; info: { public_id: string } }
                ) => void
            ) => {
                open: () => void;
            };
        };
    }
}

const CloudinaryUploadWidget: React.FC<CloudinaryUploadWidgetProps> = ({
    uwConfig,
    setPublicId,
}) => {
    const widgetRef = useRef<any>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [scriptLoaded, setScriptLoaded] = useState(false);

    useEffect(() => {
        // Check if script is already loaded
        if (window.cloudinary) {
            setScriptLoaded(true);
            return;
        }

        // Load the script if not present
        const script = document.createElement('script');
        script.src = 'https://upload-widget.cloudinary.com/global/all.js';
        script.async = true;
        script.onload = () => setScriptLoaded(true);
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    useEffect(() => {
        if (!scriptLoaded || !buttonRef.current) return;

        const initializeWidget = () => {
            if (!window.cloudinary) {
                console.error('Cloudinary not available');
                return;
            }

            widgetRef.current = window.cloudinary.createUploadWidget(
                uwConfig,
                (error: any, result: any) => {
                    if (!error && result && result.event === 'success') {
                        console.log('Upload successful:', result.info);
                        setPublicId((prev : string[]) => [...prev, result.info.secure_url]);
                    } else if (error) {
                        console.error("Cloudinary upload error:", error);
                    }
                }
            );

            const handleClick = () => {
                // console.log('Opening widget...');
                if (widgetRef.current) {
                    widgetRef.current.open();
                } else {
                    console.error('Widget not initialized');
                }
            };

            const button = buttonRef.current;
            button?.addEventListener('click', handleClick);

            return () => {
                button?.removeEventListener('click', handleClick);
            };
        };

        initializeWidget();
    }, [scriptLoaded, uwConfig, setPublicId]);

    return (
        <Button ref={buttonRef}
            id="upload_widget"
            type="button">
                Upload Images
        </Button>
    );
};

export default CloudinaryUploadWidget;