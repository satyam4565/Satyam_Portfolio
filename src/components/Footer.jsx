import React from 'react'

import { ButtonPrimary } from './Button';

const sitemap = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#work' },
  { label: 'Contact me', href: '#contact' }
];

const socials = [
  { label: 'GitHub', href: 'https://github.com/satyam4565' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/satyamsingh45/' },
  { label: 'LeetCode', href: 'https://leetcode.com/u/satyium/' },
  { label: 'Codeforces', href: 'https://codeforces.com/profile/satyam40506' }
];

const Footer = () => {
  return (
    <footer className='relative py-12 section'>
      <div className='absolute inset-0 bg-gradient-to-t from-[#020617] to-transparent pointer-events-none'></div>

      <div className='container relative z-10'>
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-8 border-b border-white/10 pb-8 mb-8'>
          <div className='col-span-2 lg:col-span-1'>
            <a href='/' className='logo flex items-center gap-3 mb-4'>
              <img src='./images/icon.png' width={40} height={40} alt='Satyam Singh'></img>
              <span className='font-bold text-lg text-white'>Satyam Singh</span>
            </a>
          </div>

          <div>
            <h4 className='font-semibold text-white mb-4'>Sitemap</h4>
            <ul className='space-y-2'>
              {sitemap.map(({ label, href }, key) => (
                <li key={key}>
                  <a href={href} className='text-zinc-400 hover:text-sky-400 transition-colors text-sm'>{label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className='font-semibold text-white mb-4'>Socials</h4>
            <ul className='space-y-2'>
              {socials.map(({ label, href }, key) => (
                <li key={key}>
                  <a href={href} target='_blank' className='text-zinc-400 hover:text-sky-400 transition-colors text-sm'>{label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className='flex flex-col md:flex-row items-center justify-between text-zinc-500 text-sm'>
          <p>&copy; 2025 Satyam Singh. All rights reserved.</p>
          <div className='flex gap-4 mt-4 md:mt-0'>
            <a href='#' className='hover:text-white transition-colors'>Privacy Policy</a>
            <a href='#' className='hover:text-white transition-colors'>Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer