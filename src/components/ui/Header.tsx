'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useLenis } from 'lenis/react'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const lenis = useLenis()
  const isHome = pathname === '/'

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Lock scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      lenis?.stop()
    } else {
      document.body.style.overflow = ''
      lenis?.start()
    }
    return () => {
      document.body.style.overflow = ''
      lenis?.start()
    }
  }, [isOpen, lenis])

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    if (isHome) {
      e.preventDefault()
      setIsOpen(false)
      // Allow state to update and menu to close before scrolling
      setTimeout(() => {
        lenis?.scrollTo(target, { duration: 1.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
      }, 500)
    }
  }

  // Animation variants
  const menuVariants: any = {
    closed: { y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
    open: { y: '0%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }
  }

  const linkVariants: any = {
    closed: { y: 100, opacity: 0 },
    open: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.3 + (i * 0.1) }
    })
  }

  // Header styles depending on the route and menu state
  const headerClass = isHome && !isOpen
    ? 'fixed mix-blend-difference'
    : isOpen ? 'fixed mix-blend-normal' : 'absolute mix-blend-normal'

  return (
    <>
      <header className={`top-0 left-0 w-full px-6 py-8 md:px-12 md:py-10 flex justify-between items-center z-[100] text-white ${headerClass} transition-colors duration-500`}>
        <div className="font-sans font-medium tracking-widest text-[1.125rem] z-[101]">
          <Link href="/" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white md:cursor-none">
            Clara Moura
          </Link>
        </div>
        
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="font-sans text-xs tracking-widest uppercase hover:opacity-70 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white md:cursor-none z-[101] flex items-center gap-2"
        >
          <span className="relative overflow-hidden h-[18px] w-[50px] block">
            <span className={`absolute w-full h-full flex flex-col transition-transform duration-500 ${isOpen ? '-translate-y-full' : 'translate-y-0'}`}>
              <span className="h-full w-full flex items-center justify-end">Menu</span>
              <span className="h-full w-full flex items-center justify-end">Fechar</span>
            </span>
          </span>
        </button>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 bg-charcoal text-gesso z-[90] flex flex-col px-6 md:px-24 overflow-hidden h-[100dvh]"
          >
            {/* Spacer to avoid overlapping the fixed header */}
            <div className="h-12 md:h-16 shrink-0" />

            <div className="flex-1 flex flex-col justify-center min-h-0">
              <nav className="flex flex-col gap-2 md:gap-4">
                {[
                  { name: 'Home', href: '/' },
                  { name: 'Projetos', href: '/#projetos', isAnchor: true },
                  { name: 'Especialidades', href: '/#especialidades', isAnchor: true },
                  { name: 'Sobre', href: '/#sobre', isAnchor: true },
                  { name: 'Contato', href: '/#contato', isAnchor: true },
                ].map((link, i) => (
                  <div key={link.name} className="overflow-hidden">
                    <motion.div custom={i} variants={linkVariants} initial="closed" animate="open" exit="closed">
                      <Link
                        href={link.href}
                        onClick={(e) => link.isAnchor ? handleScrollTo(e, link.href.replace('/', '')) : setIsOpen(false)}
                        className="font-sans font-light text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight hover:opacity-70 transition-opacity focus-visible:outline-none md:cursor-none block"
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  </div>
                ))}
              </nav>
            </div>

            <motion.div 
              className="flex flex-col md:flex-row justify-between gap-4 font-sans text-xs tracking-widest uppercase text-gesso/50 pb-6 md:pb-8 shrink-0 mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <div>
                <a href="mailto:contato@claramoura.com" className="hover:text-gesso transition-colors md:cursor-none">contato@claramoura.com</a>
              </div>
              <div className="flex gap-6">
                <a href="#" className="hover:text-gesso transition-colors md:cursor-none">Instagram</a>
                <a href="#" className="hover:text-gesso transition-colors md:cursor-none">LinkedIn</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
