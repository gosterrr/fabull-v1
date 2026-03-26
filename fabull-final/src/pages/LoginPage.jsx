/*
 * Fabull - Transporte
 * Copyright (c) 2024 Gysunn. All rights reserved.
 *
 * LoginPage.jsx - Login page component
 */

// Import React hooks and components
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useToast } from '../context/ToastContext'
import { loginYRedirigir } from '../services/api'

// LoginPage component for user authentication
export default function LoginPage() {
  // State for form data and loading status
  const { addToast } = useToast()
  const [form, setForm] = useState({ correo: '', password: '' })
  const [loading, setLoading] = useState(false)

  // Handle input changes
  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Call the login function to redirect to the panel
      loginYRedirigir(form.correo, form.password)
    } catch {
      // Show error toast if login fails
      addToast('Error de conexión con el servidor.', 'error')
      setLoading(false)
    }
  }

  // Render the login form UI
  return (
    <main className="login-page">
      // Animated login card
      <motion.div
        className="login-card"
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        // Header with logo and title
        <div className="login-card__header">
          <Link to="/" className="login-card__logo">
            <img src="/toro.png" alt="Fabull" className="login-card__logo-img" />
          </Link>
          <h1 className="login-card__title">Acceder</h1>
          <p className="login-card__subtitle">Panel de operaciones Fabull</p>
        </div>

        // Login form
        <form onSubmit={handleSubmit} className="login-card__form">
          // Email input field
          <div className="form-field">
            <label htmlFor="correo">Correo electrónico</label>
            <input
              id="correo" name="correo" type="email"
              value={form.correo} onChange={handleChange}
              required placeholder="tu@correo.com"
              autoComplete="email"
            />
          </div>
          // Password input field
          <div className="form-field">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password" name="password" type="password"
              value={form.password} onChange={handleChange}
              required placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>
          // Submit button
          <button type="submit" disabled={loading}>
            {loading
              ? <><span className="form-spinner" style={{ borderTopColor: 'white', marginRight: 8 }} /> Verificando...</>
              : 'Ingresar al panel →'
            }
          </button>
        </form>

      </motion.div>
      // Background element
      <div className="login-page__bg" aria-hidden />
    </main>
  )
}
}
