import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, MapPin, Clock, Package } from 'lucide-react'

const words = ['RÁPIDO', 'SEGURO', 'CONFIABLE', 'PRECISO']

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const truckX = useTransform(scrollYProgress, [0, 1], [0, -80])
  const [wordIdx, setWordIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setWordIdx(i => (i + 1) % words.length), 2200)
    return () => clearInterval(t)
  }, [])

  return (
    <section ref={ref} className="hero">
      <div className="hero__band" />
      <div className="hero__dots" aria-hidden />

      <motion.div className="hero__content" style={{ y, opacity }}>

        {/* Titular principal: marca y estilo visual */}
        <div className="hero__title-wrapper">
          <motion.h1 className="hero__title hero__title--navy"
            initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}>
            TRANSPORTES
          </motion.h1>
          <motion.h1 className="hero__title hero__title--outline"
            initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}>
            FABULL
          </motion.h1>
        </div>

        {/* Línea de slogan con animación rotativa */}
        <div className="hero__h1">
          <motion.div className="hero__h1-line3"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}>
            <span className="hero__static">SIEMPRE</span>
            <span className="hero__word-wrap">
              <AnimatePresence mode="wait">
                <motion.span key={words[wordIdx]} className="hero__word"
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -40, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}>
                  {words[wordIdx]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.div>
        </div>

        <motion.p className="hero__sub"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}>
          Conectamos tu negocio con tus clientes. Entregas express,
          trazabilidad total y tecnología de punta para la logística que tu empresa necesita.
        </motion.p>

        <motion.div className="hero__actions"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}>
          <Link to="/contacto" className="hero__cta-primary">
            Cotizar ahora <ArrowRight size={16} />
          </Link>
          <Link to="/servicios/ultima-milla" className="hero__cta-secondary">
            Ver servicios
          </Link>
        </motion.div>

        <motion.div className="hero__stats"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1 }}>
          {[
            { icon: Package, value: '+50K', label: 'Envíos/mes' },
            { icon: Clock,   value: '2h',   label: 'Express' },
            { icon: MapPin,  value: '+30',  label: 'Ciudades' },
          ].map(({ icon: Icon, value, label }, i) => (
            <motion.div key={label} className="hero__stat"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05 + i * 0.1 }}>
              <Icon size={16} className="hero__stat-icon" />
              <span className="hero__stat-value">{value}</span>
              <span className="hero__stat-label">{label}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Ilustración de vehículo con entrada animada desde la derecha */}
      <motion.div
        className="hero__illustration"
        initial={{ opacity: 0, x: 120 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.1, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <motion.img
          src="/camion.png"
          alt="Camión Fabull Transporte"
          className="hero__truck-photo"
          style={{ x: truckX }}
        />
      </motion.div>

      <div className="hero__scroll">
        <motion.div className="hero__scroll-bar"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }} />
        <span>scroll</span>
      </div>
    </section>
  )
}