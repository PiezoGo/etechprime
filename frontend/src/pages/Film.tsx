import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { type GalleryImage, fetchGallery } from '../api'
import PageTransition from '../components/PageTransition'

const FILM_IMAGES = [
  '/static/etech studioz-47.jpg',
  '/static/etech studioz-91.jpg',
  '/static/etech studioz-63.jpg',
  '/static/etech studioz-39.jpg',
]

const filmProjects = [
  {
    title: 'Into the Frame',
    type: 'Short Film',
    year: '2024',
    description: 'A cinematic exploration of urban youth identity in Nairobi — shot on location across the city over three weeks.',
  },
  {
    title: 'Voices Unheard',
    type: 'Documentary',
    year: '2024',
    description: 'A documentary short profiling young creatives in Kenya breaking into the film and digital media industry.',
  },
  {
    title: 'The In-Between',
    type: 'Narrative Film',
    year: '2023',
    description: 'A contemplative narrative about transition, memory and belonging — a final-year thesis film at Multimedia University Kenya.',
  },
]

export default function Film() {
  const [gallery, setGallery] = useState<GalleryImage[]>([])

  useEffect(() => {
    fetchGallery().then(imgs => setGallery(imgs.slice(0, 4)))
  }, [])

  const displayImages = gallery.length > 0 ? gallery.map(g => g.url) : FILM_IMAGES

  return (
    <PageTransition>
      <div className="pt-32 pb-24 max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <p className="section-label mb-4">Discipline</p>
          <h1 className="font-serif text-5xl md:text-6xl text-ink leading-tight">
            Film Production
          </h1>
          <p className="text-ink-muted text-sm mt-4 max-w-lg leading-relaxed">
            From conception to final cut — directing, cinematography, editing and production design for short films, documentaries and narrative features.
          </p>
        </motion.div>

        {/* Hero image full-bleed */}
        <motion.div
          className="img-hover mb-4 aspect-[16/7]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9 }}
        >
          <img src={displayImages[0]} alt="Film Production" className="w-full h-full object-cover" />
        </motion.div>

        {/* Three images below */}
        <div className="grid grid-cols-3 gap-4 mb-24">
          {displayImages.slice(1, 4).map((src, i) => (
            <motion.div
              key={i}
              className="img-hover aspect-[4/3]"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
            </motion.div>
          ))}
        </div>

        {/* Projects list */}
        <div>
          <p className="section-label mb-10">Projects</p>
          <div className="space-y-0">
            {filmProjects.map((proj, i) => (
              <motion.div
                key={proj.title}
                className="border-t border-ink-faint/50 py-8 grid md:grid-cols-12 gap-4 items-start group hover:opacity-80 transition-opacity cursor-pointer"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="md:col-span-1">
                  <span className="section-label">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <div className="md:col-span-5">
                  <h3 className="font-serif text-2xl text-ink">{proj.title}</h3>
                </div>
                <div className="md:col-span-2">
                  <span className="section-label">{proj.type}</span>
                </div>
                <div className="md:col-span-3">
                  <p className="text-ink-soft text-sm leading-relaxed">{proj.description}</p>
                </div>
                <div className="md:col-span-1 text-right">
                  <span className="section-label">{proj.year}</span>
                </div>
              </motion.div>
            ))}
            <div className="border-t border-ink-faint/50" />
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
