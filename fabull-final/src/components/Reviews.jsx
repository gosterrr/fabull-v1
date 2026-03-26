import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'

const reviews = [
  { name: 'Valentina M.', company: 'TiendaFit',    rating: 5, text: 'Fabull transformó nuestra operación. Antes teníamos el 20% de quejas por demoras. Hoy tenemos menos del 1%.' },
  { name: 'Carlos R.',    company: 'Bodegas Norte', rating: 5, text: 'El tracking en tiempo real nos salvó de múltiples conflictos con clientes. Saben exactamente cuándo llega su pedido.' },
  { name: 'Sofia G.',     company: 'NutriBrand',    rating: 5, text: 'La integración fue súper sencilla y el equipo siempre responde rápido. Recomendado 100% para e-commerce.' },
  { name: 'Mateo P.',     company: 'UrbanKicks',    rating: 5, text: 'Escalamos de 200 a 2000 pedidos mensuales sin ningún problema. Fabull creció con nosotros.' },
]

export default function Reviews() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [active, setActive] = useState(0)
  const prev = () => setActive(i => (i - 1 + reviews.length) % reviews.length)
  const next = () => setActive(i => (i + 1) % reviews.length)

  return (
    <section ref={ref} className="reviews">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <span className="reviews__overline">Testimonios</span>
          <h2 className="reviews__title">LO QUE DICEN<br /><span>NUESTROS CLIENTES</span></h2>
        </motion.div>
        <motion.div className="reviews__carousel" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}>
          <AnimatePresence mode="wait">
            <motion.div key={active} className="reviews__card"
              initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.35 }}>
              <div className="reviews__stars">
                {Array.from({ length: reviews[active].rating }).map((_, i) => (
                  <Star key={i} size={16} fill="#4FB3E8" stroke="none" />
                ))}
              </div>
              <p className="reviews__text">"{reviews[active].text}"</p>
              <div className="reviews__author">
                <div className="reviews__avatar">{reviews[active].name[0]}</div>
                <div>
                  <div className="reviews__name">{reviews[active].name}</div>
                  <div className="reviews__company">{reviews[active].company}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="reviews__controls">
            <button className="reviews__btn" onClick={prev}><ChevronLeft size={20} /></button>
            <div className="reviews__dots">
              {reviews.map((_, i) => (
                <button key={i} className={`reviews__dot${i === active ? ' active' : ''}`} onClick={() => setActive(i)} />
              ))}
            </div>
            <button className="reviews__btn" onClick={next}><ChevronRight size={20} /></button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
