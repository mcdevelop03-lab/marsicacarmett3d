'use client'

import { motion } from 'framer-motion'

const STANDARD_INCLUDES = [
  'Accesso completo all\'evento',
  'Percorso guidato GT3-only',
  'Kit partecipante ufficiale',
  'Briefing iniziale',
  'Accesso aree espositive',
  'Colazione di benvenuto',
]

const PRO_EXTRAS = [
  'Track session in pista',
  'Cena esclusiva finale',
  'Area Paddock VIP',
  'Polo ufficiale dell\'evento',
]

function CheckIcon({ red = false }: { red?: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke={red ? '#E8001D' : 'rgba(255,255,255,0.4)'}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="flex-shrink-0 mt-0.5"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

export default function TicketingSection() {
  const handleSignup = (pass: 'standard' | 'pro') => {
    // Placeholder — link to form or external registration
    alert(`Iscrizione ${pass === 'pro' ? 'FLAT6 PRO PASS' : 'FLAT6 PASS'} — funzionalità in arrivo!`)
  }

  return (
    <section id="iscrizione" className="bg-[#0A0A0A] py-28 md:py-40 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Separator */}
        <div className="flex items-center gap-6 mb-20 md:mb-28">
          <div className="h-px flex-1 bg-[#C0C0C0]/15" />
          <span className="text-[#C0C0C0]/40 text-xs tracking-[0.4em] uppercase whitespace-nowrap">
            Ticketing
          </span>
          <div className="h-px flex-1 bg-[#C0C0C0]/15" />
        </div>

        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white/90 uppercase leading-none mb-4"
          >
            Scegli il tuo posto.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-white/50 text-base md:text-lg max-w-md mx-auto"
          >
            Posti limitati a 192 vetture. Una volta esauriti, lista d&apos;attesa.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">

          {/* Standard Pass */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8 md:p-10 flex flex-col gap-6 hover:border-white/15 transition-all duration-500"
          >
            {/* Header */}
            <div>
              <span className="text-[#C0C0C0]/60 text-[10px] font-semibold tracking-[0.4em] uppercase block mb-3">
                Entry
              </span>
              <h3 className="text-white/90 text-2xl font-black tracking-tight uppercase mb-1">
                FLAT6 PASS
              </h3>
              <p className="text-white/40 text-sm">Accesso all&apos;esperienza completa</p>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-black text-white/90 tracking-tighter">199</span>
              <span className="text-white/50 text-xl font-medium">€</span>
              <span className="text-white/30 text-sm ml-1">/ vettura</span>
            </div>

            {/* Divider */}
            <div className="h-px bg-white/[0.07]" />

            {/* Includes */}
            <ul className="flex flex-col gap-3">
              {STANDARD_INCLUDES.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckIcon />
                  <span className="text-white/60 text-sm">{item}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <button
              onClick={() => handleSignup('standard')}
              id="cta-standard"
              className="mt-auto w-full py-4 px-6 border border-white/25 text-white/80 font-semibold text-sm tracking-widest uppercase rounded-full hover:bg-white/10 hover:border-white/40 hover:text-white transition-all duration-300"
            >
              Iscriviti
            </button>
          </motion.div>

          {/* Pro Pass */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative bg-white/[0.04] border border-[#E8001D]/40 rounded-2xl p-8 md:p-10 flex flex-col gap-6 glow-red-border hover:border-[#E8001D]/70 transition-all duration-500"
          >
            {/* Badge */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
              <span className="bg-[#E8001D] text-white text-[10px] font-bold tracking-[0.3em] uppercase px-4 py-1.5 rounded-full whitespace-nowrap">
                Esperienza completa
              </span>
            </div>

            {/* Header */}
            <div className="mt-2">
              <span className="text-[#E8001D]/70 text-[10px] font-semibold tracking-[0.4em] uppercase block mb-3">
                Premium
              </span>
              <h3 className="text-white/90 text-2xl font-black tracking-tight uppercase mb-1">
                FLAT6 PRO PASS
              </h3>
              <p className="text-white/40 text-sm">L&apos;esperienza nella sua forma più pura</p>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-black text-white/90 tracking-tighter">399</span>
              <span className="text-white/50 text-xl font-medium">€</span>
              <span className="text-white/30 text-sm ml-1">/ vettura</span>
            </div>

            {/* Divider */}
            <div className="h-px bg-[#E8001D]/20" />

            {/* Includes — Standard */}
            <ul className="flex flex-col gap-3">
              {STANDARD_INCLUDES.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckIcon />
                  <span className="text-white/60 text-sm">{item}</span>
                </li>
              ))}
            </ul>

            {/* Pro extras */}
            <div>
              <p className="text-[#E8001D] text-[10px] font-semibold tracking-[0.3em] uppercase mb-3">
                + Pro Exclusive
              </p>
              <ul className="flex flex-col gap-3">
                {PRO_EXTRAS.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckIcon red />
                    <span className="text-white/80 text-sm font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <button
              onClick={() => handleSignup('pro')}
              id="cta-pro"
              className="mt-auto w-full py-4 px-6 bg-[#E8001D] text-white font-semibold text-sm tracking-widest uppercase rounded-full glow-red hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(232,0,29,0.6)] transition-all duration-300"
            >
              Iscriviti a FLAT6 PRO
            </button>
          </motion.div>
        </div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-center text-white/20 text-xs tracking-widest uppercase mt-10"
        >
          Tutti i pass includono l&apos;accesso esclusivo per la vettura e il pilota. Passeggero: +50€.
        </motion.p>
      </div>
    </section>
  )
}
