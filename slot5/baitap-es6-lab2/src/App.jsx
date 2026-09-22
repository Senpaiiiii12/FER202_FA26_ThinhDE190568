import 'bootstrap/dist/css/bootstrap.min.css'
import CartTable from './components/CartTable'
import { cartItems } from './data/cart'
import { products } from './data/products'

function App() {
  return <CartTable cartItems={cartItems} products={products} />
}

export default App
