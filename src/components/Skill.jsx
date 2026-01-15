import React from 'react'
import SectionWrapper from './SectionWrapper'
import SkillCard from './SkillCard'
import { skills } from '../portfolio'

const Skill = () => {
  return (
    <SectionWrapper id='skills'>
      <div className="container">
        <h2 className="headline-2 text-white reveal-up">Essential Tools I use</h2>
        <p className="text-zinc-400 mt-3 mb-12 max-w-[50ch] reveal-up">Discover the powerful tools and technologies I use to create exceptional, high-performing websites & applications.</p>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {
            skills.map(({ imgSrc, label, desc }, key) => (
              <SkillCard key={key} imgSrc={imgSrc} label={label} desc={desc} />
            ))
          }
        </div>
      </div>
    </SectionWrapper>
  )
}

export default Skill