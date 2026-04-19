import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { type YouTubeVideo, fetchVideos } from '../api'
import PageTransition from '../components/PageTransition'
import { ExternalLink } from 'lucide-react'

// Fallback videos if none are in the DB
const FALLBACK_VIDEOS: YouTubeVideo[] = [
  { id: 1, title: 'Latest Upload — @EtechStudioz', video_id: '', order: 0 },
]

export default function YouTube() {
  const [videos, setVideos] = useState<YouTubeVideo[]>([])

  useEffect(() => {
    fetchVideos().then(v => setVideos(v.length > 0 ? v : FALLBACK_VIDEOS))
  }, [])

  return (
    <PageTransition>
      <div className="pt-32 pb-24 max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <p className="section-label mb-4">Channel</p>
          <h1 className="font-serif text-5xl md:text-6xl text-ink leading-tight">
            @EtechStudioz
          </h1>
          <p className="text-ink-muted text-sm mt-4 max-w-lg leading-relaxed">
            Watch tutorials, behind-the-scenes breakdowns, short films and production vlogs. New content weekly.
          </p>
          <a
            href="https://www.youtube.com/@EtechStudioz"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-6 btn-outline"
          >
            Subscribe on YouTube <ExternalLink size={14} />
          </a>
        </motion.div>

        {/* Featured embed — channel page */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9 }}
          className="mb-12"
        >
          <p className="section-label mb-6">Channel Feed</p>
          <div className="aspect-video w-full max-w-5xl bg-cream-dark overflow-hidden">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed?listType=user_uploads&list=EtechStudioz"
              title="EtechStudioz YouTube Channel"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </motion.div>

        {/* Individual video cards (from DB) */}
        {videos.some(v => v.video_id) && (
          <div>
            <p className="section-label mb-8 mt-20">Featured Videos</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos
                .filter(v => v.video_id)
                .map((video, i) => (
                  <motion.div
                    key={video.id}
                    className="group"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                  >
                    <div className="aspect-video bg-cream-dark overflow-hidden mb-3">
                      <iframe
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${video.video_id}`}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        loading="lazy"
                      />
                    </div>
                    <h3 className="text-ink text-sm font-medium">{video.title}</h3>
                    <a
                      href={`https://www.youtube.com/watch?v=${video.video_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="nav-link mt-1 inline-flex items-center gap-1"
                    >
                      Watch on YouTube <ExternalLink size={11} />
                    </a>
                  </motion.div>
                ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-24 py-16 border-t border-ink-faint/40 text-center">
          <p className="section-label mb-4">Don't miss anything</p>
          <h2 className="font-serif text-3xl md:text-4xl text-ink mb-6">
            Subscribe to <span className="italic">@EtechStudioz</span>
          </h2>
          <a
            href="https://www.youtube.com/@EtechStudioz"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            Go to Channel
          </a>
        </div>
      </div>
    </PageTransition>
  )
}
