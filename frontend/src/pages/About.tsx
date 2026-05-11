import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition'

const BIO_IMAGE = '/static/ETECH STUDIOZ 0742132778-63.jpg'

export default function About() {
  return (
    <PageTransition>
      <div className="pt-32 pb-24 max-w-7xl mx-auto px-6 md:px-12">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <p className="section-label mb-4">About</p>
          <h1 className="font-serif text-5xl md:text-6xl text-ink leading-tight">
            The Studio &amp;<br />
            <span className="italic">The Person</span>
          </h1>
        </motion.div>

        {/* Content */}
        <div className="grid md:grid-cols-12 gap-16">
          {/* Photo */}
          <motion.div
            className="md:col-span-5"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="img-hover aspect-[3/4] sticky top-28">
              <img
                src={BIO_IMAGE}
                alt="ETECH Studioz — Photographer and Filmmaker"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Bio text */}
          <motion.div
            className="md:col-span-6 md:col-start-7 pt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="section-label mb-8">Bio</p>

            <div className="space-y-5 text-ink-soft text-sm leading-relaxed mb-12">
              <p>
                ETECH Studioz is the creative identity of a Film Production &amp; Animation student at <strong className="text-ink font-medium">Multimedia University Kenya</strong>. Rooted in a deep love for visual storytelling, the studio operates at the intersection of cinema, still photography and digital media.
              </p>
              <p>
                As a photographer, the work spans portraiture, editorial and documentary imagery — each frame composed with the same cinematic intention that drives the filmmaking practice. The camera is always a tool for empathy: for seeing people, places and moments more fully.
              </p>
              <p>
                The YouTube channel <strong className="text-ink font-medium">@EtechStudioz</strong> is the public face of this ongoing creative education — sharing production breakdowns, tutorials and original content with a growing community of fellow creators across East Africa and beyond.
              </p>
              <p>
                Currently based in Nairobi, open to commissions, collaborations and opportunities in film, photography and content creation.
              </p>
            </div>

            {/* Skills */}
            <div className="mb-12">
              <p className="section-label mb-6">Skills &amp; Disciplines</p>
              <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                {[
                  'Cinematography', 'Film Direction', 'Documentary Production',
                  'Photography', '2D Animation', '3D Modelling (Blender)',
                  'Video Editing (Premiere)', 'Color Grading (DaVinci)', 'Motion Graphics',
                  'YouTube Production', 'Sound Design', 'Scriptwriting',
                ].map(skill => (
                  <div key={skill} className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-ink-faint flex-shrink-0" />
                    <span className="text-ink-soft text-xs tracking-wide">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="mb-12 border-t border-ink-faint/40 pt-8">
              <p className="section-label mb-6">Education</p>
              <div>
                <h3 className="font-serif text-lg text-ink">BSc. Film Production &amp; Animation</h3>
                <p className="text-ink-muted text-sm mt-1">Multimedia University Kenya</p>
                <p className="text-ink-faint text-xs mt-1">2022 — Present · Nairobi, Kenya</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="btn-outline">Get in Touch</Link>
              <a
                href="https://www.youtube.com/@EtechStudioz"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link self-center"
              >
                @EtechStudioz →
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}
