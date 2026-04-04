import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { AlertCircle } from 'lucide-react';

const CustomAreaTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="glass-panel px-4 py-3 border border-zinc-700/50 text-sm shadow-xl bg-zinc-900/90 backdrop-blur-md">
                <p className="text-zinc-300 font-semibold mb-1">{payload[0].payload.title}</p>
                <div className="flex justify-between items-center gap-4">
                    <span className="text-zinc-500 text-xs">{payload[0].payload.date}</span>
                    <span className="text-sky-400 font-bold">Rating: {payload[0].value}</span>
                </div>
            </div>
        );
    }
    return null;
};

const LineChart = ({ contestHistory }) => {
    if (!contestHistory || contestHistory.length === 0) {
        return (
            <div className="glass-panel p-6 w-full flex flex-col items-center justify-center text-center opacity-80 min-h-[250px]">
                <AlertCircle className="w-10 h-10 text-zinc-500 mb-4" />
                <h3 className="text-zinc-400 text-xs font-bold tracking-widest uppercase mb-2">Rating Progress</h3>
                <p className="text-zinc-500 text-sm max-w-[80%] mx-auto">
                    Unable to fetch contest history from public API.
                </p>
            </div>
        );
    }

    return (
        <div className="glass-panel p-6 w-full">
            <h3 className="text-zinc-400 text-xs font-bold tracking-widest uppercase mb-6">Contest Rating Progress</h3>
            <div className="h-[250px] w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={contestHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorRatingReal" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.4} />
                                <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis 
                            dataKey="date" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fill: '#71717a', fontSize: 11 }}
                            dy={10}
                            minTickGap={30}
                        />
                        <YAxis 
                            domain={['dataMin - 10', 'dataMax + 20']} 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fill: '#71717a', fontSize: 12 }}
                            tickFormatter={(val) => Math.round(val)}
                        />
                        <Tooltip content={<CustomAreaTooltip />} />
                        <Area 
                            type="monotone" 
                            dataKey="rating" 
                            stroke="#38bdf8" 
                            strokeWidth={3}
                            fillOpacity={1} 
                            fill="url(#colorRatingReal)" 
                            activeDot={{ r: 6, fill: '#0ea5e9', stroke: '#fff', strokeWidth: 2 }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default LineChart;
