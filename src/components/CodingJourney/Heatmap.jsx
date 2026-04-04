import React, { useMemo } from 'react';

const Heatmap = ({ submissionCalendar }) => {
    // We normalize the submission map and generate a 365 day structure 
    const heatmapData = useMemo(() => {
        const data = [];
        const now = new Date();
        now.setHours(0,0,0,0);
        
        let maxCount = 0;
        
        // Find max to scale colors correctly
        for(let key in submissionCalendar) {
            if(submissionCalendar[key] > maxCount) {
                maxCount = submissionCalendar[key];
            }
        }

        // Loop for 365 days
        for (let i = 0; i < 365; i++) {
            const date = new Date(now);
            date.setDate(date.getDate() - (364 - i));
            
            // The API provides unix timestamp in seconds. Let's find matches roughly.
            // We just format our date and match any unix stamps belonging to that UTC day.
            const dateString = date.toISOString().split('T')[0];
            let dailyCount = 0;
            
            // O(N) over dict is small (max 365 keys)
            for(let unixSec in submissionCalendar) {
                const subDate = new Date(unixSec * 1000);
                if(subDate.toISOString().split('T')[0] === dateString) {
                    dailyCount += submissionCalendar[unixSec];
                }
            }

            // Normalize level 0 to 4
            let level = 0;
            if(dailyCount > 0) {
                level = Math.ceil((dailyCount / maxCount) * 4);
                if(level > 4) level = 4;
            }

            data.push({
                date: dateString,
                count: dailyCount,
                level: level
            });
        }
        return data;
    }, [submissionCalendar]);

    const getHeatmapColor = (level) => {
        if (level === 0) return 'bg-[#2a2a2a] border-[#2a2a2a]';
        if (level === 1) return 'bg-[#0e4429] border-[#0e4429]';
        if (level === 2) return 'bg-[#006d32] border-[#006d32]';
        if (level === 3) return 'bg-[#26a641] border-[#26a641]';
        return 'bg-[#39d353] border-[#39d353]';
    };

    return (
        <div className="glass-panel p-6 mb-8">
            <h3 className="text-zinc-400 text-xs font-bold tracking-widest uppercase mb-6">Submission Activity</h3>
            
            <div className="overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
                <div className="min-w-[800px] flex flex-col gap-1.5">
                    {/* Create 7 rows for days of the week */}
                    {Array.from({ length: 7 }).map((_, dayIndex) => (
                        <div key={`day-${dayIndex}`} className="flex gap-1.5">
                            {Array.from({ length: Math.ceil(heatmapData.length / 7) }).map((_, weekIndex) => {
                                const dataIndex = weekIndex * 7 + dayIndex;
                                const dayData = heatmapData[dataIndex];
                                
                                if (!dayData) return <div key={weekIndex} className="w-3.5 h-3.5" />; // Empty filler

                                return (
                                    <div 
                                        key={`week-${weekIndex}`}
                                        className={`w-3 h-3 rounded-sm border ${getHeatmapColor(dayData.level)} transition-all duration-300 hover:scale-150 origin-center group relative cursor-pointer`}
                                    >
                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-zinc-900 border border-zinc-700 text-xs rounded text-white opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 shadow-xl">
                                            {dayData.count} submissions on {dayData.date}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
                
                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-zinc-500">
                    <span>Less</span>
                    <div className="flex gap-1">
                        {[0, 1, 2, 3, 4].map((level) => (
                            <div key={`legend-${level}`} className={`w-3 h-3 rounded-sm border ${getHeatmapColor(level)}`} />
                        ))}
                    </div>
                    <span>More</span>
                </div>
            </div>
        </div>
    );
};

export default Heatmap;
