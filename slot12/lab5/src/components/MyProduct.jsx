import { Badge, Button, Card } from 'react-bootstrap'
import { formatVND, getFinalPrice } from '../utils/format.js'

function MyProduct({ product, onAddToCart }) {
  const finalPrice = getFinalPrice(product)

  return (
    <Card className="h-100 text-start shadow-sm">
      <Card.Img
        variant="top"
        src={product.image}
        alt={product.name}
        style={{ height: '200px', objectFit: 'cover' }}
      />
      <Card.Body className="d-flex flex-column">
        <div className="mb-2 d-flex justify-content-between gap-2">
          <Badge bg="primary">{product.category}</Badge>
          <Badge bg={product.instock ? 'success' : 'secondary'}>
            {product.instock ? 'Còn chỗ' : 'Hết chỗ'}
          </Badge>
        </div>
        <Card.Title as="h2" className="h5">
          {product.name}
        </Card.Title>
        <Card.Text className="flex-grow-1">{product.description}</Card.Text>
        <p className="mb-1">
          <strong>Giá:</strong>{' '}
          {product.discount > 0 && (
            <del className="text-secondary me-2">
              {formatVND(product.price)}
            </del>
          )}
          <strong className="text-primary">
            {formatVND(finalPrice)}
          </strong>
        </p>
        <p className="mb-0">
          <strong>Giảm giá:</strong>{' '}
          {product.discount > 0 ? `${product.discount}%` : 'Không có'}{' '}
          <span className="mx-2">|</span>
          <strong>Đánh giá:</strong> ★ {product.rating}/5
        </p>
        <small className="text-secondary mt-2">Mã tour: {product.id}</small>
        {product.instock && (
          <Button
            variant="primary"
            className="mt-3"
            onClick={() => onAddToCart?.(product)}
          >
            Thêm vào giỏ
          </Button>
        )}
      </Card.Body>
    </Card>
  )
}

export default MyProduct
