import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const DonutChart = ({ easy, medium, hard }) => {
    
    const problemBreakdown = useMemo(() => [
        { name: "Easy", value: easy, fill: "#10b981" },    // emerald-500
        { name: "Medium", value: medium, fill: "#f59e0b" },// amber-500
        { name: "Hard", value: hard, fill: "#f43f5e" }     // rose-500
    ], [easy, medium, hard]);

    return (
        <div className="glass-panel p-6 w-full">
            <h3 className="text-zinc-400 text-xs font-bold tracking-widest uppercase mb-6">Problem Breakdown</h3>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 h-[250px]">
                {/* Chart */}
                <div className="w-[180px] h-[180px] relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={problemBreakdown}
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                                stroke="none"
                                cornerIsActive={true}
                            >
                                {problemBreakdown.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} className="transition-all duration-300 hover:opacity-80 outline-none" />
                                ))}
                            </Pie>
                            <Tooltip 
                                contentStyle={{ backgroundColor: 'rgba(24, 24, 27, 0.9)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
                                itemStyle={{ color: '#fff' }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                
                {/* Legend */}
                <div className="flex flex-col gap-4">
                    {problemBreakdown.map((tier) => (
                        <div key={tier.name} className="flex items-center gap-4">
                            <div className="flex items-center gap-2 w-24">
                                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: tier.fill }} />
                                <span className="text-zinc-400 text-sm">{tier.name}</span>
                            </div>
                            <span className="text-white font-bold">{tier.value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DonutChart;
