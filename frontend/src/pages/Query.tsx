import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { Cloudinary } from '@cloudinary/url-gen';
import CloudinaryUploadWidget from '@/lib/UploadWidget';
import { Button } from '@/components/ui/button';
import axios from 'axios';

const Query = () => {
    const [error, setError] = useState<String | null>(null);
    const [success, setSuccess] = useState<String | null>(null);
    const [loading, setLoading] = useState<Boolean | null>(null);
    const [images, setImages] = useState([]);

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true);
        try {
            const formData = new FormData(e.currentTarget);
            const name = formData.get('name');
            const desc = formData.get('desc')
            const location = formData.get('location')
            
            const res = await axios.post('/laf/upload', {name,desc,location,images })
        } catch (error) {
            console.log(error);
            
        }
    }

    const cloudName = 'dzgqb4bb6';
    const uploadPreset = 'ctrlwin';

    // Cloudinary configuration
    const cld = new Cloudinary({
        cloud: {
            cloudName,
        },
    });

    // Upload Widget Configuration
    const uwConfig = {
        cloudName,
        uploadPreset,
        // Uncomment and modify as needed:
        // cropping: true,
        // showAdvancedOptions: true,
        // sources: ['local', 'url'],
        multiple: true,
        // folder: 'user_images',
        // tags: ['users', 'profile'],
        // context: { alt: 'user_uploaded' },
        // clientAllowedFormats: ['images'],
        // maxImageFileSize: 2000000,
        // maxImageWidth: 2000,
        theme: 'purple',
    };
    return (
        <div>
            <h1>Upload yuor Query</h1>
            <form onSubmit={submitForm}>
                <Input placeholder='Name' name='name' />
                <Input placeholder='Description' name='desc' />
                <Input placeholder='Location' name='location' />
                <CloudinaryUploadWidget uwConfig={uwConfig} setPublicId={setImages} />
                <Button type='submit'>Submit</Button>

                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-600">{success}</p>}
            </form>
        </div>
    )
}

export default Query