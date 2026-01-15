import React from 'react';
import SectionWrapper from './SectionWrapper';
import { experience } from '../portfolio';

const Experience = () => {
    return (
        <SectionWrapper id="experience">
            <div className="container">
                <div className="flex items-end justify-between mb-12">
                    <h2 className="headline-2 text-white">Experience</h2>
                    <p className="text-zinc-400 text-sm hidden md:block">A timeline of my professional work</p>
                </div>

                <div className="space-y-8 relative">
                    {/* Timeline Line */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-sky-500/50 via-purple-500/50 to-transparent transform md:-translate-x-1/2"></div>

                    {experience.map((job, index) => {
                        const isEven = index % 2 === 0;

                        return (
                            <div key={index} className="relative md:grid md:grid-cols-2 md:gap-12 md:items-center">
                                {/* Dot */}
                                <div className={`absolute left-4 top-0 md:left-1/2 w-4 h-4 bg-zinc-900 border-2 border-${job.color} rounded-full transform -translate-x-1/2 z-10 shadow-[0_0_10px_currentColor] text-${job.color}`}></div>

                                {/* Date (Left on Desktop for Odd, Right for Even) */}
                                <div className={`pl-12 md:pl-0 hidden md:block ${isEven ? 'md:text-right' : 'md:order-2 md:text-left'}`}>
                                    <span className={`text-sm font-bold text-${job.color} tracking-widest uppercase`}>{job.period}</span>
                                </div>

                                {/* Content (Right on Desktop for Odd, Left for Even) */}
                                <div className={`pl-12 md:pl-0 ${isEven ? '' : 'md:order-1'}`}>
                                    <div className="glass-panel p-6 hover:border-white/10 transition-colors">
                                        <div className="md:hidden mb-2">
                                            <span className={`text-xs font-bold text-${job.color} tracking-widest uppercase`}>{job.period}</span>
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-1">{job.role}</h3>
                                        <p className="text-zinc-400 text-sm mb-4">{job.company}</p>
                                        <p className="text-zinc-300 leading-relaxed text-sm mb-4">
                                            {job.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {job.tags.map((tag, i) => (
                                                <span key={i} className="px-2 py-1 bg-white/5 rounded text-xs text-zinc-400 border border-white/5">{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </SectionWrapper>
    );
};

export default Experience;
