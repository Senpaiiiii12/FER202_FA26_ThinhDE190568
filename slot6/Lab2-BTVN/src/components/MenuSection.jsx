import PizzaCard from './PizzaCard.jsx'
import { pizzas } from '../data/pizzas.js'

function MenuSection({ onBuy }) {
  return (
    <section id="menu" className="menu-section container">
      <h2>Our Menu</h2>
      <div className="row g-3 g-lg-4">
        {pizzas.map((pizza) => (
          <div className="col-6 col-md-3" key={pizza.name}>
            <PizzaCard pizza={pizza} onBuy={() => onBuy(pizza.name)} />
          </div>
        ))}
      </div>
    </section>
  )
}

export default MenuSection