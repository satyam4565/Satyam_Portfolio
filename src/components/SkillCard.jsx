import React from 'react'

import PropTypes from 'prop-types'

import { useRef } from 'react';

const SkillCard = ({
    imgSrc, label, desc, classes
}) => {
    const cardRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        cardRef.current.style.setProperty('--mouse-x', `${x}px`);
        cardRef.current.style.setProperty('--mouse-y', `${y}px`);
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            className={'relative flex items-center gap-4 bg-white/5 border border-white/5 rounded-xl p-4 overflow-hidden hover:bg-white/10 hover:border-white/10 transition-all duration-300 group hover:shadow-lg hover:shadow-purple-500/10 hover:-translate-y-1 ' + classes}
        >
            {/* Spotlight Effect */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                    background: `radial-gradient(400px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(255, 255, 255, 0.03), transparent 40%)`
                }}
            ></div>

            <figure className='bg-zinc-700/30 rounded-xl overflow-hidden w-12 h-12 p-2 group-hover:bg-purple-500/10 transition-colors relative z-10'>
                <img src={imgSrc} width={32} height={32} alt={label} className='w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all' />
            </figure>
            <div className="relative z-10">
                <h3 className='text-zinc-100 font-medium group-hover:text-purple-300 transition-colors'>{label}</h3>
                <p className='text-zinc-500 text-sm group-hover:text-zinc-400 transition-colors'>{desc}</p>
            </div>
        </div>
    )
}

SkillCard.propTypes = {
    imgSrc: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    classes: PropTypes.string
}

export default SkillCard