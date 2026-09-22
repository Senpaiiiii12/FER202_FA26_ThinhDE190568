import Container from 'react-bootstrap/Container'
import Footer from './Footer'
import Header from './Header'

const Layout = ({ children, title = 'Trang chủ' }) => (
  <div className="d-flex flex-column min-vh-100">
    <Header />
    <Container as="main" className="flex-grow-1">
      <h1 className="my-4">{title}</h1>
      {children}
    </Container>
    <Footer />
  </div>
)

export default Layout
