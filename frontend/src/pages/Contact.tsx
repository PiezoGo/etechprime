import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { submitInquiry } from '../api'
import PageTransition from '../components/PageTransition'
import { CheckCircle } from 'lucide-react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await submitInquiry(form)
      setSent(true)
    } catch {
      setError('Something went wrong. Please try again or email directly.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageTransition>
      <div className="pt-32 pb-24 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-12 gap-16">
          {/* Left col */}
          <motion.div
            className="md:col-span-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="section-label mb-4">Get in Touch</p>
            <h1 className="font-serif text-5xl md:text-6xl text-ink leading-tight">
              Let's<br />
              <span className="italic">work together</span>
            </h1>
            <p className="text-ink-muted text-sm mt-8 leading-relaxed max-w-sm">
              Available for commissions, collaborations and creative projects in film production, photography and content creation.
            </p>

            <div className="mt-12 space-y-6">
              <div>
                <p className="section-label mb-1">Email</p>
                <a href="mailto:etechstudioz@gmail.com" className="text-ink text-sm hover:text-ink-muted transition-colors">etechstudioz@gmail.com</a>
              </div>
              <div>
                <p className="section-label mb-1">WhatsApp</p>
                <a href="https://wa.me/254742132778" target="_blank" rel="noopener noreferrer" className="text-ink text-sm hover:text-ink-muted transition-colors">+254742132778</a>
              </div>
              <div>
                <p className="section-label mb-1">YouTube</p>
                <a
                  href="https://www.youtube.com/@EtechStudioz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink text-sm hover:text-ink-muted transition-colors"
                >
                  @EtechStudioz
                </a>
              </div>
              <div>
                <p className="section-label mb-1">Location</p>
                <span className="text-ink text-sm">Nairobi, Kenya</span>
              </div>
              <div>
                <p className="section-label mb-1">University</p>
                <span className="text-ink text-sm">Multimedia University Kenya</span>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            className="md:col-span-6 md:col-start-7"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-start gap-4 py-20"
              >
                <CheckCircle size={36} className="text-ink" strokeWidth={1.5} />
                <h2 className="font-serif text-3xl text-ink">Message sent</h2>
                <p className="text-ink-muted text-sm">
                  Thank you for reaching out. I'll get back to you as soon as possible.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8 pt-2">
                <div>
                  <label className="section-label block mb-2" htmlFor="contact-name">Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="Your full name"
                    className="form-input"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="section-label block mb-2" htmlFor="contact-email">Email</label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="your@email.com"
                    className="form-input"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="section-label block mb-2" htmlFor="contact-message">Message</label>
                  <textarea
                    id="contact-message"
                    required
                    rows={6}
                    placeholder="Tell me about your project..."
                    className="form-input resize-none"
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  />
                </div>

                {error && <p className="text-sm text-red-500">{error}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-outline disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}
