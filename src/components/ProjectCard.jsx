import React from 'react'

import PropTypes from 'prop-types'

import { useRef } from 'react';

const ProjectCard = ({
    imgSrc,
    title,
    tags,
    projectLink,
    classes
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
            className={"relative p-4 rounded-xl bg-white/5 border border-white/10 overflow-hidden hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-cyan-500/10 hover:-translate-y-1 transition-all duration-300 group " + (classes || "")}
        >
            {/* Spotlight Effect */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                    background: `radial-gradient(600px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(255, 255, 255, 0.05), transparent 40%)`
                }}
            ></div>
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: 'inherit',
                    background: `radial-gradient(600px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(255, 255, 255, 0.1), transparent 40%) border-box`,
                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    maskComposite: 'exclude',
                    WebkitMaskComposite: 'xor',
                }}
            ></div>

            <figure className='img-box aspect-video rounded-lg mb-4 overflow-hidden relative z-10'>
                <img src={imgSrc} alt={title} loading='lazy' className='img-cover transition-transform duration-500 group-hover:scale-105 group-hover:rotate-1' />
            </figure>

            <div className='flex items-center justify-between gap-4 relative z-10'>
                <div>
                    <h3 className='title-1 mb-3 text-zinc-100 font-semibold group-hover:text-cyan-400 transition-colors'>{title}</h3>
                    <div className='flex flex-wrap items-center gap-2'>{tags.map((label, key) => (
                        <span key={key} className='h-8 text-sm text-zinc-400 bg-black/20 border border-white/5 grid items-center px-3 rounded-lg backdrop-blur-sm group-hover:bg-cyan-500/10 group-hover:text-cyan-200 transition-colors'>{label}</span>
                    ))}</div>
                </div>
                <div className='w-11 h-11 rounded-lg grid place-items-center bg-zinc-800 text-zinc-300 shrink-0 group-hover:bg-cyan-400 group-hover:text-zinc-950 transition-colors shadow-lg shadow-black/20'>
                    <span className='material-symbols-rounded' aria-hidden="true">arrow_outward</span>
                </div>
            </div>
            <a href={projectLink} target='_blank' rel="noopener noreferrer" className='absolute inset-0 z-20'></a>
        </div>
    )
}

ProjectCard.propTypes = {
    imgSrc: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    tags: PropTypes.array.isRequired,
    projectLink: PropTypes.string,
    classes: PropTypes.string
}

export default ProjectCard