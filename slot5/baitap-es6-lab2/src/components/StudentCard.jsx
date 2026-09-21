import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'

const StudentCard = ({ student }) => {
  const {
    id,
    name,
    major,
    gpa,
    avatar,
    contact: { email, phone },
  } = student

  return (
    <Card style={{ width: '18rem' }} className="shadow-sm border-0">
      <Card.Body className="text-center">
        <Card.Img
          variant="top"
          src={avatar}
          alt={name}
          className="rounded-circle mb-3"
          style={{ width: '120px', height: '120px', objectFit: 'cover' }}
        />
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle className="mb-3 text-muted">ID: {id}</Card.Subtitle>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <strong>Major:</strong> {major}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>GPA:</strong> {gpa}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Email:</strong> {email}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Phone:</strong> {phone}
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  )
}

export default StudentCard
