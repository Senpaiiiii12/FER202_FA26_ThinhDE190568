import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

const ProductCard = ({ product, style }) => {
	const {
		name = 'Sản phẩm chưa đặt tên',
		price,
		image,
		rating,
		category,
		inStock,
		discount = 0,
	} = product

	const imageSrc = image ?? 'https://placehold.co/300x200?text=No+Image'
	const categoryName = category?.name ?? 'Chưa phân loại'
	const ratingValue = rating?.rate ?? 'Chưa có'
	const ratingCount = rating?.count ?? 0
	const finalPrice = price * (1 - discount / 100)
	const formatPrice = (value) => value.toLocaleString('vi-VN', {
		style: 'currency',
		currency: 'VND',
	})

	return (
		<Card
			style={{ ...style }}
			className={`h-100 position-relative ${inStock ? '' : 'opacity-50'}`}
		>
			{discount > 0 && (
				<Badge bg="danger" className="position-absolute top-0 end-0 m-2">
					-{discount}%
				</Badge>
			)}
			<Card.Img
				variant="top"
				src={imageSrc}
				alt={name}
				style={{ height: '200px', objectFit: 'cover' }}
			/>
			<Card.Body className="d-flex flex-column">
				<Card.Title>{name}</Card.Title>
				<Card.Text>
					<Badge bg="secondary">{categoryName}</Badge>
				</Card.Text>
				<Card.Text className="mb-2">
					{discount > 0 && (
						<del className="d-block text-muted">{formatPrice(price)}</del>
					)}
					<strong className="text-primary">
						{price == null ? 'Liên hệ' : formatPrice(finalPrice)}
					</strong>
				</Card.Text>
				<Card.Text className="text-muted mt-auto mb-0">
					Đánh giá: {ratingValue} ({ratingCount} lượt)
				</Card.Text>
				<div className="mb-3">
					{inStock ? (
						<Badge bg="success">Còn hàng</Badge>
					) : (
						<Badge bg="secondary">Hết hàng</Badge>
					)}
					{ratingValue >= 4.5 && (
						<Badge bg="warning" text="dark" className="ms-2">
							Bán chạy
						</Badge>
					)}
				</div>
				<Button variant="primary" disabled={!inStock}>
					{inStock ? 'Thêm vào giỏ' : 'Không khả dụng'}
				</Button>
			</Card.Body>
		</Card>
	)
}

export default ProductCard
