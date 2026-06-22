'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useForm, UseFormRegisterReturn } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { MagneticButton } from '../MagneticButton'

gsap.registerPlugin(ScrollTrigger)

const METHODOLOGY = [
  {
    number: '01',
    title: 'Escuta',
    description:
      'Todo projeto começa em silêncio. Ouvimos o lugar, suas memórias, os desejos de quem o habitará.',
  },
  {
    number: '02',
    title: 'Matéria',
    description:
      'Concreto, madeira, pedra, luz. Cada material é escolhido por sua honestidade, pela forma como envelhece com dignidade.',
  },
  {
    number: '03',
    title: 'Tempo',
    description:
      'Projetos não se concluem na entrega. Eles amadurecem. Desenhamos para o presente e para o que ainda virá.',
  },
]

const contactSchema = z.object({
  name: z.string().min(2, 'O nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Insira um e-mail válido'),
  projectType: z.string().min(3, 'Especifique o tipo de projeto'),
  message: z.string().min(10, 'A mensagem deve ter pelo menos 10 caracteres'),
})

type ContactFormData = z.infer<typeof contactSchema>

function AnimatedInput({
  label,
  type = 'text',
  multiline = false,
  registration,
  error,
}: {
  label: string
  type?: string
  multiline?: boolean
  registration: UseFormRegisterReturn
  error?: string
}) {
  const [focused, setFocused] = useState(false)
  const [filled, setFilled] = useState(false)

  // Determine line color based on error/focus state
  const lineColor = error ? 'bg-red-500/70' : 'bg-gesso'
  const labelColor = error
    ? 'text-red-500/70'
    : focused
    ? 'text-gesso/60'
    : 'text-gesso/30'

  return (
    <div className="relative mb-8">
      {/* Label and Error Message container */}
      <div className="flex justify-between items-baseline mb-1">
        <label
          className={`block font-sans text-[0.7rem] tracking-[0.2em] uppercase transition-colors duration-300 ease-out ${labelColor}`}
        >
          {label}
        </label>
        {error && (
          <span className="font-sans text-[0.65rem] tracking-wide text-red-400/80 uppercase">
            {error}
          </span>
        )}
      </div>

      {/* Input or textarea */}
      {multiline ? (
        <textarea
          rows={4}
          {...registration}
          className="w-full bg-transparent border-none outline-none text-gesso font-sans text-[0.95rem] font-light py-3 resize-none leading-relaxed focus-visible:outline-none"
          onFocus={(e) => {
            registration.onBlur(e)
            setFocused(true)
          }}
          onBlur={(e) => {
            registration.onBlur(e)
            setFocused(false)
            setFilled(e.target.value.length > 0)
          }}
          onChange={(e) => {
            registration.onChange(e)
            setFilled(e.target.value.length > 0)
          }}
        />
      ) : (
        <input
          type={type}
          {...registration}
          className="w-full bg-transparent border-none outline-none text-gesso font-sans text-[0.95rem] font-light py-3 leading-relaxed focus-visible:outline-none"
          onFocus={(e) => {
            registration.onBlur(e)
            setFocused(true)
          }}
          onBlur={(e) => {
            registration.onBlur(e)
            setFocused(false)
            setFilled(e.target.value.length > 0)
          }}
          onChange={(e) => {
            registration.onChange(e)
            setFilled(e.target.value.length > 0)
          }}
        />
      )}

      {/* Static thin line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gesso/15" />

      {/* Active expanding line — grows from center */}
      <div
        className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] ${lineColor} transition-all duration-400 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]`}
        style={{ width: focused || filled || error ? '100%' : '0%' }}
      />
    </div>
  )
}

export function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const methodologyRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onTouched',
  })

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    // Content reveal
    const items = section.querySelectorAll('.reveal-item')
    gsap.set(items, { opacity: 0, y: 30 })
    gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: 0.85,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 65%',
        once: true,
      },
    })
  }, [])

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    console.log('Form data:', data)
    setIsSubmitting(false)
    setSubmitSuccess(true)
    reset()

    // Reset success message after 5 seconds
    setTimeout(() => setSubmitSuccess(false), 5000)
  }

  return (
    <section
      id="contato"
      ref={sectionRef}
      className="relative bg-charcoal pt-[120px] pb-[80px] px-6 md:px-12"
    >
      {/* Smooth color transition from off-white to dark */}
      <div className="absolute -top-[200px] left-0 right-0 h-[200px] bg-gradient-to-b from-gesso to-charcoal pointer-events-none z-10" />

      {/* Thin top border */}
      <div className="absolute top-0 left-6 right-6 md:left-12 md:right-12 h-[1px] bg-gesso/10" />

      {/* Main grid */}
      <div
        ref={innerRef}
        className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 max-w-[1200px] mx-auto relative z-20"
      >
        {/* Left: methodology */}
        <div ref={methodologyRef}>
          <div className="reveal-item font-sans text-[0.7rem] tracking-[0.22em] text-gesso/30 uppercase mb-12">
            Metodologia
          </div>

          <h2 className="reveal-item font-sans font-light text-[clamp(2.2rem,4vw,3.5rem)] text-gesso m-0 mb-16 leading-tight tracking-tight">
            Como trabalhamos
          </h2>

          <div className="flex flex-col gap-0">
            {METHODOLOGY.map((item, i) => (
              <div
                key={i}
                className="reveal-item py-8 border-t border-gesso/10 grid grid-cols-[48px_1fr] gap-6 items-start"
              >
                <span className="font-sans text-[0.72rem] text-gesso/30 tracking-[0.1em] pt-1">
                  {item.number}
                </span>
                <div>
                  <div className="font-sans text-[1.4rem] font-normal text-gesso mb-2 tracking-[0.02em]">
                    {item.title}
                  </div>
                  <div className="font-sans text-[0.87rem] font-light text-gesso/50 leading-relaxed">
                    {item.description}
                  </div>
                </div>
              </div>
            ))}

            {/* Last border */}
            <div className="border-t border-gesso/10 pt-0" />
          </div>
        </div>

        {/* Right: contact form */}
        <div ref={formRef} className="md:pt-[60px]">
          <div className="reveal-item font-sans font-light text-[1.1rem] italic text-gesso/55 mb-14 leading-relaxed">
            "Cada grande obra começa com uma conversa simples. Vamos começar a nossa."
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <AnimatedInput
              label="Nome"
              registration={register('name')}
              error={errors.name?.message}
            />
            <AnimatedInput
              label="E-mail"
              type="email"
              registration={register('email')}
              error={errors.email?.message}
            />
            <AnimatedInput
              label="Tipo de projeto"
              registration={register('projectType')}
              error={errors.projectType?.message}
            />
            <AnimatedInput
              label="Sua mensagem"
              multiline
              registration={register('message')}
              error={errors.message?.message}
            />

            <div className="mt-8">
              <MagneticButton strength={25}>
                <button
                  type="submit"
                  disabled={isSubmitting || submitSuccess}
                  className="w-full bg-transparent border border-gesso/35 px-12 py-4 font-sans text-[0.78rem] tracking-[0.22em] uppercase text-gesso md:cursor-none transition-all duration-300 ease-out hover:bg-gesso hover:text-charcoal block disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-gesso focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gesso"
                >
                  {isSubmitting
                    ? 'Enviando...'
                    : submitSuccess
                    ? 'Mensagem enviada com sucesso!'
                    : 'Enviar mensagem'}
                </button>
              </MagneticButton>
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-32 pt-10 border-t border-gesso/10 flex flex-col md:flex-row md:justify-between items-center max-w-[1200px] mx-auto gap-6 md:gap-0 relative z-20">
        <div className="font-sans text-[1.3rem] font-normal text-gesso/60 tracking-[0.05em]">
          Clara Moura
        </div>
        <div className="font-sans text-[0.72rem] tracking-[0.12em] text-gesso/25">
          © 2026 · São Paulo, Brasil
        </div>
        <div className="flex gap-7">
          {['Instagram', 'LinkedIn', 'Behance'].map((s) => (
            <MagneticButton key={s} strength={15}>
              <a
                href="#"
                className="font-sans text-[0.72rem] tracking-[0.12em] text-gesso/30 no-underline uppercase transition-colors duration-300 ease-out hover:text-gesso/80 md:cursor-none block py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gesso focus-visible:rounded"
              >
                {s}
              </a>
            </MagneticButton>
          ))}
        </div>
      </div>
    </section>
  )
}
