import { Container, Row, Col, Navbar } from 'react-bootstrap';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import CartBadge from './components/CartBadge';

export default function App() {
  return (
    <>
      <Navbar bg="dark" variant="dark" className="px-4 mb-4 justify-content-between">
        <Navbar.Brand>RTK Shop</Navbar.Brand>
        <span className="text-white"><CartBadge /></span>
      </Navbar>
      <Container>
        <Row>
          <Col lg={7}><ProductList /></Col>
          <Col lg={5}>
            <h4>Giỏ hàng</h4>
            <Cart />
          </Col>
        </Row>
      </Container>
    </>
  );
}