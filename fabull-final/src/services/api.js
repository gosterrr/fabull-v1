/*
 * Fabull - Transporte
 * Copyright (c) 2024 Gysunn. All rights reserved.
 *
 * api.js - API service functions
 */

// ─────────────────────────────────────────────
// FABULL — Capa de servicios API
// Backend PHP via ngrok (sesiones PHP nativas)
// ─────────────────────────────────────────────

// Base URL for API calls
const BASE_URL = import.meta.env.VITE_API_URL || 'https://suited-marie-loopily.ngrok-free.dev/fabull'
// Header to skip ngrok browser warning
const NGROK_HEADER = { 'ngrok-skip-browser-warning': 'true' }

// ─────────────────────────────────────────────
// LOGIN — El backend usa sesiones PHP con form POST.
// Creamos un form invisible y lo enviamos directo al PHP.
// Esto inicia la sesión correctamente y redirige a index.php
// ─────────────────────────────────────────────
/**
 * Function to login and redirect to the PHP panel
 * @param {string} email - User email
 * @param {string} password - User password
 */
export function loginYRedirigir(email, password) {
  // Create a hidden form to submit login data to PHP backend
  const url = `${BASE_URL}/php/login_proceso.php`
  const form = document.createElement('form')
  form.method = 'POST'
  form.action = url

  // Email field
  const fieldEmail = document.createElement('input')
  fieldEmail.type = 'hidden'
  fieldEmail.name = 'email'
  fieldEmail.value = email

  // Password field
  const fieldPass = document.createElement('input')
  fieldPass.type = 'hidden'
  fieldPass.name = 'password'
  fieldPass.value = password

  form.appendChild(fieldEmail)
  form.appendChild(fieldPass)
  document.body.appendChild(form)
  // Submit the form to initiate PHP session
  form.submit()
}

// ─────────────────────────────────────────────
// TRACKING PÚBLICO — No requiere sesión
// Endpoint: api/v1/paquete/index.php?accion=verificar&id=XXX
// ─────────────────────────────────────────────
/**
 * Function to search for a package by tracking number
 * @param {string} numeroPedido - Tracking number
 * @returns {Promise<Object>} - Result object with ok and error or data
 */
export async function buscarPedido(numeroPedido) {
  try {
    // Construct the API URL for package verification
    const url = `${BASE_URL}/api/v1/paquete/index.php?accion=verificar&id=${encodeURIComponent(numeroPedido.trim())}`
    // Fetch the tracking data
    const res = await fetch(url, {
      method: 'GET',
      headers: { ...NGROK_HEADER },
    })
    // Get response text
    const text = await res.text()
    let data
    // Try to parse JSON
    try { data = JSON.parse(text) } catch { data = { error: text } }
    // Check for errors
    if (!res.ok || data?.error) return { ok: false, error: data?.error || `Error ${res.status}` }
    return { ok: true, data }
  } catch (err) {
    // Handle connection errors
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
