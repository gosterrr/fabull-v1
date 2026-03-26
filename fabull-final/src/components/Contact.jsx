import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Mail, Phone, MapPin, MessageCircle } from 'lucide-react'

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <section ref={ref} className="contact-section">
      <div className="container">
        <div className="contact-section__layout">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
            <span className="contact-section__overline">¿Listo para empezar?</span>
            <h2 className="contact-section__title">HABLEMOS<br /><span>HOY</span></h2>
            <p className="contact-section__desc">Cuéntanos sobre tu operación y te diseñamos una solución a medida. Respuesta en menos de 24 horas.</p>
            <div className="contact-section__actions">
              <Link to="/contacto" className="contact-section__btn">Agendar reunión <ArrowRight size={18} /></Link>
              <a href="https://wa.me/56995974933" className="contact-section__btn" target="_blank" rel="noopener noreferrer">Atención más rápida - Chat de WhatsApp <MessageCircle size={18} color="#25D366" /></a>
            </div>
          </motion.div>
          <motion.div className="contact-section__info" initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}>
            {[
              { icon: Mail,   label: 'Email',     value: 'hola@fabull.cl' },
              { icon: Phone,  label: 'Teléfono',  value: '+56 9 XXXX XXXX' },
              { icon: MapPin, label: 'Cobertura', value: 'Santiago y regiones' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="contact-section__item">
                <div className="contact-section__icon"><Icon size={20} /></div>
                <div>
                  <div className="contact-section__label">{label}</div>
                  <div className="contact-section__value">{value}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
