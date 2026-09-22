import 'bootstrap/dist/css/bootstrap.min.css'
import ProductCard from './components/ProductCard'

const products = [
  {
    id: 1,
    name: 'Áo thun nam',
    price: 590000,
    image: '/images/AoThun.jpg',
    rating: { rate: 4.5, count: 120 },
    category: { name: 'Thời trang' },
  },
  {
    id: 2,
    name: 'Giày thể thao',
    price: 0,
    image: '/images/GiayTheThao.jpg',
  },
  {
    id: 3,
    name: 'Quần jean',
    image: '/images/QuanJean.jpg',
  },
]

function App() {
  return (
    <div className="container py-4">
      <div className="row g-4">
        {products.map((product) => (
          <div className="col-12 col-md-6 col-lg-4" key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
