import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-ink-faint/40 mt-32 py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <span className="font-serif text-lg text-ink">ETECH Studioz</span>
          <p className="text-[11px] tracking-wide text-ink-muted mt-1">
            Film · Animation · Photography — Multimedia University Kenya
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          {[
            { to: '/work', label: 'Work' },
            { to: '/photography', label: 'Photography' },
            { to: '/film', label: 'Film' },
            { to: '/animation', label: 'Animation' },
            { to: '/youtube', label: 'YouTube' },
            { to: '/about', label: 'About' },
            { to: '/contact', label: 'Contact' },
          ].map(({ to, label }) => (
            <Link key={to} to={to} className="nav-link">
              {label}
            </Link>
          ))}
        </nav>

        <div className="text-right">
          <a
            href="https://www.youtube.com/@EtechStudioz"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link block mb-1"
          >
            @EtechStudioz
          </a>
          <p className="text-[10px] text-ink-faint">
            © {new Date().getFullYear()} ETECH Studioz. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
