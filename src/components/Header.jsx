import React, { useState } from 'react'
import Navbar from './Navbar'

const Header = () => {
    const [navOpen, setNavOpen] = useState(false);
    return (
        <header className="fixed top-0 left-0 w-full z-50 flex justify-center pt-8">
            <div className='flex items-center justify-between px-4 pr-3 py-3 rounded-full bg-white/5 backdrop-blur-3xl border border-white/5 shadow-2xl shadow-black/20'>

                {/* Logo */}
                <a href='/' className='flex items-center gap-3 pl-4 pr-8 opacity-90 hover:opacity-100 transition-opacity'>
                    <img src='./images/icon.png' width={34} height={34} alt='Satyam Singh' className="rounded-full shadow-lg overflow-hidden"></img>
                </a>

                {/* Nav */}
                <div className='hidden md:block'>
                    <Navbar navOpen={navOpen} />
                </div>

                {/* Mobile Menu Button */}
                <div className='md:hidden relative'>
                    <button className='w-12 h-12 grid place-items-center bg-white/5 rounded-full text-zinc-200 active:scale-95 transition-all' onClick={() => setNavOpen((prev) => !prev)}>
                        <span className='material-symbols-rounded text-[24px]'>menu</span>
                    </button>
                    <div className={'absolute top-full right-0 mt-2 min-w-[200px] ' + (navOpen ? 'block' : 'hidden')}>
                        <Navbar navOpen={navOpen} mobile={true} />
                    </div>
                </div>

                {/* CTA */}
                <a href="#contact" className="hidden md:flex items-center gap-2 text-sm font-semibold text-zinc-900 bg-white px-6 py-3 rounded-full hover:bg-zinc-200 transition-colors ml-6 shadow-lg shadow-white/10">
                    Contact Me
                    <span className='material-symbols-rounded text-[18px]'>arrow_outward</span>
                </a>
            </div>
        </header>
    )
}

export default Header