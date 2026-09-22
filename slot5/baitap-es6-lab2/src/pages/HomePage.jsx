import Alert from 'react-bootstrap/Alert'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import { AppButton, InputField, ProductList } from '../components'
import { APP_NAME } from '../data/menu'
import { products } from '../data/products'

const formatVND = (number) => number.toLocaleString('vi-VN', {
  style: 'currency',
  currency: 'VND',
})

const HomePage = () => {
  const onSale = products
    .filter(({ discount }) => discount > 0)
    .sort((first, second) => second.discount - first.discount)
    .slice(0, 4)
  const deals = onSale
  const categories = [...new Set(products.map(({ category }) => category.name))]
  const stats = {
    total: products.length,
    inStockCount: products.filter(({ inStock }) => inStock).length,
    avgPrice: products.reduce((sum, { price }) => sum + price, 0) / products.length,
  }
  const { total, inStockCount, avgPrice } = stats

  const handleNewsletterSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <div>
      <section id="home" className="mb-4">
        <Card bg="primary" text="white" className="shadow-sm">
          <Card.Body>
            <Card.Title>Chào mừng đến {APP_NAME}</Card.Title>
            <Card.Text>
              Hôm nay có {onSale.length} sản phẩm đang giảm giá.
            </Card.Text>
          </Card.Body>
        </Card>
      </section>

      <section className="mb-4">
        <Row xs={1} md={3} className="g-3">
          {[
            { label: 'Tổng sản phẩm', value: total },
            { label: 'Còn hàng', value: inStockCount },
            { label: 'Giá trung bình', value: formatVND(avgPrice) },
          ].map(({ label, value }) => (
            <Col key={label}>
              <Card className="h-100 text-center shadow-sm">
                <Card.Body>
                  <Card.Text className="text-muted mb-1">{label}</Card.Text>
                  <Card.Title>{value}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      <section id="products" className="mb-4">
        <Card className="shadow-sm">
          <Card.Body>
            <Card.Title>Bộ lọc sản phẩm</Card.Title>
            <Form.Group controlId="productSearch" className="mb-3">
              <Form.Control placeholder="Tìm sản phẩm..." />
            </Form.Group>
            <Form.Select aria-label="Chọn danh mục">
              <option>Tất cả danh mục</option>
              {categories.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </Form.Select>
            <AppButton className="mt-3">Tìm kiếm</AppButton>
          </Card.Body>
        </Card>
      </section>

      <section className="mb-4">
        <h2 className="h4">Đang giảm giá</h2>
        <ProductList products={deals} />
      </section>

      <section className="mb-4">
        <h2 className="h4">Tất cả sản phẩm</h2>
        {products.length === 0 ? (
          <Alert variant="info">Chưa có sản phẩm.</Alert>
        ) : (
          <ProductList products={products} />
        )}
      </section>

      <section id="register" className="mb-4">
        <Card className="shadow-sm">
          <Card.Body>
            <Card.Title>Nhận tin</Card.Title>
            <Form onSubmit={handleNewsletterSubmit}>
              <InputField
                id="newsletterEmail"
                label="Email"
                type="email"
                placeholder="name@example.com"
                required
              />
              <AppButton type="submit">Đăng ký</AppButton>
            </Form>
          </Card.Body>
        </Card>
      </section>
    </div>
  )
}

export default HomePage
