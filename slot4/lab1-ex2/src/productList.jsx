import { Container, Row } from 'react-bootstrap'
import ProductInfo from './productInfo'

const pizzas = [
  {
    name: 'Pizza Xúc Xích',
    price: '189.000đ',
    tag: 'Best seller',
    avatar: '/images/pizzaXucXich.jpg',
  },
  {
    name: 'Pizza Chay',
    price: '160.500đ',
    tag: 'Classic',
    avatar: '/images/pizzaChay.jpg',
  },
  {
    name: 'Pizza Thịt',
    price: '190.250đ',
    tag: 'Rich flavor',
    avatar: '/images/pizzaThit.jpg',
  },
]

function ProductList() {
  return (
    <Container className="py-5">
      <Row className="g-4">
        <ProductInfo products={pizzas} />
      </Row>
    </Container>
  )
}

export default ProductList
