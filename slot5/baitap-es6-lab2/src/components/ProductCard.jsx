import Badge from 'react-bootstrap/Badge'
import Card from 'react-bootstrap/Card'

const ProductCard = ({ product }) => {
	const {
		name = 'Sản phẩm chưa đặt tên',
		price,
		image,
		rating,
		category,
	} = product

	const imageSrc = image ?? 'https://placehold.co/300x200?text=No+Image'
	const categoryName = category?.name ?? 'Chưa phân loại'
	const ratingValue = rating?.rate ?? 'Chưa có'
	const ratingCount = rating?.count ?? 0
	const formattedPrice = price?.toLocaleString('vi-VN', {
		style: 'currency',
		currency: 'VND',
	}) ?? 'Liên hệ'

	return (
		<Card style={{ width: '18rem' }} className="h-100 shadow-sm">
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
				<Card.Text className="fw-bold text-primary mb-2">
					{formattedPrice}
				</Card.Text>
				<Card.Text className="text-muted mt-auto mb-0">
					Đánh giá: {ratingValue} ({ratingCount} lượt)
				</Card.Text>
			</Card.Body>
		</Card>
	)
}

export default ProductCard
