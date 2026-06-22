'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface CustomCursorProps {
  isHovering?: boolean
}

export function CustomCursor({ isHovering = false }: CustomCursorProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  
  // Spring configuration for smooth delay
  const cursorX = useRef(0)
  const cursorY = useRef(0)
  const [dotPos, setDotPos] = useState({ x: 0, y: 0 })
  const requestRef = useRef<number>(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [isVisible])

  // Smooth animation loop for the main dot
  useEffect(() => {
    const animate = () => {
      // Lerp (Linear Interpolation) for smooth following
      cursorX.current += (mousePosition.x - cursorX.current) * 0.15
      cursorY.current += (mousePosition.y - cursorY.current) * 0.15
      
      setDotPos({ x: cursorX.current, y: cursorY.current })
      requestRef.current = requestAnimationFrame(animate)
    }
    
    requestRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(requestRef.current!)
  }, [mousePosition])

  if (typeof window !== 'undefined' && window.innerWidth < 768) return null

  return (
    <>
      {/* Main cursor dot — expands with "Explorar" on gallery hover */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full flex items-center justify-center overflow-hidden"
        style={{ mixBlendMode: 'difference' }}
        animate={{
          x: dotPos.x - (isHovering ? 45 : 4),
          y: dotPos.y - (isHovering ? 45 : 4),
          width: isHovering ? 90 : 8,
          height: isHovering ? 90 : 8,
          backgroundColor: isHovering ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 1)',
          opacity: isVisible ? 1 : 0
        }}
        transition={{
          type: 'tween',
          ease: 'circOut',
          duration: 0.15
        }}
      >
        <motion.span
          className="font-sans text-[0.65rem] tracking-[0.2em] uppercase font-medium whitespace-nowrap text-black"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: isHovering ? 1 : 0,
            scale: isHovering ? 1 : 0.8
          }}
          transition={{ duration: 0.2, delay: isHovering ? 0.1 : 0 }}
        >
          Explorar
        </motion.span>
      </motion.div>

      {/* Trailing ring (only visible when not hovering) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border border-charcoal/20"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          width: 40,
          height: 40,
          opacity: (isVisible && !isHovering) ? 1 : 0,
          scale: isHovering ? 0 : 1
        }}
        transition={{
          type: 'spring',
          stiffness: 150,
          damping: 20,
          mass: 0.5
        }}
      />
    </>
  )
}
