import { motion } from 'framer-motion'
import styles from './AdminPanel.module.css'

// Componente de panel de administración con datos de ejemplo
export default function AdminPanel() {
  return (
    <div className={styles.panel}>
      <motion.h2
        className={styles.title}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        PANEL DE OPERACIONES
      </motion.h2>
      <p className={styles.desc}>Próximamente: gestión de envíos, clientes y rutas en tiempo real.</p>
    </div>
  )
}
