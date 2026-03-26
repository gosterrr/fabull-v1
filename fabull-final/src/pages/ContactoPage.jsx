import { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { useToast } from '../context/ToastContext'

export default function ContactoPage() {
  const { addToast } = useToast()
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' })
  const [sending, setSending] = useState(false)

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    await new Promise(r => setTimeout(r, 1200))
    setSending(false)
    addToast('Mensaje enviado. Te contactaremos pronto.', 'success')
    setForm({ name: '', email: '', company: '', message: '' })
  }

  return (
    <main className="contacto-page">
      <div className="container">
        <div className="contacto-page__layout">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <span className="contacto-page__overline">Contacto</span>
            <h1 className="contacto-page__title">CUÉNTANOS<br /><span>TU RETO</span></h1>
            <p className="contacto-page__desc">Completá el formulario y uno de nuestros especialistas te responderá en menos de 24 horas.</p>
            <div className="contacto-page__guarantees">
              {['Respuesta en 24h', 'Sin compromiso', 'Asesoría gratuita'].map(g => (
                <div key={g} className="contacto-page__guarantee">
                  <span className="contacto-page__guarantee-dot" />{g}
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div className="contacto-page__form-wrap" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.15 }}>
            <form onSubmit={handleSubmit} className="contacto-page__form">
              <div className="contacto-page__row">
                <div className="form-field">
                  <label>Nombre</label>
                  <input name="name" value={form.name} onChange={handleChange} required />
                </div>
                <div className="form-field">
                  <label>Email</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} required />
                </div>
              </div>
              <div className="form-field">
                <label>Empresa</label>
                <input name="company" value={form.company} onChange={handleChange} />
              </div>
              <div className="form-field">
                <label>¿En qué podemos ayudarte?</label>
                <textarea name="message" rows={5} value={form.message} onChange={handleChange} required />
              </div>
              <button type="submit" className="form-submit" disabled={sending}>
                {sending ? <span className="form-spinner" /> : 'Enviar mensaje →'}
              </button>
              <a href="https://wa.me/56995974933" target="_blank" rel="noopener noreferrer" className="form-submit">
                Deseas atención más rápida? Haz click aquí para nuestro chat de WhatsApp <MessageCircle size={18} color="#25D366" />
              </a>
            </form>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
