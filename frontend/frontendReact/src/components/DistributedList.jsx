import React from 'react';

function DistributedList({ lists }) {
    const groupedByAgent = lists.reduce((acc, item) => {
        const agentName = item.assignedTo ? item.assignedTo.name : 'Unassigned';
        if (!acc[agentName]) {
            acc[agentName] = [];
        }
        acc[agentName].push(item);
        return acc;
    }, {});

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Distributed Lists</h3>
            <div className="space-y-6">
                {Object.keys(groupedByAgent).length === 0 ? <p className="text-gray-500">No lists have been distributed yet.</p> : (
                    Object.keys(groupedByAgent).map(agentName => (
                        <div key={agentName}>
                            <h4 className="font-bold text-md text-blue-600">{agentName} ({groupedByAgent[agentName].length} items)</h4>
                            <div className="overflow-x-auto mt-2 border rounded-md">
                                <table className="min-w-full text-sm text-left text-gray-700">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-4 py-2">First Name</th>
                                            <th scope="col" className="px-4 py-2">Phone</th>
                                            <th scope="col" className="px-4 py-2">Notes</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {groupedByAgent[agentName].map(item => (
                                            <tr key={item._id} className="bg-white border-b last:border-b-0 hover:bg-gray-50">
                                                <td className="px-4 py-2 font-medium text-gray-900">{item.firstName}</td>
                                                <td className="px-4 py-2">{item.phone}</td>
                                                <td className="px-4 py-2">{item.notes}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default DistributedList;