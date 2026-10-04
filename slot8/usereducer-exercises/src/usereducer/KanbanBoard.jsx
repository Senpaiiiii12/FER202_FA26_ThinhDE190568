import { useReducer, useState } from 'react';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import {
  addTask,
  COLUMNS,
  clearDone,
  deleteTask,
  initialTaskState,
  moveTask,
  renameTask,
  taskReducer,
} from './taskReducer.js';

const PRIORITY_INFO = {
  high: { label: 'Cao', variant: 'danger' },
  low: { label: 'Thấp', variant: 'secondary' },
};

const TaskCard = ({ task, isFirst, isLast, dispatch }) => {
  const { id, title, priority } = task;

  const handleRename = () => {
    const nextTitle = window.prompt('Tên công việc mới', title);
    if (nextTitle !== null) dispatch(renameTask(id, nextTitle));
  };

  return (
    <Card className="mb-2 shadow-sm">
      <Card.Body className="p-3">
        <div className="d-flex justify-content-between align-items-start gap-2">
          <button
            type="button"
            className="btn btn-link text-start text-dark text-decoration-none p-0"
            title="Nhấp đúp để đổi tên"
            onDoubleClick={handleRename}
          >
            {title}
          </button>
          <Badge bg={PRIORITY_INFO[priority].variant}>
            {PRIORITY_INFO[priority].label}
          </Badge>
        </div>

        <div className="d-flex gap-2 mt-3">
          <Button
            size="sm"
            variant="outline-secondary"
            aria-label={`Chuyển ${title} sang cột trước`}
            disabled={isFirst}
            onClick={() => dispatch(moveTask(id, -1))}
          >
            ←
          </Button>
          <Button
            size="sm"
            variant="outline-secondary"
            aria-label={`Chuyển ${title} sang cột tiếp theo`}
            disabled={isLast}
            onClick={() => dispatch(moveTask(id, 1))}
          >
            →
          </Button>
          <Button
            size="sm"
            variant="outline-danger"
            className="ms-auto"
            onClick={() => dispatch(deleteTask(id))}
          >
            Xóa
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

const KanbanBoard = () => {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState);
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('low');
  const [filter, setFilter] = useState('all');

  const visibleTasks = state.tasks.filter(
    (task) => filter === 'all' || task.priority === filter,
  );
  const doneCount = state.tasks.filter((task) => task.column === 'done').length;

  const handleAdd = (event) => {
    event.preventDefault();
    if (!title.trim()) return;

    dispatch(addTask(title, priority));
    setTitle('');
  };

  return (
    <>
      <Row className="g-2 mb-4 align-items-start">
        <Col xs={12} lg={7}>
          <Form onSubmit={handleAdd}>
            <InputGroup>
              <Form.Control
                aria-label="Tên công việc"
                placeholder="Tên công việc"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
              <Form.Select
                aria-label="Ưu tiên công việc mới"
                value={priority}
                onChange={(event) => setPriority(event.target.value)}
                style={{ maxWidth: 130 }}
              >
                <option value="low">Thấp</option>
                <option value="high">Cao</option>
              </Form.Select>
              <Button type="submit" disabled={!title.trim()}>
                Thêm
              </Button>
            </InputGroup>
          </Form>
        </Col>
        <Col xs={12} sm={6} lg={3}>
          <Form.Select
            aria-label="Lọc theo mức ưu tiên"
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
          >
            <option value="all">Mọi mức ưu tiên</option>
            <option value="high">Chỉ ưu tiên cao</option>
            <option value="low">Chỉ ưu tiên thấp</option>
          </Form.Select>
        </Col>
        <Col xs={12} sm={6} lg={2}>
          <Button
            className="w-100"
            variant="outline-success"
            disabled={doneCount === 0}
            onClick={() => dispatch(clearDone())}
          >
            Dọn cột xong
          </Button>
        </Col>
      </Row>

      <Row className="g-3">
        {COLUMNS.map(({ key, title: columnTitle }, columnIndex) => {
          const columnTasks = visibleTasks.filter((task) => task.column === key);

          return (
            <Col xs={12} md={4} key={key}>
              <section aria-label={columnTitle}>
                <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-3">
                  <h2 className="h5 mb-0">{columnTitle}</h2>
                  <Badge bg="dark">{columnTasks.length}</Badge>
                </div>
                {columnTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    dispatch={dispatch}
                    isFirst={columnIndex === 0}
                    isLast={columnIndex === COLUMNS.length - 1}
                  />
                ))}
                {columnTasks.length === 0 && (
                  <p className="text-muted small">Không có công việc</p>
                )}
              </section>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default KanbanBoard;