'use client'

import { useRef, useState, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'

// Shader Material
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform float uHover;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;

    // Edge proximity: 0 at edges, 1 at center
    float ex = min(uv.x, 1.0 - uv.x);
    float ey = min(uv.y, 1.0 - uv.y);
    float edge = 1.0 - smoothstep(0.0, 0.2, min(ex, ey));

    // Distortion strength: stronger at edges, amplified by hover
    float str = edge * (0.005 + uHover * 0.016);

    // Animated wave distortion
    float nx = sin(uv.y * 11.0 + uTime * 0.9) * str;
    float ny = cos(uv.x * 9.0  + uTime * 0.7) * str;

    vec2 distUV = vec2(uv.x + nx, uv.y + ny);

    // Chromatic aberration: R and B channels shift in opposite directions
    float ca = str * 0.45;
    float r = texture2D(uTexture, clamp(distUV + vec2(ca, 0.0),  0.001, 0.999)).r;
    float g = texture2D(uTexture, clamp(distUV,                  0.001, 0.999)).g;
    float b = texture2D(uTexture, clamp(distUV - vec2(ca, 0.0),  0.001, 0.999)).b;

    gl_FragColor = vec4(r, g, b, 1.0);
  }
`

function RefractionImage({ url, hovered }: { url: string; hovered: boolean }) {
  const texture = useTexture(url)
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  
  // Custom uniforms
  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uTime: { value: 0 },
      uHover: { value: 0 },
    }),
    [texture]
  )

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
      // Smooth interpolation for hover state
      const targetHover = hovered ? 1 : 0
      materialRef.current.uniforms.uHover.value += (targetHover - materialRef.current.uniforms.uHover.value) * 0.07
    }
  })

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  )
}

interface ProjectCardProps {
  imageUrl: string
  title: string
  year: string
  category: string
  large?: boolean
  onHoverChange?: (hovering: boolean) => void
}

import { Suspense } from 'react'

export function ProjectCard({
  imageUrl,
  title,
  year,
  category,
  large = false,
  onHoverChange,
}: ProjectCardProps) {
  const [hovered, setHovered] = useState(false)

  const handleMouseEnter = () => {
    setHovered(true)
    onHoverChange?.(true)
  }

  const handleMouseLeave = () => {
    setHovered(false)
    onHoverChange?.(false)
  }

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden md:cursor-none bg-[#C8C0B8] ${large ? 'h-[360px] md:h-[560px]' : 'h-[360px]'}`}
    >
      <Canvas
        orthographic
        camera={{ position: [0, 0, 1], zoom: 1 }}
        style={{ width: '100%', height: '100%' }}
        gl={{ antialias: false, alpha: false }}
      >
        <Suspense fallback={null}>
          <RefractionImage url={imageUrl} hovered={hovered} />
        </Suspense>
      </Canvas>

      {/* Info overlay */}
      <div
        className={`absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-300 ease-out ${hovered ? 'opacity-100' : 'opacity-85'}`}
      >
        <div className="font-sans text-[0.65rem] md:text-[0.72rem] tracking-[0.2em] text-white/65 uppercase mb-1 md:mb-2">
          {category} · {year}
        </div>
        <div className="font-sans font-light text-xl md:text-[1.45rem] tracking-[0.01em] text-white">
          {title}
        </div>
      </div>

      {/* Subtle border on hover */}
      <div
        className={`absolute inset-0 border transition-colors duration-300 ease-out pointer-events-none ${hovered ? 'border-white/20' : 'border-transparent'}`}
      />
    </div>
  )
}
