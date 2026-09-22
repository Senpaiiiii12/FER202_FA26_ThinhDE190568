import Container from 'react-bootstrap/Container'
import { APP_NAME } from '../../data/menu'

const Footer = () => (
  <footer className="bg-light text-center py-3 mt-auto">
    <Container>
      <small>
        &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
      </small>
    </Container>
  </footer>
)

export default Footer
