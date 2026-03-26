import { AnimatePresence, motion } from 'framer-motion'
import { useToast } from '../context/ToastContext'
import { CheckCircle, AlertCircle, Info } from 'lucide-react'

const icons  = { success: CheckCircle, error: AlertCircle, info: Info }
const colors = { success: '#4FB3E8',   error: '#ff6b35',   info: '#0d1f3c' }

export default function Toast() {
  const { toasts } = useToast()
  return (
    <div className="toast-container">
      <AnimatePresence>
        {toasts.map(({ id, message, type }) => {
          const Icon = icons[type] || Info
          return (
            <motion.div key={id} className="toast"
              style={{ borderLeftColor: colors[type] || colors.info }}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.9 }}
              transition={{ duration: 0.25 }}>
              <Icon size={16} style={{ color: colors[type] || colors.info, flexShrink: 0 }} />
              <span>{message}</span>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
