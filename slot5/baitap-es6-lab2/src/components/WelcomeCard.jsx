import Card from 'react-bootstrap/Card'

const fullName = 'Nguyễn Huỳnh Quốc Thịnh'
const birthYear = 2015
const currentYear = 2026
const major = 'Software Engineering'
const hour = new Date().getHours()

let session = 'sáng'
if (hour >= 12 && hour < 18) {
  session = 'trưa'
} else if (hour >= 18) {
  session = 'tối'
}

const greeting = `Chào bạn ${session}, ${fullName}!`
const age = currentYear - birthYear
const borderClass = age >= 18 ? 'border-success' : 'border-warning'

function WelcomeCard() {
  return (
    <div className="container my-4">
      <Card className={`shadow-sm ${borderClass}`}>
        <Card.Header>Thông tin cá nhân</Card.Header>
        <Card.Body>
          <Card.Title>{greeting}</Card.Title>
          <Card.Text>
            Tôi là {fullName}, {age} tuổi. Tôi đang học ngành {major}.
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  )
}

export default WelcomeCard
