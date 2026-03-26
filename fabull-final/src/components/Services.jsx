import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Zap, Package, BarChart3, Truck, ArrowUpRight } from 'lucide-react'

const services = [
  { id: 'ultima-milla', icon: Zap,      title: 'Última Milla',   description: 'Entrega express desde tu almacén hasta la puerta del cliente con trazabilidad completa.', highlight: 'Express 2h',   color: '#4FB3E8' },
  { id: 'fulfillment',  icon: Package,  title: 'Fulfillment',    description: 'Almacenaje, picking y packing profesional. Nos encargamos de toda la operación logística.', highlight: 'Full service', color: '#2a8ac4' },
  { id: 'fletes',       icon: Truck,    title: 'Fletes',         description: 'Transporte de carga mayor con seguimiento en ruta y confirmación de entrega garantizada.',   highlight: 'Carga mayor',  color: '#1a3a5c' },
  { id: 'analytics',    icon: BarChart3,title: 'Analytics',      description: 'Dashboard con métricas clave: tasas de entrega, tiempos, rutas optimizadas y más.',          highlight: 'Datos claros', color: '#3a9db5' },
]

export default function Services() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="services">
      <div className="container">
        <motion.div className="services__header"
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}>
          <span className="services__overline">Lo que hacemos</span>
          <h2 className="services__title">SERVICIOS<br /><span>LOGÍSTICOS</span></h2>
          <p className="services__desc">Soluciones diseñadas para empresas que necesitan escalar su logística sin perder el control.</p>
        </motion.div>

        <div className="services__grid">
          {services.map((s, i) => (
            <motion.div key={s.id} className="service-card"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}>
              <div className="service-card__top">
                <div className="service-card__icon" style={{ background: `${s.color}18`, border: `1.5px solid ${s.color}30` }}>
                  <s.icon size={22} style={{ color: s.color }} />
                </div>
                <span className="service-card__badge" style={{ color: s.color, borderColor: `${s.color}40` }}>
                  {s.highlight}
                </span>
              </div>
              <h3 className="service-card__title">{s.title}</h3>
              <p className="service-card__desc">{s.description}</p>
              <Link to={`/servicios/${s.id}`} className="service-card__link" style={{ color: s.color }}>
                Ver más <ArrowUpRight size={14} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
