import './App.css'
import Card from './Card'

const products = [
  {
    name: 'Mèo vàng',
    price: '25.000.000đ',
    tags: ['Vàng ', 'Tròn'],
    avatar: '/images/MeoVang.jpg',
    description: 'Mèo vàng cực dễ thương',
  },
  {
    name: 'Mèo đen',
    price: '90.000.000đ',
    tags: ['Đen ', 'Ốm'],
    avatar: '/images/MeoDen.jpg',
    description: 'Mèo đen cực sành điệu',
  },
]

function App() {
  return (
    <main className="storefront container py-5">
      <header className="storefront-header text-center mb-5">
        <h1>Cửa hàng</h1>
        <p className="intro">Những chú mèo cực múp rụp</p>
      </header>

      <section className="product-grid row g-4" aria-label="Danh sách mèo">
        {products.map((product, index) => (
          <Card key={product.name} {...product} index={index + 1} />
        ))}
      </section>

      <footer className="storefront-footer d-flex justify-content-between align-items-center mt-5 pt-4 border-top">
        <span>Mèo</span>
        <span>Được mua nhiều mỗi ngày</span>
      </footer>
    </main>
  )
}

export default App