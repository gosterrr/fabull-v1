// Componente de logo del toro con imagen vectorizada
// Se puede adaptar el color mediante filtros CSS si es necesario
export default function BullLogo({ size = 48 }) {
  return (
    <img
      src="/logo-fabull.png"
      alt="Fabull Transporte"
      width={size}
      height={size}
      style={{ objectFit: 'contain' }}
    />
  )
}
