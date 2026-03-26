import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const links = [
  { to: '/',            label: 'Inicio' },
  { to: '/nosotros',    label: 'Nosotros' },
  { to: '/servicios/ultima-milla', label: 'Servicios' },
  { to: '/seguimiento', label: 'Seguimiento' },
  { to: '/contacto',    label: 'Contacto' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  return (
    <motion.header
      className={`navbar${scrolled ? ' scrolled' : ''}`}
      initial={{ y: -80 }} animate={{ y: 0 }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="navbar__inner">
        <Link to="/" className="navbar__logo">
          <img src="/toro.png" alt="Fabull" className="navbar__bull-img" />
          <div className="navbar__logo-words">
            <span className="navbar__logo-text">FABULL</span>
            <span className="navbar__logo-sub">TRANSPORTE</span>
          </div>
        </Link>

        <nav className="navbar__nav">
          {links.map(({ to, label }) => (
            <Link key={to} to={to}
              className={`navbar__link${pathname === to ? ' active' : ''}`}>
              {label}
            </Link>
          ))}
        </nav>

        <Link to="/login" className="navbar__btn">Panel →</Link>

        <button className="navbar__menu-btn" onClick={() => setOpen(!open)} aria-label="menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div className="navbar__mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}>
            {links.map(({ to, label }, i) => (
              <motion.div key={to}
                initial={{ x: -24, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.06 }}>
                <Link to={to} className="navbar__mobile-link">{label}</Link>
              </motion.div>
            ))}
            <Link to="/login" className="navbar__mobile-cta">Panel de acceso →</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
