import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { type GalleryImage, type Project, fetchGallery, fetchProjects } from '../api'
import PageTransition from '../components/PageTransition'

export default function Work() {
  const [gallery, setGallery] = useState<GalleryImage[]>([])
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    fetchGallery().then(imgs => setGallery(imgs))
    fetchProjects().then(setProjects)
  }, [])

  const featured = gallery.slice(0, 3)
  const rest = gallery.slice(3, 15)

  return (
    <PageTransition>
      <div className="pt-32 pb-24">
        {/* Hero row */}
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-20"
          >
            <p className="section-label mb-4">Portfolio</p>
            <h1 className="font-serif text-5xl md:text-6xl text-ink">
              Selected Work
            </h1>
          </motion.div>

          {/* Large featured strip */}
          {featured.length > 0 && (
            <div className="grid md:grid-cols-12 gap-4 mb-4">
              <motion.div
                className="md:col-span-7 img-hover aspect-[4/3] cursor-pointer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <img src={featured[0]?.url} alt="" className="w-full h-full object-cover" />
              </motion.div>
              <div className="md:col-span-5 flex flex-col gap-4">
                {featured.slice(1, 3).map((img, i) => (
                  <motion.div
                    key={img.id}
                    className="img-hover flex-1 cursor-pointer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.15 * (i + 1) }}
                  >
                    <img src={img.url} alt="" className="w-full h-full object-cover" />
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Secondary grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
            {rest.map((img, i) => (
              <motion.div
                key={img.id}
                className="img-hover aspect-square cursor-pointer"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
              >
                <img src={img.url} alt={img.alt} className="w-full h-full object-cover" loading="lazy" />
              </motion.div>
            ))}
          </div>

          {/* Projects from DB */}
          {projects.length > 0 && (
            <>
              <div className="flex items-center justify-between mb-10">
                <p className="section-label">Projects</p>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                {projects.map(project => (
                  <motion.div
                    key={project.id}
                    className="group border-t border-ink-faint/50 pt-6"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    {project.cover_image_url && (
                      <div className="img-hover mb-4 aspect-video">
                        <img src={project.cover_image_url} alt={project.title} className="w-full h-full object-cover" loading="lazy" />
                      </div>
                    )}
                    <p className="section-label mb-2">{project.category?.name}</p>
                    <h3 className="font-serif text-xl text-ink mb-2">{project.title}</h3>
                    <p className="text-ink-muted text-sm leading-relaxed">{project.description}</p>
                  </motion.div>
                ))}
              </div>
            </>
          )}

          {/* Links to sub-sections */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-ink-faint/40 pt-16">
            {[
              { to: '/photography', label: 'Photography', desc: 'Browse the full photo gallery' },
              { to: '/film', label: 'Film Production', desc: 'Narrative & documentary cinema' },
              { to: '/animation', label: 'Animation', desc: '2D/3D motion & digital art' },
            ].map(({ to, label, desc }) => (
              <Link
                key={to}
                to={to}
                className="group flex flex-col gap-2 hover:opacity-70 transition-opacity"
              >
                <span className="font-serif text-2xl text-ink">{label}</span>
                <span className="text-ink-muted text-sm">{desc}</span>
                <span className="nav-link mt-2">Explore →</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
