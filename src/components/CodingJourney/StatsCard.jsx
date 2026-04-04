import React from 'react';

const StatsCard = ({ label, value, icon, colorClass = "text-white" }) => {
    return (
        <div className="glass-panel p-5 relative overflow-hidden group hover:-translate-y-1 hover:border-white/20 transition-all duration-300">
            {/* Subtle background glow effect on hover */}
            <div className="absolute inset-0 bg-sky-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            
            <div className="flex justify-between items-start mb-4">
                <span className="text-zinc-400 text-xs font-bold tracking-widest uppercase">{label}</span>
                {icon}
            </div>
            <div className={`text-3xl md:text-4xl font-bold ${colorClass}`}>
                {value}
            </div>
        </div>
    );
};

export default StatsCard;
