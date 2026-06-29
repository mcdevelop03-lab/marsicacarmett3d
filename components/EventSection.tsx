'use client'

import { motion, Variants } from 'framer-motion'

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1] as number[],
    },
  }),
}

const CARDS = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#E8001D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12h18M3 12c0-4.97 4.03-9 9-9s9 4.03 9 9M3 12c0 4.97 4.03 9 9 9s9-4.03 9-9" />
        <path d="M12 3c2.5 2.67 4 5.93 4 9s-1.5 6.33-4 9M12 3C9.5 5.67 8 8.93 8 12s1.5 6.33 4 9" />
      </svg>
    ),
    title: 'Percorsi Esclusivi',
    description:
      'Strade selezionate, itinerari riservati ai partecipanti. Nessun turista, nessun traffico. Solo asfalto perfetto e curve memorabili.',
    tag: 'Road & Track',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#E8001D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: 'Community Reale',
    description:
      'Incontra chi condivide la stessa ossessione per il flat-six aspirato. Storie, consigli e passione allo stato puro.',
    tag: 'People',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#E8001D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    title: 'Esperienza Totale',
    description:
      'Briefing tecnico con ingegneri Porsche, track session opzionale in pista, e una cena finale riservata in location esclusiva.',
    tag: 'Full Experience',
  },
]

export default function EventSection() {
  return (
    <section id="evento" className="bg-[#0A0A0A] py-28 md:py-40 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Separator */}
        <div className="flex items-center gap-6 mb-20 md:mb-28">
          <div className="h-px flex-1 bg-[#C0C0C0]/15" />
          <span className="text-[#C0C0C0]/40 text-xs tracking-[0.4em] uppercase whitespace-nowrap">
            FLAT6 MEET 2025
          </span>
          <div className="h-px flex-1 bg-[#C0C0C0]/15" />
        </div>

        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as number[] }}
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white/90 uppercase leading-none mb-4"
          >
            Perché FLAT6 MEET.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] as number[] }}
            className="text-white/50 text-base md:text-lg max-w-xl mx-auto leading-relaxed"
          >
            Un evento pensato nei minimi dettagli per chi non accetta compromessi. Tre giorni di pura adrenalina motoristica.
          </motion.p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="group relative bg-white/[0.03] border border-white/[0.07] rounded-2xl p-8 md:p-10 hover:border-white/15 hover:bg-white/[0.05] transition-all duration-500 overflow-hidden"
            >
              {/* Subtle corner accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#E8001D]/[0.03] rounded-bl-full pointer-events-none group-hover:bg-[#E8001D]/[0.06] transition-colors duration-500" />

              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-[#E8001D]/10 transition-colors duration-500">
                {card.icon}
              </div>

              {/* Tag */}
              <span className="text-[#E8001D] text-[10px] font-semibold tracking-[0.3em] uppercase mb-3 block">
                {card.tag}
              </span>

              {/* Title */}
              <h3 className="text-white/90 text-xl font-bold tracking-tight mb-3 uppercase">
                {card.title}
              </h3>

              {/* Description */}
              <p className="text-white/50 text-sm leading-relaxed">
                {card.description}
              </p>

              {/* Bottom line */}
              <div className="mt-8 h-px bg-gradient-to-r from-[#E8001D]/30 to-transparent group-hover:from-[#E8001D]/60 transition-all duration-500" />
            </motion.div>
          ))}
        </div>

        {/* Bottom info strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-20 md:mt-28 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          {[
            { value: '192', label: 'Partecipanti max' },
            { value: '3', label: 'Giorni di evento' },
            { value: '911', label: 'Solo GT3 & GT3 RS' },
            { value: '2025', label: 'Prima edizione' },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1">
              <span className="text-3xl md:text-4xl font-black text-white/90 tracking-tighter">
                {stat.value}
              </span>
              <span className="text-white/30 text-xs tracking-widest uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}