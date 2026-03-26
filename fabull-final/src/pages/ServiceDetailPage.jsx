import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, CheckCircle } from 'lucide-react'

const serviceData = {
  'ultima-milla': { title: 'ÚLTIMA MILLA',  subtitle: 'Entrega express que supera expectativas', description: 'Nuestra solución de última milla está diseñada para garantizar que cada paquete llegue en el menor tiempo posible, con trazabilidad completa.',     features: ['Entrega en 2-4 horas','Confirmación por foto','Soporte 24/7','Cobertura metropolitana','Integración con tu plataforma'] },
  'tracking':     { title: 'TRACKING GPS',  subtitle: 'Visibilidad total de tu operación',        description: 'Monitorea cada envío en tiempo real desde tu dashboard. Tus clientes reciben notificaciones automáticas y un enlace de seguimiento.',               features: ['Mapa en tiempo real','Notificaciones SMS/email','ETA preciso','Historial completo','API disponible','Webhooks configurables'] },
  'fulfillment':  { title: 'FULFILLMENT',   subtitle: 'Logística completa sin esfuerzo',          description: 'Desde la recepción de stock hasta la entrega al cliente final. Nos encargamos de almacenaje, picking, packing y despacho.',                        features: ['Almacenamiento seguro','Picking y packing','Control de stock','Informes de inventario','Devoluciones gestionadas','Embalaje personalizable'] },
  'analytics':    { title: 'ANALYTICS',     subtitle: 'Datos que impulsan decisiones',            description: 'Dashboard completo con todas las métricas de tu operación logística. Identifica cuellos de botella y optimiza rutas continuamente.',              features: ['Dashboard en tiempo real','Tasa de éxito por zona','Tiempo promedio de entrega','Reportes exportables','Alertas automáticas','Análisis de tendencias'] },
}

export default function ServiceDetailPage() {
  const { id } = useParams()
  const service = serviceData[id] || serviceData['ultima-milla']

  return (
    <main className="service-detail">
      <div className="container">
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
          <Link to="/" className="service-detail__back"><ArrowLeft size={16} /> Volver</Link>
        </motion.div>
        <motion.div className="service-detail__hero" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
          <h1 className="service-detail__title">{service.title}</h1>
          <p className="service-detail__subtitle">{service.subtitle}</p>
          <p className="service-detail__desc">{service.description}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
          <h2 className="service-detail__feat-title">Qué incluye</h2>
          <div className="service-detail__feat-grid">
            {service.features.map((f, i) => (
              <motion.div key={f} className="service-detail__feat"
                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.06 }}>
                <CheckCircle size={18} style={{ color: 'var(--blue)', flexShrink: 0 }} />{f}
              </motion.div>
            ))}
          </div>
          <Link to="/contacto" className="service-detail__cta">Solicitar este servicio →</Link>
        </motion.div>
      </div>
    </main>
  )
}
