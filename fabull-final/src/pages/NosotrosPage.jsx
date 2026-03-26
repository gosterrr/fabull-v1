import { motion } from 'framer-motion'

const team = [
  { name: 'Ana Torres',  role: 'CEO & Co-founder', initial: 'A' },
  { name: 'Luis Vega',   role: 'CTO',              initial: 'L' },
  { name: 'Carmen S.',   role: 'Operaciones',       initial: 'C' },
  { name: 'Diego F.',    role: 'Tecnología',        initial: 'D' },
]

export default function NosotrosPage() {
  return (
    <main className="nosotros-page">
      <div className="nosotros-hero">
        <div className="container">
          <motion.span className="nosotros-hero__overline" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            Nuestra historia
          </motion.span>
          <motion.h1 className="nosotros-hero__title" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            NACIMOS PARA<br /><span>MOVER EL MUNDO</span>
          </motion.h1>
          <motion.p className="nosotros-hero__sub" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }}>
            Fabull nació de la frustración de ver cómo las empresas perdían clientes por fallas en la última milla. Decidimos construir la solución.
          </motion.p>
        </div>
      </div>
      <div className="nosotros-mission">
        <div className="container">
          <div className="nosotros-mission__grid">
            {[
              { label: 'Misión', text: 'Ser la red logística más confiable y eficiente de Chile, conectando negocios con sus clientes.' },
              { label: 'Visión', text: 'Un mundo donde cualquier empresa, sin importar su tamaño, tiene acceso a logística de clase mundial.' },
              { label: 'Valores', text: 'Velocidad, transparencia, innovación y un compromiso absoluto con el cliente.' },
            ].map((item, i) => (
              <motion.div key={item.label} className="nosotros-mission__card"
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.12 }} viewport={{ once: true }}>
                <span className="nosotros-mission__label">{item.label}</span>
                <p>{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <div className="nosotros-team">
        <div className="container">
          <h2 className="nosotros-team__title">EQUIPO</h2>
          <div className="nosotros-team__grid">
            {team.map((member, i) => (
              <motion.div key={member.name} className="team-card"
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                whileHover={{ y: -4 }}>
                <div className="team-card__avatar">{member.initial}</div>
                <div className="team-card__name">{member.name}</div>
                <div className="team-card__role">{member.role}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
