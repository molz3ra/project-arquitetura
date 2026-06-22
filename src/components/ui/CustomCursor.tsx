'use client'

import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

interface CustomCursorProps {
  isHovering: boolean
}

export function CustomCursor({ isHovering }: CustomCursorProps) {
  const mx = useMotionValue(-100)
  const my = useMotionValue(-100)

  // Tight spring for the dot — fast follow
  const dotX = useSpring(mx, { damping: 22, stiffness: 450, mass: 0.5 })
  const dotY = useSpring(my, { damping: 22, stiffness: 450, mass: 0.5 })

  // Looser spring for the trailing ring
  const ringX = useSpring(mx, { damping: 30, stiffness: 200, mass: 0.8 })
  const ringY = useSpring(my, { damping: 30, stiffness: 200, mass: 0.8 })

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mx.set(e.clientX)
      my.set(e.clientY)
    }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [mx, my])

  return (
    <>
      {/* Main cursor dot — expands with "Explorar" on gallery hover */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full flex items-center justify-center overflow-hidden hidden md:flex"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovering ? 88 : 10,
          height: isHovering ? 88 : 10,
          backgroundColor: isHovering ? 'rgba(245,242,238,0.94)' : '#1A1A1A',
          border: isHovering
            ? '1px solid rgba(26,26,26,0.25)'
            : '1px solid transparent',
        }}
        transition={{ duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <motion.span
          className="font-sans text-[11px] tracking-[0.12em] text-charcoal select-none whitespace-nowrap uppercase"
          animate={{ opacity: isHovering ? 1 : 0, scale: isHovering ? 1 : 0.6 }}
          transition={{ duration: 0.25, delay: isHovering ? 0.1 : 0 }}
        >
          Explorar
        </motion.span>
      </motion.div>

      {/* Trailing ring — slightly delayed, disappears on hover expansion */}
      <motion.div
        className="fixed top-0 left-0 w-9 h-9 rounded-full border border-charcoal/30 pointer-events-none z-[9998] hidden md:block"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{ opacity: isHovering ? 0 : 0.6, scale: isHovering ? 0.3 : 1 }}
        transition={{ duration: 0.3 }}
      />
    </>
  )
}
