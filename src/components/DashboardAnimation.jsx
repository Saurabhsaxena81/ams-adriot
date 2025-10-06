// src/components/DashboardAnimation.jsx

import  { useState, useEffect } from 'react';

// Mock function to simulate fetching data from your APIs
const fetchApiData = async (endpoint) => {
    // Simulate network delay and data fetching
    await new Promise(resolve => setTimeout(resolve, Math.random() * 1500 + 500)); 
    
    // Return mock data based on the endpoint for visualization
    if (endpoint === 'AttendanceCount') {
        return Math.floor(Math.random() * 5000) + 5000; // Total Records
    }
    if (endpoint === 'AgentsLoggedIn') {
        return Math.floor(Math.random() * 100) + 50; // Active Users
    }
    if (endpoint === 'Admins/HRs') {
        return Math.floor(Math.random() * 5) + 3; // Admin/HR Count
    }
};

// --- Single Data Card Component ---
const DataCard = ({ title, value, isLoading }) => (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20 transition-all duration-500 hover:shadow-2xl hover:scale-[1.02]">
        <p className="text-sm font-light text-gray-300 mb-2 uppercase tracking-wider">{title}</p>
        <div className="h-10">
            {isLoading ? (
                <div className="animate-pulse bg-white/30 h-8 w-3/4 rounded-lg"></div>
            ) : (
                <p className="text-4xl font-extrabold text-white">
                    {value.toLocaleString()}
                </p>
            )}
        </div>
    </div>
);


const DashboardAnimation = () => {
    const [counts, setCounts] = useState({ 
        totalRecords: null, 
        activeAgents: null, 
        hrCount: null 
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            
            // Simulate fetching data from the APIs we created (e.g., Summary API data)
            const [records, agents, hrs] = await Promise.all([
                fetchApiData('AttendanceCount'),
                fetchApiData('AgentsLoggedIn'),
                fetchApiData('Admins/HRs'),
            ]);

            setCounts({
                totalRecords: records,
                activeAgents: agents,
                hrCount: hrs,
            });
            setLoading(false);
        };

        loadData();
    }, []);

    return (
        <div className="relative overflow-hidden w-full h-80 flex items-center justify-center p-8">
            
            {/* 1. Background (The "Visually Amazing" Part) */}
            <div className="absolute inset-0 bg-gray-900">
                {/* Subtle Moving Gradient/Wave Effect (Tailwind Animation) */}
                <div 
                    className="absolute inset-0 opacity-40 bg-gradient-to-br from-indigo-800 to-purple-900" 
                    style={{ transform: 'skewY(-5deg)' }}
                ></div>
                
                {/* Animated Wave 1 */}
                <div className="absolute w-[200%] h-[200%] bg-indigo-500/10 rounded-full top-[-50%] left-[-50%] animate-wave-slow"></div>
                
                {/* Animated Wave 2 */}
                <div className="absolute w-[200%] h-[200%] bg-purple-500/10 rounded-full top-[-50%] left-[-50%] animate-wave-fast" style={{ animationDelay: '-1.5s' }}></div>
            </div>

            {/* 2. Content Overlay */}
            <div className="relative z-10 w-full max-w-6xl">
                <h1 className="text-4xl font-bold text-white mb-6 text-center drop-shadow-lg">
                    Attendance Tracker System Status
                </h1>
                
                {/* Data Cards (API Response Visualization) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <DataCard 
                        title="Total Attendance Records" 
                        value={counts.totalRecords} 
                        isLoading={loading} 
                    />
                    <DataCard 
                        title="Active Agents (via Login API)" 
                        value={counts.activeAgents} 
                        isLoading={loading} 
                    />
                    <DataCard 
                        title="Admin & HR Users" 
                        value={counts.hrCount} 
                        isLoading={loading} 
                    />
                </div>
            </div>
        </div>
    );
};

export default DashboardAnimation;