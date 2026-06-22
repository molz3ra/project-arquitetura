'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLenis } from 'lenis/react'
import { MagneticButton } from '../MagneticButton'

gsap.registerPlugin(ScrollTrigger)

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1760623128588-3a0ad5693205?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920'

const TITLE_LINES = ['Espaços', 'que Respiram']
const NAV_LINKS = ['Projetos', 'Filosofia', 'Sobre', 'Contato']

export function HeroSection() {
  const logoRef = useRef<HTMLDivElement>(null)
  const heroImageRef = useRef<HTMLDivElement>(null)
  const heroOverlayRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([])
  const [logoActive, setLogoActive] = useState(false)
  const lenis = useLenis()

  useEffect(() => {
    const tl = gsap.timeline()

    // Hero image: opacity 0 → 1, scale 1.1 → 1.0 over 3s
    gsap.set(heroImageRef.current, { opacity: 0, scale: 1.1 })
    tl.to(
      heroImageRef.current,
      { opacity: 1, scale: 1, duration: 3, ease: 'power2.out' },
      0.5
    )

    // Nav fade in
    gsap.set(navRef.current, { opacity: 0, y: -10 })
    tl.to(navRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 1.1)

    // Title words reveal: slide up from clip
    const words = wordRefs.current.filter(Boolean)
    gsap.set(words, { y: '105%' })
    tl.to(
      words,
      {
        y: '0%',
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.18,
      },
      1.0
    )

    // Logo slides to header after 500ms
    const timer = setTimeout(() => setLogoActive(true), 500)

    // Parallax effect on Hero Image (Intense but smooth)
    gsap.to(heroImageRef.current, {
      yPercent: 15,
      ease: 'none',
      scrollTrigger: {
        trigger: heroImageRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })

    return () => {
      clearTimeout(timer)
    }
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    if (lenis) {
      lenis.scrollTo(targetId, { offset: 0, duration: 1.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
    }
  }

  return (
    <section className="relative min-h-[100dvh] overflow-hidden bg-gesso">
      {/* Hero image with expanded bounds for parallax */}
      <div
        ref={heroImageRef}
        className="absolute -inset-[15%] will-change-[transform,opacity]"
      >
        <Image
          src={HERO_IMAGE}
          alt="Projeto icônico"
          fill
          priority
          sizes="100vw"
          className="object-cover block"
          quality={90}
        />
        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/5 to-black/60" />
      </div>

      {/* Darkening overlay (used by manifesto scroll effect) */}
      <div
        ref={heroOverlayRef}
        id="hero-overlay"
        className="absolute inset-0 bg-gesso opacity-0 pointer-events-none z-10"
      />


      {/* Hero title */}
      <div className="absolute bottom-[10%] left-6 md:left-12 z-20 mix-blend-difference pointer-events-none">
        {TITLE_LINES.map((line, lineIdx) => (
          <div key={lineIdx} className={`overflow-hidden leading-none ${lineIdx === 0 ? 'mb-1' : 'mb-0'}`}>
            <span
              ref={(el) => { wordRefs.current[lineIdx] = el }}
              className="block font-sans font-light text-[clamp(3.5rem,10vw,8rem)] tracking-tighter text-gesso leading-none"
            >
              {line}
            </span>
          </div>
        ))}

        {/* Tagline */}
        <div className="overflow-hidden mt-6">
          <span
            ref={(el) => { wordRefs.current[2] = el }}
            className="block font-sans font-light text-[0.75rem] md:text-sm tracking-[0.22em] text-gesso/70 uppercase"
          >
            Arquitetura · São Paulo · Est. 2012
          </span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-[10%] right-6 md:right-12 z-20 flex flex-col items-center gap-3 mix-blend-difference pointer-events-none">
        <div className="font-sans text-[0.65rem] md:text-[0.7rem] tracking-[0.18em] text-gesso/50 uppercase" style={{ writingMode: 'vertical-rl' }}>
          Role para explorar
        </div>
        <div className="w-[1px] h-[40px] md:h-[60px] bg-gradient-to-b from-gesso/50 to-transparent animate-[scrollLine_2s_ease-in-out_infinite]" />
      </div>

      <style>{`
        @keyframes scrollLine {
          0%, 100% { opacity: 0.4; transform: scaleY(1); transform-origin: top; }
          50% { opacity: 1; transform: scaleY(1.2); transform-origin: top; }
        }
      `}</style>
    </section>
  )
}
