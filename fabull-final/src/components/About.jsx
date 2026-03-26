import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const pillars = [
  { num: '01', title: 'Velocidad',    desc: 'Cada minuto cuenta. Operación optimizada para la entrega más rápida posible.' },
  { num: '02', title: 'Tecnología',   desc: 'Plataforma propia de gestión de rutas, tracking y métricas en tiempo real.' },
  { num: '03', title: 'Confianza',    desc: 'Tasas de éxito superiores al 98%. Tu reputación es nuestra responsabilidad.' },
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <section ref={ref} className="about">
      <div className="container">
        <div className="about__layout">
          <motion.div initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7 }}>
            <span className="about__overline">Quiénes somos</span>
            <h2 className="about__title">SOMOS<br /><span>FABULL</span></h2>
            <p className="about__body">Nacimos para resolver el problema más crítico del e-commerce moderno: la última milla. Somos un equipo obsesionado con la eficiencia logística, construyendo la infraestructura que las empresas necesitan para competir hoy.</p>
            <div className="about__tag"><span className="about__tag-accent">+3 años</span> conectando negocios con sus clientes</div>
          </motion.div>
          <div className="about__pillars">
            {pillars.map((p, i) => (
              <motion.div key={p.num} className="about__pillar"
                initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.12 }}>
                <span className="about__pillar-num">{p.num}</span>
                <div>
                  <h3 className="about__pillar-title">{p.title}</h3>
                  <p className="about__pillar-desc">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
