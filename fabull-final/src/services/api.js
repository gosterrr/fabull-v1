// ─────────────────────────────────────────────
// FABULL — Capa de servicios API
// Backend PHP via ngrok (sesiones PHP nativas)
// ─────────────────────────────────────────────

const BASE_URL = import.meta.env.VITE_API_URL || 'https://suited-marie-loopily.ngrok-free.dev/fabull'
const NGROK_HEADER = { 'ngrok-skip-browser-warning': 'true' }

// ─────────────────────────────────────────────
// LOGIN — El backend usa sesiones PHP con form POST.
// Creamos un form invisible y lo enviamos directo al PHP.
// Esto inicia la sesión correctamente y redirige a index.php
// ─────────────────────────────────────────────
export function loginYRedirigir(email, password) {
  const url = `${BASE_URL}/php/login_proceso.php`
  const form = document.createElement('form')
  form.method = 'POST'
  form.action = url

  const fieldEmail = document.createElement('input')
  fieldEmail.type = 'hidden'
  fieldEmail.name = 'email'
  fieldEmail.value = email

  const fieldPass = document.createElement('input')
  fieldPass.type = 'hidden'
  fieldPass.name = 'password'
  fieldPass.value = password

  form.appendChild(fieldEmail)
  form.appendChild(fieldPass)
  document.body.appendChild(form)
  form.submit()
}

// ─────────────────────────────────────────────
// TRACKING PÚBLICO — No requiere sesión
// Endpoint: api/v1/paquete/index.php?accion=verificar&id=XXX
// ─────────────────────────────────────────────
export async function buscarPedido(numeroPedido) {
  try {
    const url = `${BASE_URL}/api/v1/paquete/index.php?accion=verificar&id=${encodeURIComponent(numeroPedido.trim())}`
    const res = await fetch(url, {
      method: 'GET',
      headers: { ...NGROK_HEADER },
    })
    const text = await res.text()
    let data
    try { data = JSON.parse(text) } catch { data = { error: text } }
    if (!res.ok || data?.error) return { ok: false, error: data?.error || `Error ${res.status}` }
    return { ok: true, data }
  } catch (err) {
    return { ok: false, error: 'No se pudo conectar con el servidor.' }
  }
}

// Fetch genérico con sesión PHP (cookie)
async function request(path, options = {}) {
  try {
    const res = await fetch(`${BASE_URL}/${path}`, {
      ...options,
      credentials: 'include',
      headers: { 'Content-Type': 'application/json', ...NGROK_HEADER, ...(options.headers || {}) },
    })
    const text = await res.text()
    let data
    try { data = JSON.parse(text) } catch { data = { message: text } }
    if (!res.ok) throw new Error(data.message || `Error ${res.status}`)
    return { ok: true, data }
  } catch (err) {
    return { ok: false, error: err.message }
  }
}

export const paquetes = {
  getAll: () => request('api/v1/paquete/index.php', { method: 'GET' }),
}
