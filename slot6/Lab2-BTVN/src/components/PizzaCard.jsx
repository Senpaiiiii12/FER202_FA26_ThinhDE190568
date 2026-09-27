function PizzaCard({ pizza, onBuy }) {
  return (
    <article className="card pizza-card h-100">
      <img className="card-img-top pizza-photo" src={pizza.image} alt={pizza.name} />
      {pizza.badge && <span className={`pizza-badge ${pizza.badge.toLowerCase()}`}>{pizza.badge}</span>}
      <div className="card-body d-flex flex-column">
        <h3 className="card-title">{pizza.name}</h3>
        <p className="pizza-price">
          {pizza.oldPrice && <del>${pizza.oldPrice}</del>}
          <span className={pizza.oldPrice ? 'sale-price' : ''}>${pizza.price}</span>
        </p>
        <button className="btn btn-dark btn-sm mt-auto buy-button" type="button" onClick={onBuy}>Buy</button>
      </div>
    </article>
  )
}

export default PizzaCard