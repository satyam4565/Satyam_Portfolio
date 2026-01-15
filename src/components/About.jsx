import React from 'react'
import SectionWrapper from './SectionWrapper'
import { about } from '../portfolio'

const About = () => {
  return (
    <SectionWrapper id='about'>
      <div className='container'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24'>

          {/* Left: Engineering Statement */}
          <div className="flex flex-col justify-center">
            <div className='space-y-6'>
              <h3 className="text-3xl md:text-4xl font-bold text-zinc-100 leading-tight" dangerouslySetInnerHTML={{ __html: about.headline }}></h3>
              {about.description.map((desc, i) => (
                <p key={i} className="text-zinc-400 text-lg leading-relaxed max-w-lg" dangerouslySetInnerHTML={{ __html: desc }}></p>
              ))}
            </div>
          </div>

          {/* Right: Identity Stack */}
          <div className='space-y-6'>

            {/* Card 1: Focus */}
            <div className='p-8 rounded-3xl bg-white/5 border border-white/5 backdrop-blur-sm relative overflow-hidden group hover:border-white/10 transition-colors'>
              <div className='absolute -top-10 -right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all duration-500'></div>
              <h4 className='text-xs font-bold text-zinc-500 tracking-widest uppercase mb-4'>Core Focus</h4>
              <div className="space-y-3">
                {about.coreFocus.map((focus, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className={`w-2 h-2 rounded-full bg-${focus.color} shadow-[0_0_10px_currentColor] text-${focus.color}`}></span>
                    <span className="text-zinc-200 font-medium text-lg">{focus.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 2: Stats */}
            <div className='grid grid-cols-2 gap-4'>
              {about.stats.map((stat, i) => (
                <div key={i} className='p-6 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors'>
                  <h4 className='text-3xl font-bold text-white mb-1'>{stat.value}</h4>
                  <p className='text-xs text-zinc-500 font-bold uppercase tracking-wider'>{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="grid grid-cols-1 gap-4">
              {/* Resume */}
              <a href={about.resume} target="_blank" rel="noopener noreferrer" className='flex items-center justify-between p-6 rounded-2xl bg-zinc-800 border border-white/5 hover:bg-zinc-700 transition-colors group'>
                <div>
                  <span className='block text-xs uppercase tracking-wider font-medium text-zinc-400 mb-1'>Professional Bio</span>
                  <span className='text-lg font-semibold text-white'>Download Resume</span>
                </div>
                <span className='material-symbols-rounded text-2xl text-zinc-400 group-hover:text-white transition-colors'>download</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}

export default About
