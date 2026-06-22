'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const MANIFESTO =
  'Cada projeto nasce de uma escuta atenta — ao lugar, às pessoas, ao tempo que habitam. Não impomos formas ao espaço. Propomos um diálogo entre o que existe e o que pode existir, entre a solidez do concreto e a delicadeza da luz que o atravessa. Aqui, a arquitetura é uma conversa que nunca termina.'

export function ManifestoSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const wordsRef = useRef<HTMLSpanElement[]>([])

  useEffect(() => {
    const section = sectionRef.current
    const pin = pinRef.current
    const words = wordsRef.current.filter(Boolean)
    if (!section || !pin || words.length === 0) return

    const triggers: ScrollTrigger[] = []

    // Hero overlay darkens as we enter this section
    const heroOverlay = document.getElementById('hero-overlay')
    if (heroOverlay) {
      triggers.push(
        ScrollTrigger.create({
          trigger: section,
          start: 'top bottom',
          end: 'top top',
          scrub: true,
          onUpdate: (self) => {
            heroOverlay.style.opacity = String(self.progress * 0.92)
          },
        })
      )
    }

    // Pin the manifesto text while section scrolls
    // Word color reveal: from near-invisible to solid charcoal
    gsap.set(words, { color: 'rgba(26,26,26,0.1)' }) // charcoal/10

    const tween = gsap.to(words, {
      color: 'rgba(26,26,26,1)', // charcoal solid
      duration: 0.4,
      stagger: {
        each: 0.08,
        from: 'start',
      },
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        pin: pin,
        scrub: 1.2,
      },
    })

    if (tween.scrollTrigger) triggers.push(tween.scrollTrigger)

    return () => {
      triggers.forEach((t) => t.kill())
    }
  }, [])

  const words = MANIFESTO.split(' ')

  return (
    <section
      id="filosofia"
      ref={sectionRef}
      className="relative h-[320vh] bg-gesso"
    >
      <div
        ref={pinRef}
        className="h-[100dvh] flex flex-col items-center justify-center px-6 md:px-[10vw] relative"
      >
        {/* Section label */}
        <div className="font-sans text-[0.65rem] md:text-[0.7rem] tracking-[0.22em] text-charcoal/35 uppercase mb-6 text-center">
          Manifesto
        </div>

        {/* Opening em-dash line */}
        <div className="w-8 h-[1px] bg-charcoal/20 mb-8 md:mb-12" />

        {/* Manifesto text */}
        <p className="font-sans font-light text-[clamp(1.6rem,2.6vw,2.6rem)] leading-relaxed text-center max-w-[860px] m-0">
          {words.map((word, i) => (
            <span
              key={i}
              ref={(el) => {
                if (el) wordsRef.current[i] = el
              }}
              className="inline"
            >
              {word}
              {i < words.length - 1 ? ' ' : ''}
            </span>
          ))}
        </p>

        {/* Attribution */}
        <div className="mt-10 md:mt-14 font-sans text-xs tracking-[0.15em] text-charcoal/30 uppercase">
          — Clara Moura
        </div>
      </div>
    </section>
  )
}
