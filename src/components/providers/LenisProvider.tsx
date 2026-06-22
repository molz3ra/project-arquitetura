'use client'

import { useEffect, useRef } from 'react'
import { ReactLenis } from 'lenis/react'
import { usePathname } from 'next/navigation'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const lenisRef = useRef<any>(null)

  useEffect(() => {
    // Scroll to top when pathname changes
    if (lenisRef.current?.lenis) {
      lenisRef.current.lenis.scrollTo(0, { immediate: true })
    }
  }, [pathname])

  useEffect(() => {
    // This updates GSAP ScrollTrigger when Lenis scrolls
    function update(time: number) {
      ScrollTrigger.update()
    }
    
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(update)
    }
  }, [])

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        duration: 1.25,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  )
}
