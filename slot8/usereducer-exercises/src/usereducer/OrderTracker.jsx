import { useReducer } from 'react';
import Alert from 'react-bootstrap/Alert';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';

const TRANSITIONS = {
  pending: { CONFIRM: 'confirmed', CANCEL: 'cancelled' },
  confirmed: { SHIP: 'shipping', CANCEL: 'cancelled' },
  shipping: { DELIVER: 'delivered' },
  delivered: {},
  cancelled: {},
};

const STATUS_INFO = {
  pending: { label: 'Chờ xác nhận', bg: 'secondary' },
  confirmed: { label: 'Đã xác nhận', bg: 'primary' },
  shipping: { label: 'Đang giao', bg: 'warning' },
  delivered: { label: 'Đã giao', bg: 'success' },
  cancelled: { label: 'Đã hủy', bg: 'danger' },
};

const EVENT_LABELS = {
  CONFIRM: 'Xác nhận',
  SHIP: 'Giao hàng',
  DELIVER: 'Đã nhận hàng',
  CANCEL: 'Hủy đơn',
};

const initialState = {
  status: 'pending',
  cancelReason: '',
  error: '',
  timeline: [{ status: 'pending', at: '08:00' }],
};

const orderReducer = (state, action) => {
  if (action.type === 'SET_REASON') {
    return { ...state, cancelReason: action.payload, error: '' };
  }
  if (action.type === 'RESET') return initialState;

  const nextStatus = TRANSITIONS[state.status]?.[action.type];
  if (!nextStatus) {
    return {
      ...state,
      error: `Không thể "${action.type}" khi đơn đang "${STATUS_INFO[state.status].label}"`,
    };
  }

  if (action.type === 'CANCEL' && state.cancelReason.trim().length < 5) {
    return { ...state, error: 'Nhập lý do hủy (ít nhất 5 ký tự)' };
  }

  return {
    ...state,
    status: nextStatus,
    error: '',
    timeline: [...state.timeline, { status: nextStatus, at: action.at }],
  };
};

const now = () =>
  new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });

const OrderTracker = () => {
  const [state, dispatch] = useReducer(orderReducer, initialState);
  const { status, cancelReason, error, timeline } = state;
  const allowedEvents = Object.keys(TRANSITIONS[status]);
  const isFinal = allowedEvents.length === 0;

  return (
    <Card className="shadow-sm mx-auto" style={{ maxWidth: 520 }}>
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-center gap-3">
          <span>Đơn hàng #DH1024</span>
          <Badge bg={STATUS_INFO[status].bg}>{STATUS_INFO[status].label}</Badge>
        </Card.Title>

        {error && <Alert variant="danger" className="py-2">{error}</Alert>}

        {allowedEvents.includes('CANCEL') && (
          <Form.Group className="mb-3" controlId="cancel-reason">
            <Form.Label>Lý do hủy</Form.Label>
            <Form.Control
              value={cancelReason}
              placeholder="Nhập lý do hủy đơn"
              onChange={(event) =>
                dispatch({ type: 'SET_REASON', payload: event.target.value })
              }
            />
          </Form.Group>
        )}

        <div className="d-flex flex-wrap gap-2 mb-3">
          {Object.keys(EVENT_LABELS).map((event) => (
            <Button
              key={event}
              size="sm"
              variant={event === 'CANCEL' ? 'outline-danger' : 'outline-primary'}
              disabled={!allowedEvents.includes(event)}
              onClick={() => dispatch({ type: event, at: now() })}
            >
              {EVENT_LABELS[event]}
            </Button>
          ))}
          <Button
            size="sm"
            variant="outline-secondary"
            onClick={() => dispatch({ type: 'SHIP', at: now() })}
          >
            Thử gửi SHIP
          </Button>
        </div>

        <ListGroup>
          {timeline.map(({ status: timelineStatus, at }, index) => (
            <ListGroup.Item
              key={`${timelineStatus}-${index}`}
              className="d-flex justify-content-between align-items-center"
            >
              <Badge bg={STATUS_INFO[timelineStatus].bg}>
                {STATUS_INFO[timelineStatus].label}
              </Badge>
              <small className="text-muted">{at}</small>
            </ListGroup.Item>
          ))}
        </ListGroup>

        {isFinal && (
          <Button className="mt-3" size="sm" onClick={() => dispatch({ type: 'RESET' })}>
            Tạo đơn mới
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default OrderTracker;