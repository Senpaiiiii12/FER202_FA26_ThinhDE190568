import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
export const HomePage = () => (
  <Container className="mt-4">
    <h1>Trang Chủ</h1>
    <p>Chào mừng bạn đến với trang web cá nhân!</p>
    <Button as={Link} to="/projects" variant="primary">
      Xem dự án của mình
    </Button>
  </Container>
);