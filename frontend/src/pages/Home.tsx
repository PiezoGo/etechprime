import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { type GalleryImage, fetchGallery } from '../api'
import PageTransition from '../components/PageTransition'

const HERO_IMAGE = '/static/ETECH STUDIOZ 0742132778-2.jpg'
const FEATURED_IMAGES = [
  '/static/ETECH STUDIOZ 0742132778-4.jpg',
  '/static/ETECH STUDIOZ 0742132778-7.jpg',
  '/static/ETECH STUDIOZ 0742132778-11.jpg',
  '/static/ETECH STUDIOZ 0742132778-17.jpg',
  '/static/ETECH STUDIOZ 0742132778-19.jpg',
  '/static/ETECH STUDIOZ 0742132778-22.jpg',
]

export default function Home() {
  const [gallery, setGallery] = useState<GalleryImage[]>([])

  useEffect(() => {
    fetchGallery().then(imgs => setGallery(imgs.slice(0, 12)))
  }, [])

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative h-screen flex items-end pb-16 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: 'easeOut' }}
        >
          <img
            src={HERO_IMAGE}
            alt="ETECH Studioz Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-cream/80" />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.9 }}
          >
            <p className="section-label mb-4 text-ink/60">ETECH Studioz</p>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-ink leading-none tracking-tight">
              Film · Animation<br />
              <span className="italic">Photography</span>
            </h1>
            <p className="mt-6 text-ink-muted text-sm tracking-wide max-w-md">
              Multimedia University Kenya — Visual storytelling through cinema, motion and light.
            </p>
            <div className="mt-10 flex gap-6">
              <Link to="/work" className="btn-outline">View Work</Link>
              <Link to="/about" className="nav-link self-center">About →</Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-6 right-8 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <span className="section-label">Scroll</span>
          <motion.div
            className="w-px h-12 bg-ink-muted"
            animate={{ scaleY: [1, 0.3, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            style={{ originY: 0 }}
          />
        </motion.div>
      </section>

      {/* Intro text */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <p className="section-label mb-6">About the Studio</p>
            <h2 className="font-serif text-3xl md:text-4xl text-ink leading-snug">
              Crafting visual stories<br />
              <span className="italic">with purpose and beauty</span>
            </h2>
          </div>
          <div className="md:col-span-6 md:col-start-7 pt-2">
            <p className="text-ink-soft leading-relaxed text-sm mb-4">
              ETECH Studioz is the creative space of a Film Production & Animation student at Multimedia University Kenya — a photographer, filmmaker, and YouTube content creator dedicated to crafting compelling visual narratives.
            </p>
            <p className="text-ink-soft leading-relaxed text-sm mb-8">
              Every frame is intentional. Every story, personal. From documentary cinematography to animated shorts, the work spans across disciplines unified by a singular devotion to the image.
            </p>
            <Link to="/about" className="nav-link">Read full bio →</Link>
          </div>
        </div>
      </section>

      {/* Featured grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-24">
        <div className="flex items-center justify-between mb-10">
          <p className="section-label">Selected Work</p>
          <Link to="/work" className="nav-link">View all →</Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {(gallery.length > 0 ? gallery.slice(0, 6).map(img => img.url) : FEATURED_IMAGES).map(
            (url, i) => (
              <motion.div
                key={i}
                className="img-hover aspect-[3/4] cursor-pointer"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
              >
                <img
                  src={url}
                  alt={`Featured work ${i + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </motion.div>
            )
          )}
        </div>

        <div className="mt-12 text-center">
          <Link to="/photography" className="btn-outline">Explore Photography</Link>
        </div>
      </section>

      {/* Services strip */}
      <section className="border-t border-b border-ink-faint/40 py-16 mb-0">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { label: 'Film Production', desc: 'Cinematography, direction and post-production for narrative and documentary projects.' },
              { label: 'Animation', desc: '2D & 3D animation, motion graphics and visual effects for screen and digital media.' },
              { label: 'Photography', desc: 'Portrait, editorial and event photography with a distinctive cinematic eye.' },
            ].map(({ label, desc }) => (
              <div key={label}>
                <p className="section-label mb-4">{label}</p>
                <p className="text-ink-soft text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* YouTube CTA */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24 text-center">
        <p className="section-label mb-4">YouTube Channel</p>
        <h2 className="font-serif text-4xl md:text-5xl text-ink mb-6">
          Watch <span className="italic">@EtechStudioz</span>
        </h2>
        <p className="text-ink-muted text-sm max-w-md mx-auto mb-10">
          Tutorials, behind-the-scenes and full productions on YouTube. Subscribe to follow the creative journey.
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/youtube" className="btn-outline">View Videos</Link>
          <a
            href="https://www.youtube.com/@EtechStudioz"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link self-center"
          >
            Open YouTube →
          </a>
        </div>
      </section>
    </PageTransition>
  )
}
