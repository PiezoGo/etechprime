import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { type GalleryImage, fetchGallery } from '../api'
import PageTransition from '../components/PageTransition'

const animProjects = [
  {
    title: 'Pulse',
    type: '2D Animation',
    year: '2024',
    description: 'A kinetic short exploring the rhythm of everyday life through hand-drawn frames and layered soundscapes.',
  },
  {
    title: 'Echoes',
    type: '3D Animation',
    year: '2024',
    description: '3D animated short set in a surreal dreamscape — built in Blender with custom shaders and procedural environments.',
  },
  {
    title: 'Motion Reel 2024',
    type: 'Motion Graphics',
    year: '2024',
    description: 'A compilation of motion graphics, title sequences and visual effects produced throughout the academic year.',
  },
]

export default function Animation() {
  const [gallery, setGallery] = useState<GalleryImage[]>([])

  useEffect(() => {
    fetchGallery().then(imgs => setGallery(imgs.slice(5, 13)))
  }, [])

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
            Animation
          </h1>
          <p className="text-ink-muted text-sm mt-4 max-w-lg leading-relaxed">
            Bringing worlds to life through motion — 2D/3D animation, motion graphics and interactive visual experiences.
          </p>
        </motion.div>

        {/* Stills grid */}
        {gallery.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24">
            {gallery.map((img, i) => (
              <motion.div
                key={img.id}
                className="img-hover aspect-square cursor-pointer"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <img src={img.url} alt={img.alt} className="w-full h-full object-cover" loading="lazy" />
              </motion.div>
            ))}
          </div>
        )}

        {/* Embedded YouTube reel */}
        <div className="mb-24">
          <p className="section-label mb-8">Animation Reel</p>
          <div className="aspect-video w-full max-w-4xl mx-auto bg-cream-dark overflow-hidden">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed?listType=user_uploads&list=EtechStudioz&index=1"
              title="Antigravity Animation Reel"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        {/* Projects list */}
        <div>
          <p className="section-label mb-10">Projects</p>
          <div className="space-y-0">
            {animProjects.map((proj, i) => (
              <motion.div
                key={proj.title}
                className="border-t border-ink-faint/50 py-8 grid md:grid-cols-12 gap-4 items-start hover:opacity-80 transition-opacity cursor-pointer"
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
