'use client'

import { useLenis } from 'lenis/react'
import Link from 'next/link'

export function Footer() {
  const lenis = useLenis()

  const handleBackToTop = (e: React.MouseEvent) => {
    e.preventDefault()
    lenis?.scrollTo('top', { duration: 1.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
  }

  return (
    <footer className="bg-charcoal text-gesso py-16 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
        
        <div className="flex flex-col gap-6">
          <div className="font-sans font-medium tracking-widest text-[1.125rem]">
            Clara Moura
          </div>
          <p className="font-sans text-[0.85rem] text-gesso/60 max-w-[300px] leading-relaxed">
            Arquitetura atemporal focada no bem-estar, na luz natural e na integração com a paisagem.
          </p>
        </div>

        <div className="flex flex-col md:text-right gap-4 font-sans text-xs tracking-widest uppercase text-gesso/50">
          <a href="#" className="hover:text-gesso transition-colors md:cursor-none">Instagram</a>
          <a href="#" className="hover:text-gesso transition-colors md:cursor-none">LinkedIn</a>
          <a href="#" className="hover:text-gesso transition-colors md:cursor-none">Pinterest</a>
        </div>

      </div>

      <div className="max-w-[1400px] mx-auto mt-24 pt-8 border-t border-white/10 flex flex-col-reverse md:flex-row justify-between items-center gap-6 font-sans text-[0.65rem] tracking-[0.2em] uppercase text-gesso/40">
        <div className="text-center md:text-left">
          &copy; {new Date().getFullYear()} Clara Moura Arquitetura. Todos os direitos reservados.
        </div>
        <button 
          onClick={handleBackToTop}
          className="hover:text-gesso transition-colors md:cursor-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gesso"
        >
          Voltar ao topo
        </button>
      </div>
    </footer>
  )
}
