import React, { useState } from 'react';
import api from '../services/api';

function AddAgentForm({ onAgentAdded }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/agents', { name, email, mobile, password });
            setMessage(`Agent "${response.data.name}" added successfully!`);
            setTimeout(() => setMessage(''), 3000);
            setName(''); setEmail(''); setMobile(''); setPassword('');
            onAgentAdded();
        } catch (error) {
            setMessage(error.response?.data?.message || 'Failed to add agent.');
            setTimeout(() => setMessage(''), 3000);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Add New Agent</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                <input type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="Mobile (+1123...)" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200">
                    Add Agent
                </button>
            </form>
            {message && <p className="mt-4 text-sm text-center text-gray-600">{message}</p>}
        </div>
    );
};

export default AddAgentForm;