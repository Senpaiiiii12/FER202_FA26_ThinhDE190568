import { useReducer, useState } from 'react'
import { Button, Card, Col, Container, Form, Modal, Row } from 'react-bootstrap'

const initialFormState = {
  values: {
    name: '',
    email: '',
    message: '',
  },
  errors: {},
  touched: {},
}

function validate(values) {
  const errors = {}

  if (!values.name.trim()) {
    errors.name = 'Vui lòng nhập họ và tên.'
  } else if (values.name.trim().length < 2) {
    errors.name = 'Họ và tên phải có ít nhất 2 ký tự.'
  }

  if (!values.email.trim()) {
    errors.email = 'Vui lòng nhập email.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Email không đúng định dạng.'
  }

  if (!values.message.trim()) {
    errors.message = 'Vui lòng nhập nội dung liên hệ.'
  } else if (values.message.trim().length < 10) {
    errors.message = 'Nội dung phải có ít nhất 10 ký tự.'
  }

  return errors
}

function formReducer(state, action) {
  switch (action.type) {
    case 'CHANGE_FIELD': {
      const values = { ...state.values, [action.name]: action.value }
      return { ...state, values, errors: validate(values) }
    }
    case 'BLUR_FIELD':
      return {
        ...state,
        touched: { ...state.touched, [action.name]: true },
      }
    case 'SUBMIT':
      return {
        ...state,
        errors: validate(state.values),
        touched: { name: true, email: true, message: true },
      }
    default:
      return state
  }
}

function Contact() {
  const [form, dispatch] = useReducer(formReducer, initialFormState)
  const [showModal, setShowModal] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target
    dispatch({ type: 'CHANGE_FIELD', name, value })
  }

  function handleBlur(event) {
    dispatch({ type: 'BLUR_FIELD', name: event.target.name })
  }

  function handleSubmit(event) {
    event.preventDefault()
    dispatch({ type: 'SUBMIT' })

    if (Object.keys(validate(form.values)).length === 0) {
      setShowModal(true)
    }
  }

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card className="text-start shadow-sm">
            <Card.Body>
              <Card.Title as="h1" className="h3 mb-3">
                Liên hệ với chúng tôi
              </Card.Title>
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="contact-name">
                  <Form.Label>Họ và tên</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={form.values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={form.touched.name && Boolean(form.errors.name)}
                  />
                  <Form.Control.Feedback type="invalid">
                    {form.errors.name}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="contact-email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={form.values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={form.touched.email && Boolean(form.errors.email)}
                  />
                  <Form.Control.Feedback type="invalid">
                    {form.errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="contact-message">
                  <Form.Label>Nội dung liên hệ</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="message"
                    value={form.values.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={
                      form.touched.message && Boolean(form.errors.message)
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {form.errors.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button type="submit">Gửi thông tin</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Completed Lab5</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Thông tin đã nhập vào form.</p>
          <dl className="mb-0">
            <dt>Họ và tên</dt>
            <dd>{form.values.name}</dd>
            <dt>Email</dt>
            <dd>{form.values.email}</dd>
            <dt>Nội dung liên hệ</dt>
            <dd className="mb-0">{form.values.message}</dd>
          </dl>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default Contact
