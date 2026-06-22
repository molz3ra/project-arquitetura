import Link from 'next/link'
import Image from 'next/image'
import { CustomCursor } from '@/components/CustomCursor'

// In a real app, this would be fetched from a database
type Project = {
  title: string
  year: string
  category: string
  location: string
  area: string
  client?: string
  awards?: string
  imageUrl: string
  description: string
  gallery: string[]
  nextProject?: { id: string; title: string }
}

const PROJECTS_DB: Record<string, Project> = {
  'casa-dos-pinheiros': {
    title: 'Casa dos Pinheiros',
    year: '2023',
    category: 'Residencial',
    location: 'Campos do Jordão, SP',
    area: '450m²',
    client: 'Família Martins',
    awards: 'Menção Honrosa IAB-SP 2023',
    imageUrl: 'https://images.unsplash.com/photo-1682184805271-11671b7ecf4c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
    description: 'Um refúgio na serra desenhado para se camuflar na paisagem. A estrutura em madeira carbonizada e panos de vidro cria uma relação fluida entre o abrigo e a floresta de araucárias.',
    gallery: [
      'https://images.unsplash.com/photo-1510627489930-0c1b0bfb6785?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
    ],
    nextProject: { id: 'instituto-cultural-mira', title: 'Instituto Cultural Mira' }
  },
  'instituto-cultural-mira': {
    title: 'Instituto Cultural Mira',
    year: '2022',
    category: 'Cultural',
    location: 'São Paulo, SP',
    area: '1200m²',
    client: 'Fundação Mira',
    awards: 'Prêmio APCA de Arquitetura',
    imageUrl: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
    description: 'Um espaço de exposições que desafia a gravidade. Volumes suspensos em concreto aparente filtram a luz natural, criando atmosferas contemplativas para a arte contemporânea. O uso do espaço negativo permite que o edifício respire no denso tecido urbano paulistano.',
    gallery: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
    ],
    nextProject: { id: 'apartamento-higienopolis', title: 'Apartamento Higienópolis' }
  },
  'apartamento-higienopolis': {
    title: 'Apartamento Higienópolis',
    year: '2021',
    category: 'Residencial',
    location: 'São Paulo, SP',
    area: '280m²',
    client: 'Confidencial',
    awards: 'Destaque CASACOR 2021',
    imageUrl: 'https://images.unsplash.com/photo-1724582586495-d050726cf354?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
    description: 'A reforma respeita a planta modernista original dos anos 60, removendo excessos para revelar a estrutura primária. Marcenaria em nogueira e piso em granilite ditam a materialidade, trazendo um respiro minimalista para um clássico paulistano.',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
    ],
    nextProject: { id: 'torre-faria-lima', title: 'Torre Faria Lima' }
  },
  'torre-faria-lima': {
    title: 'Torre Faria Lima',
    year: '2023',
    category: 'Corporativo',
    location: 'São Paulo, SP',
    area: '15.000m²',
    client: 'XP Properties',
    awards: 'LEED Platinum',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
    description: 'Arquitetura corporativa focada no bem-estar e na transparência. As varandas intercaladas trazem o verde para a elevação, humanizando a escala vertical da avenida. Sistemas passivos de sombreamento garantem eficiência energética máxima.',
    gallery: [
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
    ],
    nextProject: { id: 'casa-dos-pinheiros', title: 'Casa dos Pinheiros' }
  },
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const project = PROJECTS_DB[id]

  if (!project) {
    return (
      <div className="min-h-screen bg-gesso flex items-center justify-center">
        <h1 className="font-sans font-light text-2xl text-charcoal">Projeto não encontrado.</h1>
      </div>
    )
  }

  return (
    <main className="bg-gesso min-h-screen text-charcoal">
      <CustomCursor />
      
      {/* Hero Image */}
      <section className="relative h-[80vh] w-full bg-charcoal">
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </section>

      {/* Project Details */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-12 mt-16 md:mt-32 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 md:gap-24">
          
          {/* Info Column */}
          <div className="order-2 md:order-1">
            <div className="flex flex-col gap-8">
              <div>
                <div className="font-sans text-[0.65rem] tracking-[0.2em] text-charcoal/40 uppercase mb-2">Categoria</div>
                <div className="font-sans text-[0.95rem] text-charcoal/80">{project.category}</div>
              </div>
              <div>
                <div className="font-sans text-[0.65rem] tracking-[0.2em] text-charcoal/40 uppercase mb-2">Localização</div>
                <div className="font-sans text-[0.95rem] text-charcoal/80">{project.location}</div>
              </div>
              <div>
                <div className="font-sans text-[0.65rem] tracking-[0.2em] text-charcoal/40 uppercase mb-2">Área</div>
                <div className="font-sans text-[0.95rem] text-charcoal/80">{project.area}</div>
              </div>
              <div>
                <div className="font-sans text-[0.65rem] tracking-[0.2em] text-charcoal/40 uppercase mb-2">Ano</div>
                <div className="font-sans text-[0.95rem] text-charcoal/80">{project.year}</div>
              </div>
              {project.client && (
                <div>
                  <div className="font-sans text-[0.65rem] tracking-[0.2em] text-charcoal/40 uppercase mb-2">Cliente</div>
                  <div className="font-sans text-[0.95rem] text-charcoal/80">{project.client}</div>
                </div>
              )}
              {project.awards && (
                <div>
                  <div className="font-sans text-[0.65rem] tracking-[0.2em] text-charcoal/40 uppercase mb-2">Prêmios</div>
                  <div className="font-sans text-[0.95rem] text-charcoal/80">{project.awards}</div>
                </div>
              )}
            </div>
          </div>

          {/* Description Column */}
          <div className="order-1 md:order-2">
            <h1 className="font-sans font-light text-[clamp(2.5rem,5vw,4.5rem)] tracking-tight leading-none mb-10 md:mb-16">
              {project.title}
            </h1>
            <p className="font-sans font-light text-[1.2rem] md:text-[1.5rem] leading-relaxed text-charcoal/80">
              {project.description}
            </p>
          </div>

        </div>
      </section>

      {/* Extended Gallery Grid */}
      {project.gallery && (
        <section className="px-6 md:px-12 max-w-[1400px] mx-auto pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.gallery.map((img: string, idx: number) => (
              <div key={idx} className={`relative ${idx === 0 ? 'h-[60vh]' : 'h-[50vh] md:mt-24'}`}>
                <Image
                  src={img}
                  alt={`Detalhe do projeto ${project.title}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Next Project Footer */}
      {project.nextProject && (
        <Link href={`/projeto/${project.nextProject.id}`} className="block group md:cursor-none focus-visible:outline-none">
          <section className="bg-charcoal text-gesso py-24 md:py-32 px-6 md:px-12 flex flex-col items-center justify-center text-center transition-colors duration-500 hover:bg-[#1a1a1a]">
            <div className="font-sans text-[0.7rem] tracking-[0.2em] uppercase text-gesso/40 mb-6">Próximo Projeto</div>
            <h2 className="font-sans font-light text-[clamp(2rem,6vw,4.5rem)] tracking-tight group-hover:opacity-80 transition-opacity">
              {project.nextProject.title}
            </h2>
          </section>
        </Link>
      )}
    </main>
  )
}
