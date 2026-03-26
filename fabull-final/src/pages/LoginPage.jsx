import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useToast } from '../context/ToastContext'

const BASE_URL = import.meta.env.VITE_API_URL || 'https://suited-marie-loopily.ngrok-free.dev/fabull'

export default function LoginPage() {
  const { addToast } = useToast()
  const [form, setForm] = useState({ correo: '', password: '' })
  const [loading, setLoading] = useState(false)

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Llamamos al endpoint JSON de usuario (no al PHP de sesión)
      const res = await fetch(`${BASE_URL}/api/v1/usuario/index.php?accion=login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
        },
        body: JSON.stringify({ correo: form.correo, password: form.password }),
      })

      const data = await res.json()

      if (data?.success && data?.usuario) {
        // Guardamos datos del usuario en localStorage
        localStorage.setItem('fabull_user', JSON.stringify(data.usuario))
        addToast(`¡Bienvenido, ${data.usuario.nombre_usuario || 'usuario'}!`, 'success')
        // Redirigimos al panel PHP con las credenciales ya validadas
        setTimeout(() => {
          window.location.href = `${BASE_URL}/php/index.php`
        }, 800)
      } else {
        addToast(data?.message || 'Credenciales incorrectas. Intenta de nuevo.', 'error')
      }
    } catch {
      addToast('Error de conexión con el servidor.', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="login-page">
      <motion.div
        className="login-card"
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="login-card__header">
          <Link to="/" className="login-card__logo">
            <img src="/toro.png" alt="Fabull" className="login-card__logo-img" />
          </Link>
          <h1 className="login-card__title">Acceder</h1>
          <p className="login-card__subtitle">Panel de operaciones Fabull</p>
        </div>

        <form onSubmit={handleSubmit} className="login-card__form">
          <div className="form-field">
            <label htmlFor="correo">Correo electrónico</label>
            <input
              id="correo" name="correo" type="email"
              value={form.correo} onChange={handleChange}
              required placeholder="tu@correo.com"
              autoComplete="email"
            />
          </div>
          <div className="form-field">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password" name="password" type="password"
              value={form.password} onChange={handleChange}
              required placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading
              ? <><span className="form-spinner" style={{ borderTopColor: 'white', marginRight: 8 }} /> Verificando...</>
              : 'Ingresar al panel →'
            }
          </button>
        </form>

      </motion.div>
      <div className="login-page__bg" aria-hidden />
    </main>
  )
}
