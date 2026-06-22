'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLenis } from 'lenis/react'

export function Preloader() {
  const [progress, setProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const lenis = useLenis()

  // Lock scroll when preloader is active
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden'
      lenis?.stop()
    } else {
      document.body.style.overflow = ''
      lenis?.start()
    }
  }, [isLoading, lenis])

  // Fake progress simulation
  useEffect(() => {
    let currentProgress = 0
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 15) + 5
      if (currentProgress >= 100) {
        currentProgress = 100
        clearInterval(interval)
        setTimeout(() => {
          setIsLoading(false)
        }, 500)
      }
      setProgress(currentProgress)
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] bg-charcoal text-gesso flex flex-col items-center justify-center pointer-events-none"
        >
          <div className="overflow-hidden mb-6">
            <motion.h1 
              initial={{ y: '100%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-sans font-light text-[clamp(2.5rem,5vw,4.5rem)] tracking-tight leading-none"
            >
              Clara Moura
            </motion.h1>
          </div>
          <div className="font-sans text-xs tracking-[0.2em] font-medium opacity-50">
            {progress}%
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
