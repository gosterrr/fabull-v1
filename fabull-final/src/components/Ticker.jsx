const items = ['TRANSPORTES FABULL','FULFILLMENT','ENTREGA EXPRESS','+50K ENVÍOS/MES','SANTIAGO & REGIONES','TECNOLOGÍA LOGÍSTICA','98% TASA DE ÉXITO']
export default function Ticker() {
  return (
    <div className="ticker">
      <div className="ticker__track">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="ticker__item">
            {item} <span className="ticker__dot">●</span>
          </span>
        ))}
      </div>
    </div>
  )
}
