import React from 'react';
import { X, CheckCircle, Info } from 'lucide-react';

const Toast = ({ toast }) => {
    if (!toast) return null;
    
    const colors = {
        success: 'bg-green-600 border-green-800',
        error: 'bg-red-600 border-red-800',
        info: 'bg-blue-600 border-blue-800',
    };
    const Icon = toast.type === 'success' ? CheckCircle : toast.type === 'error' ? X : Info;

    return (
        <div 
            className={`fixed top-4 right-4 z-50 p-4 rounded-xl shadow-2xl text-white border-b-4 ${colors[toast.type]} transition-opacity duration-300 animate-in fade-in-0 slide-in-from-right-20`}
            style={{ '--tw-enter-duration': '300ms', '--tw-exit-duration': '300ms' }}
        >
            <div className="flex items-start">
                <Icon className="w-5 h-5 mr-3 mt-0.5" />
                <div>
                    <p className="font-bold capitalize">{toast.type}</p>
                    <p className="text-sm">{toast.message}</p>
                </div>
            </div>
        </div>
    );
};

export default Toast;
