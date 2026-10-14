import { Col, Container, Row } from 'react-bootstrap'

function Footer() {
  return (
    <footer className="mt-auto border-top bg-light py-4">
      <Container>
        <Row className="gy-3">
          <Col md={12}>
            <h2 className="h5">Lab5</h2>
            <p className="mb-0">
              Website gồm các trang Home, About, New và Contact.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
