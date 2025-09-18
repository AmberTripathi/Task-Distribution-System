import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import api from '../services/api';

import AddAgentForm from '../components/AddAgentForm';
import AgentList from '../components/AgentList';
import ListUpload from '../components/ListUpload';
import DistributedList from '../components/DistributedList';

function DashboardPage() {
    const { logout } = useContext(AuthContext);
    const [agents, setAgents] = useState([]);
    const [lists, setLists] = useState([]);

    const fetchAgents = async () => {
        try {
            const response = await api.get('/agents');
            setAgents(response.data);
        } catch (error) {
            console.error('Failed to fetch agents', error);
        }
    };

    const fetchLists = async () => {
        try {
            const response = await api.get('/lists');
            setLists(response.data);
        } catch (error) {
            console.error('Failed to fetch lists', error);
        }
    };

    useEffect(() => {
        fetchAgents();
        fetchLists();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                    <button onClick={logout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200">
                        Logout
                    </button>
                </div>
            </header>
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0 grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-6">
                        <AddAgentForm onAgentAdded={fetchAgents} />
                        <AgentList agents={agents} />
                    </div>
                    <div className="flex flex-col gap-6">
                        <ListUpload onUploadSuccess={fetchLists} />
                        <DistributedList lists={lists} />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DashboardPage;