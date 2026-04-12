import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, Package, MapPin, CheckCircle, Clock,
  AlertCircle, XCircle, RotateCcw, Calendar, Hash, Truck, User
} from 'lucide-react'

const API_URL   = 'https://fabull.cl/api/v1/rastreo.php'
const API_TOKEN = 'Fb_2026_!92k_LzPq_W87x_#Scur1ty_Fabull'

const ESTADOS = {
  'INGRESADO':           { color: '#5a7a96', bg: '#f0f6fc', border: '#c5dff0', icon: Clock,       label: 'Ingresado en sistema' },
  'RECIBIDO':            { color: '#2a8ac4', bg: '#e8f4fd', border: '#4FB3E8', icon: Package,     label: 'Recibido' },
  'POR ENTREGAR':        { color: '#2a8ac4', bg: '#e8f4fd', border: '#4FB3E8', icon: Package,     label: 'Por entregar' },
  'PENDIENTE':           { color: '#d97706', bg: '#fffbeb', border: '#fcd34d', icon: Truck,       label: 'Por entregar' },
  'EN REPARTO':          { color: '#d97706', bg: '#fffbeb', border: '#fcd34d', icon: Truck,       label: 'Por entregar' },
  'ENTREGADO A TITULAR': { color: '#10b981', bg: '#ecfdf5', border: '#6ee7b7', icon: CheckCircle, label: 'Entregado' },
  'ENTREGADO A TERCERO': { color: '#8b5cf6', bg: '#f5f3ff', border: '#c4b5fd', icon: User,        label: 'Entregado a tercero' },
  'DEVOLUCION':          { color: '#ef4444', bg: '#fef2f2', border: '#fca5a5', icon: RotateCcw,   label: 'En devolución' },
}

function getEstadoInfo(nombre) {
  if (!nombre) return { color: '#6b7280', bg: '#f9fafb', border: '#e5e7eb', icon: Clock, label: 'Desconocido' }
  const key = Object.keys(ESTADOS).find(k => nombre.toUpperCase().includes(k))
  return ESTADOS[key] || { color: '#6b7280', bg: '#f9fafb', border: '#e5e7eb', icon: Clock, label: nombre }
}

const PASOS = [
  { label: 'Ingresado',      match: ['INGRESADO'] },
  { label: 'Recibido',       match: ['RECIBIDO'] },
  { label: 'Por entregar',   match: ['POR ENTREGAR', 'PENDIENTE', 'EN REPARTO'] },
  { label: 'Finalizado',     match: ['ENTREGADO A TITULAR', 'ENTREGADO A TERCERO', 'DEVOLUCION'] },
]

function getPasoActivo(estado) {
  if (!estado) return -1
  const up = estado.toUpperCase()
  return PASOS.findIndex(p => p.match.some(m => up.includes(m)))
}

function formatFecha(fecha) {
  if (!fecha) return '—'
  try {
    return new Date(fecha).toLocaleDateString('es-CL', {
      day: '2-digit', month: 'long', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    })
  } catch { return fecha }
}

