'use client'

import { useState } from 'react'
import { CustomCursor } from '@/components/CustomCursor'
import { HeroSection } from '@/components/sections/HeroSection'
import { ManifestoSection } from '@/components/sections/ManifestoSection'
import { GallerySection } from '@/components/sections/GallerySection'
import { ContactSection } from '@/components/sections/ContactSection'
import { ExpertiseSection } from '@/components/sections/ExpertiseSection'

export default function Home() {
  const [cursorHovering, setCursorHovering] = useState(false)

  return (
    <div className="bg-gesso overflow-x-hidden cursor-auto md:cursor-none min-h-screen">
      <CustomCursor isHovering={cursorHovering} />
      <HeroSection />
      <ManifestoSection />
      <ExpertiseSection />
      <GallerySection onCursorChange={setCursorHovering} />
      <ContactSection />
    </div>
  )
}
