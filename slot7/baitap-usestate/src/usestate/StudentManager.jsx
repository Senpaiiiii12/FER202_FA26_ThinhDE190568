import { useState } from 'react'
import { Badge, Button, Card, Form, Table } from 'react-bootstrap'

const CITIES = ['Hà Nội', 'Đà Nẵng', 'TP.HCM', 'Cần Thơ']

const initialStudents = [
  { id: 1, name: 'Nguyễn Văn An', score: 8.5, contact: { city: 'Hà Nội' } },
  { id: 2, name: 'Trần Thị Bình', score: 4.5, contact: { city: 'Đà Nẵng' } },
  { id: 3, name: 'Lê Minh Châu', score: 6, contact: { city: 'TP.HCM' } },
]

function StudentManager() {
  const [students, setStudents] = useState(initialStudents)
  const [newName, setNewName] = useState('')
  const [sortBy, setSortBy] = useState('none')

  const addStudent = (event) => {
    event.preventDefault()
    const name = newName.trim()

    if (name.length < 3) {
      return
    }

    setStudents((prev) => [
      ...prev,
      {
        id: Date.now(),
        name,
        score: 0,
        contact: { city: CITIES[0] },
      },
    ])
    setNewName('')
  }

  const updateScore = (id, text) => {
    const nextScore = Number(text)
    const score = Number.isFinite(nextScore)
      ? Math.min(10, Math.max(0, nextScore))
      : 0

    setStudents((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, score } : student,
      ),
    )
  }

  const updateCity = (id, city) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id
          ? { ...student, contact: { ...student.contact, city } }
          : student,
      ),
    )
  }

  const removeStudent = (id) => {
    setStudents((prev) => prev.filter((student) => student.id !== id))
  }

  const bonusAll = () => {
    setStudents((prev) =>
      prev.map((student) => ({
        ...student,
        score: Math.min(10, student.score + 0.5),
      })),
    )
  }

  const sorted =
    sortBy === 'none'
      ? students
      : [...students].sort((first, second) => {
          if (sortBy === 'name') {
            return first.name.localeCompare(second.name, 'vi')
          }

          return second.score - first.score
        })

  const totalScore = students.reduce((total, student) => total + student.score, 0)
  const average = students.length ? (totalScore / students.length).toFixed(2) : '0.00'
  const passed = students.filter((student) => student.score >= 5).length

  return (
    <main className="container py-5" style={{ maxWidth: '1000px' }}>
      <header className="mb-4">
        <h1 className="h2 mb-2">Quản lý điểm sinh viên</h1>
        <p className="text-secondary mb-0">
          Thêm, cập nhật, sắp xếp và theo dõi kết quả học tập của sinh viên.
        </p>
      </header>

      <Card className="mb-4">
        <Card.Body>
          <Form onSubmit={addStudent}>
            <div className="row g-3 align-items-end">
              <Form.Group className="col-md-5" controlId="new-student-name">
                <Form.Label>Họ tên sinh viên</Form.Label>
                <Form.Control
                  value={newName}
                  onChange={(event) => setNewName(event.target.value)}
                  placeholder="Nhập ít nhất 3 ký tự"
                />
              </Form.Group>

              <Form.Group className="col-md-3" controlId="sort-students">
                <Form.Label>Sắp xếp</Form.Label>
                <Form.Select
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value)}
                >
                  <option value="none">Thứ tự nhập</option>
                  <option value="name">Theo tên A → Z</option>
                  <option value="score">Điểm cao → thấp</option>
                </Form.Select>
              </Form.Group>

              <div className="col-md-4 d-flex gap-2">
                <Button type="submit" disabled={newName.trim().length < 3}>
                  Thêm sinh viên
                </Button>
                <Button type="button" variant="outline-primary" onClick={bonusAll}>
                  +0.5 cả lớp
                </Button>
              </div>
            </div>
          </Form>
        </Card.Body>
      </Card>

      <div className="table-responsive">
        <Table bordered hover className="align-middle">
          <thead className="table-light">
            <tr>
              <th>Họ tên</th>
              <th style={{ width: '150px' }}>Điểm</th>
              <th style={{ width: '190px' }}>Thành phố</th>
              <th style={{ width: '120px' }}>Kết quả</th>
              <th style={{ width: '110px' }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>
                  <Form.Control
                    type="number"
                    min="0"
                    max="10"
                    step="0.5"
                    value={student.score}
                    onChange={(event) => updateScore(student.id, event.target.value)}
                    aria-label={`Điểm của ${student.name}`}
                  />
                </td>
                <td>
                  <Form.Select
                    value={student.contact.city}
                    onChange={(event) => updateCity(student.id, event.target.value)}
                    aria-label={`Thành phố của ${student.name}`}
                  >
                    {CITIES.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </Form.Select>
                </td>
                <td>
                  {student.score >= 5 ? (
                    <Badge bg="success">Đạt</Badge>
                  ) : (
                    <Badge bg="secondary">Chưa đạt</Badge>
                  )}
                </td>
                <td>
                  <Button
                    type="button"
                    variant="outline-danger"
                    size="sm"
                    onClick={() => removeStudent(student.id)}
                  >
                    Xóa
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Card className="mt-4 bg-light border-0">
        <Card.Body className="fw-semibold">
          Sĩ số: {students.length} · Điểm trung bình: {average} · Đạt: {passed}/
          {students.length}
        </Card.Body>
      </Card>
    </main>
  )
}

export default StudentManager
