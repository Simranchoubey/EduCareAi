import { Link, useLocation } from 'react-router-dom'

// Spec: center links — Story, Investing, Building, Advisory
const navLinks = [
  { label: 'Story',     to: '/navigator' },
  { label: 'Investing', to: '/cost'      },
  { label: 'Building',  to: '/healthcare'},
  { label: 'Advisory',  to: '/dashboard' },
]

export default function Navbar() {
  const location = useLocation()

  return (
    <div className="px-6 md:px-12 lg:px-16 pt-6 relative z-20">
      <nav className="glass-navbar rounded-2xl px-6 py-3 flex items-center justify-between border border-white/10">
        <Link to="/" className="text-2xl font-bold tracking-tight text-white no-underline flex items-center gap-2">
          <span className="premium-gradient-text">EduCare AI</span>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition-all duration-300 no-underline ${
                location.pathname === link.to ? 'text-white' : 'text-white/50 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link
          to="/chat"
          className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md px-6 py-2.5 rounded-xl text-sm font-semibold border border-white/20 transition-all duration-300 no-underline shadow-lg hover:shadow-white/5"
        >
          AI Copilot
        </Link>
      </nav>
    </div>
  )
}
