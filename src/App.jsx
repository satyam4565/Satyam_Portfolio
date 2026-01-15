import React from 'react'

import Header from './components/Header'
import ScrollyCanvas from './components/ScrollyCanvas'
import Overlay from './components/Overlay'
import About from './components/About'
import Experience from './components/Experience'
import Skill from './components/Skill'
import Work from './components/Work'
import Contact from './components/Contact'
import Footer from './components/Footer'
import './AnimatedBackground.css';

const App = () => {
  return (
    <>
      {/* 🔹 Noise Overlay */}
      <div className="noise-overlay"></div>

      {/* 🔹 Ambient Light Blobs */}
      <div className="ambient-light bg-cyan-500 w-[500px] h-[500px] top-[-10%] left-[-10%] opacity-20"></div>
      <div className="ambient-light bg-purple-500 w-[600px] h-[600px] bottom-[-10%] right-[-10%] opacity-20 animation-delay-2000"></div>

      {/* 🔹 Main Content */}
      <Header />
      <main>
        <ScrollyCanvas />
        <Overlay />
        <About />
        <Experience />
        <Skill />
        <Work />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App;
