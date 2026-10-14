import { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import MyProduct from '../components/MyProduct.jsx'
import products from '../data/products.js'

function ProductList() {
  const [cart, setCart] = useState([])

  const handleAddToCart = (product) => {
    setCart((currentCart) => [...currentCart, product])
  }

  return (
    <Container className="py-4">
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
        <h1 className="h2 mb-0">Các tour du lịch</h1>
        <span className="fw-semibold">Giỏ hàng: {cart.length} tour</span>
      </div>
      <Row className="g-4">
        {products.map((product) => (
          <Col key={product.id} xs={12} sm={6} lg={4}>
            <MyProduct product={product} onAddToCart={handleAddToCart} />
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default ProductList
