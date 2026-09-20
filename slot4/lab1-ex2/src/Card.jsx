import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

function ProductCard({ name, price, tag, avatar }) {
  return (
    <Card className="h-100 border-0 shadow-sm">
      <div className="ratio ratio-4x3">
        <Card.Img variant="top" src={avatar} alt={name} className="object-fit-cover" />
      </div>

      <Card.Body className="d-flex flex-column">
        <Card.Title>{name}</Card.Title>
        <Card.Text className="mb-2">Giá: {price}</Card.Text>

        <div className="mb-3 text-secondary small fw-semibold">{tag}</div>

        <Button variant="primary" className="mt-auto">
          Mua ngay
        </Button>
      </Card.Body>
    </Card>
  )
}

export default ProductCard
