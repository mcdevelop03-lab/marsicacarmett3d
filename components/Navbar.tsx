'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { href: '#evento', label: 'Evento' },
  { href: '#iscrizione', label: 'Iscrizione' },
  { href: '#contatti', label: 'Contatti' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setIsOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-black/80 backdrop-blur-md border-b border-white/5'
            : 'bg-black/60 backdrop-blur-md'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            className="flex items-center gap-2 group"
          >
            <span className="text-white font-black tracking-widest uppercase text-lg select-none">
              FLAT6
            </span>
            <span
              className="w-1.5 h-1.5 rounded-full bg-[#E8001D] group-hover:scale-150 transition-transform duration-300"
              aria-hidden="true"
            />
            <span className="text-white font-black tracking-widest uppercase text-lg select-none">
              MEET
            </span>
          </a>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleNavClick(link.href)}
                  className="text-white/60 hover:text-white transition-colors duration-300 text-sm tracking-widest uppercase font-medium"
                >
                  {link.label}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => handleNavClick('#iscrizione')}
                className="text-white text-sm font-semibold tracking-wider uppercase px-5 py-2 border border-[#E8001D]/60 hover:border-[#E8001D] hover:bg-[#E8001D]/10 rounded-full transition-all duration-300"
              >
                Iscriviti
              </button>
            </li>
          </ul>

          {/* Hamburger */}
          <button
            id="nav-hamburger"
            className="md:hidden flex flex-col gap-1.5 p-2 group"
            onClick={() => setIsOpen((v) => !v)}
            aria-label="Apri menu"
            aria-expanded={isOpen}
          >
            <motion.span
              animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="block w-6 h-0.5 bg-white origin-center transition-colors"
            />
            <motion.span
              animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              className="block w-6 h-0.5 bg-white"
            />
            <motion.span
              animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="block w-6 h-0.5 bg-white origin-center"
            />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-[#0A0A0A] border-l border-white/10 flex flex-col md:hidden"
            >
              <div className="h-16 flex items-center justify-end px-6">
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/60 hover:text-white transition-colors"
                  aria-label="Chiudi menu"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="flex-1 flex flex-col gap-2 px-6 pt-8">
                {NAV_LINKS.map((link, i) => (
                  <motion.button
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 + 0.1 }}
                    onClick={() => handleNavClick(link.href)}
                    className="text-left text-white/70 hover:text-white text-2xl font-bold tracking-widest uppercase py-4 border-b border-white/5 hover:border-white/20 transition-all duration-300"
                  >
                    {link.label}
                  </motion.button>
                ))}
                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 }}
                  onClick={() => handleNavClick('#iscrizione')}
                  className="mt-8 w-full text-white text-lg font-bold tracking-wider uppercase px-6 py-4 bg-[#E8001D] rounded-full hover:bg-[#E8001D]/90 transition-all duration-300 glow-red"
                >
                  Iscriviti ora
                </motion.button>
              </div>

              <div className="px-6 pb-8">
                <p className="text-white/20 text-xs tracking-widest uppercase">
                  FLAT6 MEET 2025
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
