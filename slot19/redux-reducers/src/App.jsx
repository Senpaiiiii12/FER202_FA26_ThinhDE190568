import { Container, Card } from 'react-bootstrap';
import TodoForm from './components/TodoForm';
import FilterBar from './components/FilterBar';
import TodoList from './components/TodoList';

export default function App() {
  return (
    <Container className="py-5" style={{ maxWidth: 600 }}>
      <Card className="shadow">
        <Card.Body>
          <h3 className="mb-3">📝 Redux Todo</h3>
          <TodoForm />
          <FilterBar />
          <TodoList />
        </Card.Body>
      </Card>
    </Container>
  );
}