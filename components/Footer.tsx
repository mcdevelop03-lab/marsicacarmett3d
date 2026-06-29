'use client'

import { motion } from 'framer-motion'

const SOCIAL_LINKS = [
  {
    label: 'Instagram',
    href: '#',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: '#',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
      </svg>
    ),
  },
  {
    label: 'Email',
    href: 'mailto:info@flat6meet.com',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <footer id="contatti" className="bg-[#0A0A0A] pt-20 pb-12 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Top separator */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#C0C0C0]/20 to-transparent mb-16" />

        {/* Main content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 mb-16">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="text-white font-black tracking-widest uppercase text-xl">FLAT6</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8001D]" />
              <span className="text-white font-black tracking-widest uppercase text-xl">MEET</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Il raduno esclusivo dedicato alla Porsche 911 GT3 e GT3 RS. Motorsport di lusso. Prima edizione 2025.
            </p>
            {/* Social */}
            <div className="flex items-center gap-4 mt-2">
              {SOCIAL_LINKS.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  whileHover={{ scale: 1.15, color: '#ffffff' }}
                  className="text-white/30 hover:text-white/80 transition-colors duration-300"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white/90 font-bold text-xs tracking-[0.4em] uppercase mb-2">
              Navigazione
            </h4>
            {[
              { label: 'Il Raduno', href: '#evento' },
              { label: 'Iscrizione', href: '#iscrizione' },
              { label: 'Contatti', href: '#contatti' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-white/40 hover:text-white/80 text-sm transition-colors duration-300 w-fit"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white/90 font-bold text-xs tracking-[0.4em] uppercase mb-2">
              Contatti
            </h4>
            <a
              href="mailto:info@flat6meet.com"
              className="text-white/40 hover:text-white/80 text-sm transition-colors duration-300 w-fit"
            >
              info@flat6meet.com
            </a>
            <p className="text-white/40 text-sm">
              Per partnership e media:<br />
              <a
                href="mailto:media@flat6meet.com"
                className="hover:text-white/80 transition-colors duration-300"
              >
                media@flat6meet.com
              </a>
            </p>
            <div className="mt-2 flex flex-col gap-1">
              <span className="text-white/20 text-xs tracking-widest uppercase">Evento</span>
              <span className="text-white/60 text-sm font-medium">Italia — Estate 2025</span>
              <span className="text-white/30 text-xs">Location rivelata agli iscritti</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="h-px bg-[#C0C0C0]/10 mb-8" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs tracking-widest">
            © 2025 FLAT6 MEET — Tutti i diritti riservati
          </p>
          <div className="flex items-center gap-1">
            <span className="text-white/20 text-xs tracking-widest">Made for</span>
            <span className="text-white/40 text-xs font-bold tracking-wider ml-1">FLAT-SIX LOVERS</span>
            <span className="w-1 h-1 rounded-full bg-[#E8001D] ml-2" />
          </div>
        </div>
      </div>
    </footer>
  )
}
