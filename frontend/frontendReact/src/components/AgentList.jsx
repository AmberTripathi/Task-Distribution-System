import React from 'react';

function AgentList({ agents }) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Current Agents</h3>
            <div className="overflow-x-auto">
                {agents.length === 0 ? <p className="text-gray-500">No agents found.</p> : (
                    <table className="min-w-full text-sm text-left text-gray-700">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">Name</th>
                                <th scope="col" className="px-6 py-3">Email</th>
                                <th scope="col" className="px-6 py-3">Mobile</th>
                            </tr>
                        </thead>
                        <tbody>
                            {agents.map(agent => (
                                <tr key={agent._id} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{agent.name}</td>
                                    <td className="px-6 py-4">{agent.email}</td>
                                    <td className="px-6 py-4">{agent.mobile}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default AgentList;