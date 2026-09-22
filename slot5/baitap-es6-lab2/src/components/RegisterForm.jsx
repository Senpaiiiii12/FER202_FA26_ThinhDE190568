import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import AppButton from './AppButton'
import InputField from './InputField'
import { fields, genders, majors } from '../data/registerConfig'

const RegisterForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <Row className="justify-content-center py-4">
      <Col md={6}>
        <Card className="shadow-sm">
          <Card.Body>
            <Card.Title className="mb-4">Đăng ký tài khoản</Card.Title>
            <Form onSubmit={handleSubmit}>
              {fields.map((field) => (
                <InputField key={field.id} {...field} />
              ))}

              <Form.Group className="mb-3">
                <Form.Label>Giới tính</Form.Label>
                {genders.map((gender) => (
                  <Form.Check
                    key={gender}
                    inline
                    type="radio"
                    name="gender"
                    id={`gender-${gender}`}
                    label={gender}
                  />
                ))}
              </Form.Group>

              <Form.Group className="mb-3" controlId="major">
                <Form.Label>Chuyên ngành</Form.Label>
                <Form.Select defaultValue="">
                  <option value="">-- Chọn chuyên ngành --</option>
                  {majors.map((major) => (
                    <option key={major} value={major}>
                      {major}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Check
                className="mb-3"
                type="checkbox"
                id="terms"
                label="Tôi đồng ý điều khoản"
                required
              />

              <AppButton type="submit" className="w-100">
                Đăng ký
              </AppButton>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}

export default RegisterForm
