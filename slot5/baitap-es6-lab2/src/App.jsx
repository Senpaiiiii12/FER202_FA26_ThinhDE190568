import 'bootstrap/dist/css/bootstrap.min.css'
import ProductList from './components/ProductList'
import { products } from './data/products'

function App() {
  return <ProductList products={products} />
}

export default App