export default function TrackingPage() {
  const [codigo, setCodigo]       = useState('')
  const [loading, setLoading]     = useState(false)
  const [resultado, setResultado] = useState(null)
  const [error, setError]         = useState(null)

  const buscar = async (e) => {
    e.preventDefault()
    if (!codigo.trim()) return
    setLoading(true)
    setResultado(null)
    setError(null)

    try {
      // Token va en la URL directamente: ?codigo=XXX&token=YYY
      const url = `${API_URL}?codigo=${encodeURIComponent(codigo.trim())}&token=${encodeURIComponent(API_TOKEN)}`
      const res = await fetch(url, { method: 'GET' })

      const json = await res.json()

      // El JSON viene como: { status: "success", data: { ... } }
      if (json?.status === 'success' && json?.data) {
        console.log('Estado recibido:', json.data.nombre_estado)
        console.log('JSON completo:', json.data)
        setResultado(json.data)
      } else {
        setError('No encontramos un pedido con ese número. Verifica e intenta de nuevo.')
      }
    } catch {
      setError('Error de conexión. Verifica tu internet e intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  // Extraemos los 4 campos exactos que devuelve el JSON
  const estadoInfo = resultado ? getEstadoInfo(resultado.nombre_estado) : null
  const pasoActivo = resultado ? getPasoActivo(resultado.nombre_estado) : -1
  const IconEstado = estadoInfo?.icon || Clock
  const isFailed   = resultado && ['DEVOLUCION'].some(k =>
    resultado.nombre_estado?.toUpperCase().includes(k)
  )

  return (
    <main className="tracking-page">

      {/* ── Hero buscador ── */}
      <div className="tracking-hero">
        <div className="container">
          <motion.div
            className="tracking-hero__inner"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="tracking-hero__overline">Seguimiento en línea</span>
            <h1 className="tracking-hero__title">RASTREA TU<br /><span>ENVÍO</span></h1>
            <p className="tracking-hero__sub">
              Ingresa tu número de seguimiento o pedido para ver el estado en tiempo real.
            </p>

            <form onSubmit={buscar} className="tracking-hero__form">
              <div className="tracking-hero__input-wrap">
                <Hash size={18} className="tracking-hero__icon" />
                <input
                  type="text"
                  value={codigo}
                  onChange={e => setCodigo(e.target.value)}
                  placeholder="Ej: 4438954"
                  className="tracking-hero__input"
                  autoComplete="off"
                />
              </div>
              <button type="submit" className="tracking-hero__btn" disabled={loading}>
                {loading
                  ? <span className="form-spinner" style={{ borderTopColor: 'white' }} />
                  : <><Search size={18} /> Buscar envío</>
                }
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* ── Resultados ── */}
      <div className="container">
        <AnimatePresence mode="wait">

          {/* Error */}
          {error && (
            <motion.div key="err" className="tracking-error"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <AlertCircle size={22} />
              <p>{error}</p>
            </motion.div>
          )}

          {/* Resultado */}
          {resultado && (
            <motion.div key="res" className="tracking-result"
              initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>

              {/* ── Cabecera con número y estado ── */}
              <div className="tracking-result__head"
                style={{ background: estadoInfo.bg, borderColor: estadoInfo.border }}>
                <div>
                  <span className="tracking-result__num-label">Número de pedido</span>
                  {/* id_paquete_empresa */}
                  <span className="tracking-result__num">{resultado.id_paquete_empresa}</span>
                </div>
                <div className="tracking-result__badge"
                  style={{ color: estadoInfo.color, borderColor: estadoInfo.border, background: 'white' }}>
                  <IconEstado size={20} />
                  {/* nombre_estado */}
                  <span>{estadoInfo.label}</span>
                </div>
              </div>

              {/* ── Stepper de progreso ── */}
              <div className="tracking-result__stepper">
                {PASOS.map((paso, i) => {
                  const isActive = i === pasoActivo
                  const isDone   = i < pasoActivo
                  return (
                    <div key={i} className="tracking-step">
                      <div className={`tracking-step__dot${isDone ? ' done' : ''}${isActive ? (isFailed ? ' failed' : ' active') : ''}`}>
                        {isDone                   && <CheckCircle size={13} />}
                        {isActive && !isFailed    && <CheckCircle size={13} />}
                        {isActive && isFailed     && <XCircle size={13} />}
                      </div>
                      <span className={`tracking-step__label${isActive || isDone ? ' bright' : ''}`}>
                        {paso.label}
                      </span>
                      {i < PASOS.length - 1 && (
                        <div className={`tracking-step__line${isDone ? ' done' : ''}`} />
                      )}
                    </div>
                  )
                })}
              </div>

              {/* ── Cards con los 4 campos del JSON ── */}
              <div className="tracking-result__grid">

                <div className="tracking-detail">
                  <div className="tracking-detail__icon"><Hash size={18} /></div>
                  <div className="tracking-detail__body">
                    <span className="tracking-detail__label">Número de pedido</span>
                    {/* ← id_paquete_empresa */}
                    <span className="tracking-detail__value">{resultado.id_paquete_empresa}</span>
                  </div>
                </div>

                <div className="tracking-detail">
                  <div className="tracking-detail__icon"><Package size={18} /></div>
                  <div className="tracking-detail__body">
                    <span className="tracking-detail__label">Estado actual</span>
                    {/* ← nombre_estado */}
                    <span className="tracking-detail__value" style={{ color: estadoInfo.color }}>
                      {resultado.nombre_estado}
                    </span>
                  </div>
                </div>

                <div className="tracking-detail">
                  <div className="tracking-detail__icon"><MapPin size={18} /></div>
                  <div className="tracking-detail__body">
                    <span className="tracking-detail__label">Comuna de destino</span>
                    {/* ← nombre_comuna */}
                    <span className="tracking-detail__value">{resultado.nombre_comuna}</span>
                  </div>
                </div>

                <div className="tracking-detail">
                  <div className="tracking-detail__icon"><Calendar size={18} /></div>
                  <div className="tracking-detail__body">
                    <span className="tracking-detail__label">Fecha de ingreso</span>
                    {/* ← fecha_ingreso */}
                    <span className="tracking-detail__value">{formatFecha(resultado.fecha_ingreso)}</span>
                  </div>
                </div>

                <div className="tracking-detail">
                  <div className="tracking-detail__icon"><Calendar size={18} /></div>
                  <div className="tracking-detail__body">
                    <span className="tracking-detail__label">Fecha de entrega</span>
                    {/* ← fecha_entrega */}
                    <span className="tracking-detail__value">{formatFecha(resultado.fecha_entrega)}</span>
                  </div>
                </div>

              </div>

              <button className="tracking-result__reset"
                onClick={() => { setResultado(null); setError(null); setCodigo('') }}>
                ← Buscar otro pedido
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </main>
  )
}
