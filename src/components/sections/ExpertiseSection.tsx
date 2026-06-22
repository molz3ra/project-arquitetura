'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const EXPERTISE = [
  {
    id: 'residencial',
    title: 'Residencial',
    description: 'Casas e refúgios desenhados para se integrarem à paisagem, respeitando a escala humana e a luz natural.',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
  },
  {
    id: 'corporativo',
    title: 'Corporativo',
    description: 'Espaços de trabalho contemporâneos focados no bem-estar, colaboração e identidade corporativa forte.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
  },
  {
    id: 'interiores',
    title: 'Interiores',
    description: 'Design de interiores curado até os mínimos detalhes. Seleção de mobiliário, texturas e materiais atemporais.',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
  }
]

export function ExpertiseSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section id="especialidades" className="py-[120px] px-6 md:px-12 bg-gesso text-charcoal border-t border-charcoal/10 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row gap-12 md:gap-24 relative z-10">
        
        <div className="md:w-1/3">
          <div className="font-sans text-[0.65rem] md:text-[0.72rem] tracking-[0.22em] text-charcoal/40 uppercase mb-4">
            Especialidades
          </div>
          <h2 className="font-sans font-light text-[clamp(2.5rem,5vw,4.5rem)] tracking-tight text-charcoal m-0 leading-none mb-8">
            Nossa<br />Atuação
          </h2>
          <p className="font-sans text-[0.95rem] text-charcoal/60 leading-relaxed max-w-[300px]">
            Acreditamos que a boa arquitetura permeia todas as escalas. Do plano diretor ao detalhe da marcenaria, mantemos o mesmo rigor estético e técnico.
          </p>
        </div>

        <div className="md:w-2/3 flex flex-col border-t border-charcoal/20">
          {EXPERTISE.map((item) => (
            <div 
              key={item.id}
              className="group border-b border-charcoal/20 py-6 md:py-8 relative md:cursor-none bg-charcoal/0 w-full"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between relative z-20 pointer-events-none">
                <h3 className="font-sans font-light text-[2rem] md:text-[3rem] tracking-tight group-hover:pl-4 transition-all duration-500 group-hover:text-charcoal/80 pointer-events-auto">
                  {item.title}
                </h3>
              </div>
              
              {/* Expandable Content Area */}
              <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]">
                <div className="overflow-hidden">
                  <div className="pt-6 md:pt-8 flex flex-col md:flex-row gap-6 md:gap-12 items-start md:items-center">
                    {/* Big Image */}
                    <div className="relative w-full md:w-[350px] lg:w-[450px] h-[200px] md:h-[260px] overflow-hidden shrink-0">
                      <Image 
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover scale-110 group-hover:scale-100 transition-transform duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)]"
                      />
                    </div>
                    {/* Description Text */}
                    <div className="font-sans text-[0.95rem] md:text-[1.05rem] opacity-70 max-w-[320px] leading-relaxed">
                      {item.description}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
