import { useReducer, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { COLORS, initialNotes, notesReducer } from './notesReducer.js';
import { createHistory, undoable } from './undoable.js';

const notesWithHistory = undoable(notesReducer);

const NotesBoard = () => {
  const [history, dispatch] = useReducer(
    notesWithHistory,
    initialNotes,
    createHistory,
  );
  const [text, setText] = useState('');
  const [color, setColor] = useState(COLORS[0]);
  const { past, present, future } = history;

  const notes = [...present.items].sort(
    (first, second) => Number(second.pinned) - Number(first.pinned),
  );

  const handleAdd = (event) => {
    event.preventDefault();
    if (!text.trim()) return;

    dispatch({ type: 'ADD_NOTE', payload: { text, color } });
    setText('');
  };

  const handleKeyDown = (event) => {
    if (!event.ctrlKey) return;

    const key = event.key.toLowerCase();
    if (key === 'z') {
      event.preventDefault();
      dispatch({ type: 'UNDO' });
    } else if (key === 'y') {
      event.preventDefault();
      dispatch({ type: 'REDO' });
    }
  };

  return (
    <section onKeyDown={handleKeyDown} aria-label="Bảng ghi chú">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div>
          <h1 className="h3 mb-1">Bảng ghi chú</h1>
          <p className="text-muted mb-0">{present.items.length} ghi chú</p>
        </div>
        <div className="d-flex flex-wrap gap-2">
          <Button
            variant="outline-dark"
            disabled={past.length === 0}
            onClick={() => dispatch({ type: 'UNDO' })}
          >
            {`↶ Hoàn tác (${past.length})`}
          </Button>
          <Button
            variant="outline-dark"
            disabled={future.length === 0}
            onClick={() => dispatch({ type: 'REDO' })}
          >
            {`↷ Làm lại (${future.length})`}
          </Button>
          <Button
            variant="outline-danger"
            disabled={present.items.length === 0}
            onClick={() => dispatch({ type: 'CLEAR_ALL' })}
          >
            Xóa hết
          </Button>
        </div>
      </div>

      <Form onSubmit={handleAdd} className="mb-4">
        <Row className="g-2 align-items-center">
          <Col xs={12} md={6}>
            <InputGroup>
              <Form.Control
                aria-label="Nội dung ghi chú mới"
                placeholder="Nội dung ghi chú"
                value={text}
                onChange={(event) => setText(event.target.value)}
              />
              <Button type="submit" disabled={!text.trim()}>
                Thêm ghi chú
              </Button>
            </InputGroup>
          </Col>
          <Col xs={12} md="auto">
            <div className="d-flex align-items-center gap-2" aria-label="Màu ghi chú mới">
              <span className="small text-muted">Màu</span>
              {COLORS.map((swatch) => (
                <button
                  key={swatch}
                  type="button"
                  className={`note-swatch${color === swatch ? ' is-selected' : ''}`}
                  style={{ '--swatch-color': swatch }}
                  aria-label={`Chọn màu ${swatch}`}
                  aria-pressed={color === swatch}
                  onClick={() => setColor(swatch)}
                />
              ))}
            </div>
          </Col>
        </Row>
      </Form>

      {notes.length === 0 ? (
        <Alert variant="light" className="border">
          Chưa có ghi chú. Bạn có thể thêm ghi chú mới hoặc hoàn tác thao tác vừa rồi.
        </Alert>
      ) : (
        <Row xs={1} sm={2} lg={3} className="g-3">
          {notes.map(({ id, text: noteText, color: noteColor, pinned }) => (
            <Col key={id}>
              <Card className="h-100 shadow-sm" style={{ backgroundColor: noteColor }}>
                <Card.Body className="d-flex flex-column">
                  <Card.Text className="flex-grow-1 note-content">
                    {pinned && <span aria-label="Đã ghim">📌 </span>}
                    {noteText}
                  </Card.Text>
                  <div className="d-flex align-items-center gap-2 border-top pt-3">
                    <div className="d-flex gap-1" aria-label={`Đổi màu ghi chú ${noteText}`}>
                      {COLORS.map((swatch) => (
                        <button
                          key={swatch}
                          type="button"
                          className={`note-swatch note-swatch-small${noteColor === swatch ? ' is-selected' : ''}`}
                          style={{ '--swatch-color': swatch }}
                          aria-label={`Đổi thành màu ${swatch}`}
                          aria-pressed={noteColor === swatch}
                          onClick={() =>
                            dispatch({
                              type: 'CHANGE_COLOR',
                              payload: { id, color: swatch },
                            })
                          }
                        />
                      ))}
                    </div>
                    <Button
                      size="sm"
                      variant="outline-dark"
                      className="ms-auto"
                      onClick={() => dispatch({ type: 'TOGGLE_PIN', payload: id })}
                    >
                      {pinned ? 'Bỏ ghim' : 'Ghim'}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline-danger"
                      onClick={() => dispatch({ type: 'DELETE', payload: id })}
                    >
                      Xóa
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
      <div className="mt-3 text-muted small" aria-live="polite">
        {`${past.length} thao tác có thể hoàn tác · ${future.length} thao tác có thể làm lại`}
      </div>
    </section>
  );
};

export default NotesBoard;