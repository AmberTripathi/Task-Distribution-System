import React, { useState } from 'react';
import api from '../services/api';

function ListUpload({ onUploadSuccess }) {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setMessage('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        setIsLoading(true);
        setMessage('');

        try {
            const response = await api.post('/lists/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setMessage(response.data.message);
            onUploadSuccess();
        } catch (error) {
            setMessage(error.response?.data?.message || 'File upload failed.');
        } finally {
            setIsLoading(false);
            setFile(null);
            e.target.reset(); // Reset the form to clear the file input
            setTimeout(() => setMessage(''), 5000);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Upload & Distribute List</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="file" onChange={handleFileChange} accept=".csv, .xlsx" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
                <button type="submit" disabled={isLoading} className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200 disabled:bg-gray-400">
                    {isLoading ? 'Uploading...' : 'Upload & Distribute'}
                </button>
            </form>
            {message && <p className="mt-4 text-sm text-center text-gray-600">{message}</p>}
        </div>
    );
};

export default ListUpload;