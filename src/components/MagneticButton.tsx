'use client'

import React, { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  strength?: number
  as?: React.ElementType
}

export function MagneticButton({
  children,
  className = '',
  strength = 40,
  as: Component = 'div',
  ...props
}: MagneticButtonProps & React.HTMLAttributes<HTMLElement>) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY } = e
    const { height, width, left, top } = ref.current!.getBoundingClientRect()
    
    // Calculate center
    const middleX = clientX - (left + width / 2)
    const middleY = clientY - (top + height / 2)
    
    setPosition({ x: middleX * (strength / 100), y: middleY * (strength / 100) })
  }

  const reset = () => {
    setPosition({ x: 0, y: 0 })
  }

  const ComponentToRender = Component as any

  return (
    <ComponentToRender
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      className={className}
      {...props}
    >
      <motion.div
        animate={{ x: position.x, y: position.y }}
        transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      >
        {children}
      </motion.div>
    </ComponentToRender>
  )
}
