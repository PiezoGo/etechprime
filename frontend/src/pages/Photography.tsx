import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { type GalleryImage, fetchGallery } from '../api'
import PageTransition from '../components/PageTransition'

export default function Photography() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [selected, setSelected] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchGallery()
      .then(setImages)
      .finally(() => setLoading(false))
  }, [])

  const close = () => setSelected(null)
  const prev = useCallback(() => {
    if (selected === null) return
    setSelected(i => (i! - 1 + images.length) % images.length)
  }, [selected, images.length])
  const next = useCallback(() => {
    if (selected === null) return
    setSelected(i => (i! + 1) % images.length)
  }, [selected, images.length])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [prev, next])

  return (
    <PageTransition>
      <div className="pt-32 pb-24 max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="section-label mb-4">Portfolio</p>
          <h1 className="font-serif text-5xl md:text-6xl text-ink leading-tight">
            Photography
          </h1>
          <p className="text-ink-muted text-sm mt-4 max-w-lg">
            A visual diary — portraits, moments and scenes captured through a cinematic lens.
            Each image tells a story of its own.
          </p>
        </motion.div>

        {/* Stats */}
        {!loading && (
          <p className="section-label mb-10">{images.length} photographs</p>
        )}

        {/* Masonry Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="bg-cream-dark animate-pulse" style={{ height: `${200 + (i % 3) * 80}px` }} />
            ))}
          </div>
        ) : (
          <div className="masonry-grid">
            {images.map((img, i) => (
              <motion.div
                key={img.id}
                className="masonry-item img-hover cursor-pointer"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: (i % 8) * 0.05 }}
                onClick={() => setSelected(i)}
              >
                <img
                  src={img.url}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full block"
                  style={{ borderRadius: 0 }}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={close}
          >
            <button className="absolute top-6 right-6 text-ink p-2 hover:opacity-60 transition-opacity" onClick={close}>
              <X size={24} />
            </button>
            <button className="absolute left-4 top-1/2 -translate-y-1/2 text-ink p-2 hover:opacity-60" onClick={e => { e.stopPropagation(); prev() }}>
              <ChevronLeft size={28} />
            </button>
            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-ink p-2 hover:opacity-60" onClick={e => { e.stopPropagation(); next() }}>
              <ChevronRight size={28} />
            </button>

            <motion.img
              key={selected}
              src={images[selected].url}
              alt={images[selected].alt}
              className="max-h-[85vh] max-w-[90vw] object-contain shadow-2xl"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35 }}
              onClick={e => e.stopPropagation()}
            />

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
              <p className="section-label">{selected + 1} / {images.length}</p>
              <p className="text-ink-soft text-sm mt-1">{images[selected].name}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  )
}
