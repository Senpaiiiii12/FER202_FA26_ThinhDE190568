import { Container, Row, Col } from 'react-bootstrap';
import UserList from './components/UserList';
import UserPosts from './components/UserPosts';

export default function App() {
  return (
    <Container className="py-4">
      <h2 className="mb-4">👥 Users — Redux Thunk</h2>
      <Row>
        <Col md={4}><UserList /></Col>
        <Col md={8}><UserPosts /></Col>
      </Row>
    </Container>
  );
}