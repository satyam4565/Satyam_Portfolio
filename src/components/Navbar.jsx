import React from 'react'
import PropTypes from 'prop-types';

const Navbar = ({ navOpen, mobile = false }) => {
  const navItems = [
    { label: 'Home', link: '#home' },
    { label: 'About', link: '#about' },
    { label: 'Experience', link: '#experience' },
    { label: 'Skills', link: '#skills' },
    { label: 'Projects', link: '#work' },
  ];

  return (
    <nav className={mobile ? 'p-2 bg-zinc-900/90 border border-white/10 rounded-2xl shadow-xl backdrop-blur-3xl' : 'flex items-center gap-2'}>
      {navItems.map(({ label, link }, key) => (
        <a
          href={link}
          key={key}
          className={`px-5 py-2.5 text-sm font-semibold text-zinc-400 hover:text-white transition-colors rounded-full hover:bg-white/10 ${mobile ? 'block w-full text-left' : ''}`}
        >
          {label}
        </a>
      ))}
    </nav>
  )
}

Navbar.propTypes = {
  navOpen: PropTypes.bool.isRequired
}

export default Navbar