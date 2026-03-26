import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function Footer() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  const footerLinks = [
    {
      title: 'Empresa',
      items: [
        { label: 'Nosotros', path: '/nosotros', enabled: true },
        { label: 'Contacto', path: '/contacto', enabled: true },
      ],
    },
    {
      title: 'Servicios',
      items: [
        { label: 'Última Milla', path: '/servicios/ultima-milla', enabled: true },
        { label: 'Tracking GPS', path: '/seguimiento', enabled: false },
        { label: 'Fulfillment', path: '/servicios/fulfillment', enabled: true },
        { label: 'Entrega Express', enabled: false },
      ],
    },
  ]

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div>
            <Link to="/" className="footer__logo">
              <img 
                src={isMobile ? "/toro.png" : "/logo-fabull.png"} 
                alt="Fabull Transporte" 
                className="footer__logo-img" 
              />
            </Link>
            <p className="footer__tagline">Última milla, primera prioridad.</p>
          </div>
          <div className="footer__links">
            {footerLinks.map((col) => (
              <div key={col.title} className="footer__col">
                <span className="footer__col-title">{col.title}</span>
                {col.items.map((item) => (
                  item.enabled
                    ? item.path
                      ? <Link key={item.label} to={item.path}>{item.label}</Link>
                      : <span key={item.label} className="footer__link-disabled">{item.label}</span>
                    : <span key={item.label} className="footer__link-disabled">{item.label}</span>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} Fabull SpA. Todos los derechos reservados.</span>
          <span className="footer__speed">⚡ Entregamos más rápido</span>
        </div>
      </div>
    </footer>
  )
}
