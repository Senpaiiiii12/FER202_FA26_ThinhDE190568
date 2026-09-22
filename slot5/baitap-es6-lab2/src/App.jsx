import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react'
import AppButton from './components/AppButton'
import InputField from './components/InputField'
import ProductCard from './components/ProductCard'
import { products } from './data/products'

const baseStyle = { borderRadius: 12 }
const highlight = { border: '2px solid gold' }
const product = products[0]
const featured = [
  ...products.slice(0, 2),
  ...products.slice(-2),
]

function App() {
  const [submittedEmail, setSubmittedEmail] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmittedEmail(event.currentTarget.contactEmail.value)
  }

  return (
    <main className="container py-4">
      <h1 className="h3 mb-4">Bài 6: AppButton và InputField</h1>

      <section className="mb-4">
        <h2 className="h5">AppButton</h2>
        <div className="d-flex flex-wrap gap-2">
          <AppButton>Primary mặc định</AppButton>
          <AppButton variant="danger" size="sm">Nút danger</AppButton>
          <AppButton disabled>Đã khóa</AppButton>
        </div>
      </section>

      <form onSubmit={handleSubmit} className="mb-4" noValidate>
        <h2 className="h5">InputField</h2>
        <InputField
          id="contactEmail"
          label="Email"
          type="email"
          placeholder="name@example.com"
          required
          helpText="Chúng tôi không chia sẻ email của bạn."
        />
        <AppButton type="submit">Gửi email</AppButton>
        {submittedEmail && (
          <p className="text-success mt-2 mb-0">Đã nhận: {submittedEmail}</p>
        )}
      </form>

      <section className="mb-4">
        <h2 className="h5">Spread object và spread mảng</h2>
        <p className="mb-3">Giá gốc của {product.name}: {product.discount}%</p>
        <ProductCard product={{ ...product, discount: 30 }} />
      </section>

      <section>
        <h2 className="h5">Featured ({featured.length})</h2>
        <div className="row g-3">
          {featured.map((item, index) => (
            <div className="col-12 col-md-6 col-lg-3" key={item.id}>
              <ProductCard
                product={item}
                style={{ ...baseStyle, ...(index === 0 ? highlight : {}) }}
              />
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

export default App
