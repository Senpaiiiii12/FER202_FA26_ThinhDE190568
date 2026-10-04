import { useReducer } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Nav from 'react-bootstrap/Nav';
import {
  COURSES,
  initWizard,
  SCHEDULES,
  STEPS,
  wizardReducer,
} from './wizardReducer.js';

const formatVND = (amount) =>
  amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

const CourseWizard = ({ initialCourseId = 'react' }) => {
  const [state, dispatch] = useReducer(wizardReducer, initialCourseId, initWizard);
  const { step, maxVisited, values, errors, submitted } = state;
  const course = COURSES.find((item) => item.id === values.courseId);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    dispatch({
      type: 'CHANGE',
      payload: { name, value: type === 'checkbox' ? checked : value },
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({ type: step === STEPS.length - 1 ? 'SUBMIT' : 'NEXT' });
  };

  const field = (name, label, type = 'text') => (
    <Form.Group className="mb-3" controlId={`course-wizard-${name}`}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        name={name}
        value={values[name]}
        onChange={handleChange}
        isInvalid={Boolean(errors[name])}
      />
      <Form.Control.Feedback type="invalid">{errors[name]}</Form.Control.Feedback>
    </Form.Group>
  );

  if (submitted) {
    return (
      <Alert variant="success" className="course-wizard">
        <Alert.Heading>Đăng ký thành công</Alert.Heading>
        <p>
          {values.fullName} đã đăng ký {course?.name} ({values.schedule}). Học phí:{' '}
          {course ? formatVND(course.fee) : ''}.
        </p>
        <Button
          variant="outline-success"
          onClick={() => dispatch({ type: 'RESET', payload: initialCourseId })}
        >
          Đăng ký khóa khác
        </Button>
      </Alert>
    );
  }

  return (
    <Card className="course-wizard shadow-sm mx-auto">
      <Card.Header>
        <Nav variant="pills" className="flex-wrap gap-1" aria-label="Các bước đăng ký">
          {STEPS.map((label, index) => (
            <Nav.Item key={label}>
              <Nav.Link
                as="button"
                type="button"
                active={index === step}
                disabled={index > maxVisited}
                onClick={() => dispatch({ type: 'GO_TO', payload: index })}
              >
                {`${index + 1}. ${label}`}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
      </Card.Header>

      <Card.Body>
        <Form noValidate onSubmit={handleSubmit}>
          {step === 0 && (
            <>
              {field('fullName', 'Họ và tên')}
              {field('email', 'Email', 'email')}
              {field('phone', 'Số điện thoại', 'tel')}
            </>
          )}

          {step === 1 && (
            <>
              <Form.Group className="mb-3" controlId="course-wizard-courseId">
                <Form.Label>Khóa học</Form.Label>
                <Form.Select
                  name="courseId"
                  value={values.courseId}
                  onChange={handleChange}
                  isInvalid={Boolean(errors.courseId)}
                >
                  <option value="">-- Chọn khóa học --</option>
                  {COURSES.map(({ id, name, fee }) => (
                    <option key={id} value={id}>
                      {`${name} - ${formatVND(fee)}`}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.courseId}
                </Form.Control.Feedback>
              </Form.Group>

              <fieldset className="mb-3">
                <legend className="fs-6">Lịch học</legend>
                {SCHEDULES.map((schedule, index) => (
                  <Form.Check
                    key={schedule}
                    inline
                    type="radio"
                    id={`course-wizard-schedule-${index}`}
                    name="schedule"
                    label={schedule}
                    value={schedule}
                    checked={values.schedule === schedule}
                    onChange={handleChange}
                    isInvalid={Boolean(errors.schedule)}
                  />
                ))}
                {errors.schedule && (
                  <div className="text-danger small mt-1">{errors.schedule}</div>
                )}
              </fieldset>
            </>
          )}

          {step === 2 && (
            <>
              <ListGroup className="mb-3">
                <ListGroup.Item>Học viên: {values.fullName}</ListGroup.Item>
                <ListGroup.Item>
                  Liên hệ: {values.email} | {values.phone}
                </ListGroup.Item>
                <ListGroup.Item>
                  Khóa học: {course?.name} | {values.schedule}
                </ListGroup.Item>
                <ListGroup.Item className="fw-semibold">
                  Học phí: {course ? formatVND(course.fee) : ''}
                </ListGroup.Item>
              </ListGroup>

              <Form.Check
                id="course-wizard-agree"
                name="agree"
                label="Tôi xác nhận thông tin trên là chính xác"
                checked={values.agree}
                onChange={handleChange}
                isInvalid={Boolean(errors.agree)}
              />
              {errors.agree && (
                <div className="text-danger small mt-1">{errors.agree}</div>
              )}
            </>
          )}

          <div className="d-flex justify-content-between gap-2 mt-4">
            <Button
              type="button"
              variant="outline-secondary"
              disabled={step === 0}
              onClick={() => dispatch({ type: 'BACK' })}
            >
              ← Quay lại
            </Button>
            <Button
              type="submit"
              variant={step === STEPS.length - 1 ? 'success' : 'primary'}
            >
              {step === STEPS.length - 1 ? 'Xác nhận đăng ký' : 'Tiếp tục →'}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default CourseWizard;