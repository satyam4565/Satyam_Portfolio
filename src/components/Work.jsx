import React from 'react'
import SectionWrapper from './SectionWrapper'
import { works } from '../portfolio'

const Work = () => {
  return (
    <SectionWrapper id='work'>
      <div className='container'>
        <h2 className='headline-2 mb-12 text-white'>My Projects</h2>

        <div className='space-y-12 md:space-y-32'>
          {works.map(({ imgSrc, title, tags, projectLink }, key) => (
            <div
              key={key}
              className="sticky top-24 md:top-32"
              style={{ zIndex: key + 1 }}
            >
              <div className="bg-zinc-900 border border-white/10 rounded-3xl p-4 md:p-8 flex flex-col md:flex-row gap-8 shadow-2xl shadow-black/50 backdrop-blur-xl">
                {/* Image */}
                <figure className='flex-1 rounded-2xl overflow-hidden aspect-video relative group'>
                  <img src={imgSrc} alt={title} className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105' />
                </figure>

                {/* Content */}
                <div className='flex-1 flex flex-col justify-center'>
                  <h3 className='text-3xl md:text-5xl font-bold text-white mb-4'>{title}</h3>
                  <div className='flex flex-wrap gap-2 mb-6'>
                    {tags.map((tag, i) => (
                      <span key={i} className='px-3 py-1 bg-white/5 border border-white/5 rounded-lg text-sm text-zinc-400'>{tag}</span>
                    ))}
                  </div>
                  <a href={projectLink} target="_blank" className="inline-flex items-center gap-2 text-sky-400 hover:text-sky-300 transition-colors font-medium">
                    View Project <span className="material-symbols-rounded">arrow_outward</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}

export default Work