'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ProjectCard } from './ProjectCard'
import { MagneticButton } from '../MagneticButton'

gsap.registerPlugin(ScrollTrigger)

const PROJECTS = [
  {
    id: 'casa-dos-pinheiros',
    imageUrl:
      'https://images.unsplash.com/photo-1682184805271-11671b7ecf4c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    title: 'Casa dos Pinheiros',
    year: '2023',
    category: 'Residencial',
    large: true,
  },
  {
    id: 'instituto-cultural-mira',
    imageUrl:
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    title: 'Instituto Cultural Mira',
    year: '2022',
    category: 'Cultural',
    large: false,
  },
  {
    id: 'apartamento-higienopolis',
    imageUrl:
      'https://images.unsplash.com/photo-1724582586495-d050726cf354?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    title: 'Apartamento Higienópolis',
    year: '2021',
    category: 'Residencial',
    large: false,
  },
  {
    id: 'torre-faria-lima',
    imageUrl:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    title: 'Torre Faria Lima',
    year: '2023',
    category: 'Corporativo',
    large: true,
  },
]

interface GallerySectionProps {
  onCursorChange: (hovering: boolean) => void
}

export function GallerySection({ onCursorChange }: GallerySectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const grid = gridRef.current
    if (!section || !grid) return

    // Reveal grid items on scroll
    const cards = grid.querySelectorAll('.project-card-wrapper')
    gsap.set(cards, { opacity: 0, y: 50 })
    gsap.to(cards, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: grid,
        start: 'top 80%',
        once: true,
      },
    })

    // Title reveal
    if (titleRef.current) {
      gsap.set(titleRef.current, { opacity: 0, y: 30 })
      gsap.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          once: true,
        },
      })
    }
  }, [])

  return (
    <section
      id="projetos"
      ref={sectionRef}
      className="bg-gesso py-[80px] md:py-[120px] px-6 md:px-12"
    >
      {/* Section header */}
      <div
        ref={titleRef}
        className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-12 md:mb-16 gap-6 md:gap-0"
      >
        <div>
          <div className="font-sans text-[0.65rem] md:text-[0.72rem] tracking-[0.22em] text-charcoal/40 uppercase mb-4">
            Portfólio selecionado
          </div>
          <h2 className="font-sans font-light text-[clamp(2.5rem,5vw,4.5rem)] tracking-tight text-charcoal m-0 leading-none">
            Projetos
          </h2>
        </div>

        <div className="font-sans text-[0.78rem] text-charcoal/45 tracking-[0.05em] md:max-w-[240px] md:text-right leading-relaxed">
          Uma seleção de obras que definem nossa abordagem ao espaço construído.
        </div>
      </div>

      {/* Asymmetric grid */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-3"
      >
        {/* Large card — spans 2 columns on desktop */}
        <div className="project-card-wrapper md:col-span-2 md:row-start-1">
          <Link href={`/projeto/${PROJECTS[0].id}`} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-charcoal">
            <ProjectCard {...PROJECTS[0]} large onHoverChange={onCursorChange} />
          </Link>
        </div>

        {/* Small card */}
        <div className="project-card-wrapper md:col-start-3 md:row-start-1">
          <Link href={`/projeto/${PROJECTS[1].id}`} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-charcoal">
            <ProjectCard {...PROJECTS[1]} onHoverChange={onCursorChange} />
          </Link>
        </div>

        {/* Small card */}
        <div className="project-card-wrapper md:col-start-1 md:row-start-2">
          <Link href={`/projeto/${PROJECTS[2].id}`} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-charcoal">
            <ProjectCard {...PROJECTS[2]} onHoverChange={onCursorChange} />
          </Link>
        </div>

        {/* Large card — spans 2 columns on desktop */}
        <div className="project-card-wrapper md:col-span-2 md:col-start-2 md:row-start-2">
          <Link href={`/projeto/${PROJECTS[3].id}`} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-charcoal">
            <ProjectCard {...PROJECTS[3]} large onHoverChange={onCursorChange} />
          </Link>
        </div>
      </div>

      {/* View all link */}
      <div className="mt-14 flex justify-center">
        <MagneticButton strength={30}>
          <button
            className="bg-transparent border border-charcoal/30 px-12 py-4 font-sans text-[0.78rem] tracking-[0.2em] uppercase text-charcoal md:cursor-none transition-all duration-300 ease-out hover:bg-charcoal hover:text-gesso focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-charcoal"
          >
            Ver todos os projetos
          </button>
        </MagneticButton>
      </div>
    </section>
  )
}
