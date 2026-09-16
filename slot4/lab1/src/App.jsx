import ProductInfo from './ProductInfo'

const products = [
  {
    name: 'Mèo vàng',
    price: '25.000.000đ',
    tags: ['Vàng ', 'Tròn'],
    avatar: '/images/MeoVang.jpg',
  },
  {
    name: 'Mèo đen',
    price: '90.000.000đ',
    tags: ['Đen ', 'Ốm'],
    avatar: '/images/MeoDen.jpg',
  },
]

function App() {
  return (
    <main className="storefront container py-5">
      <section className="product-grid row g-4" aria-label="Danh sách mèo">
        <ProductInfo products={products} />
      </section>
    </main>
  )
}

export default App