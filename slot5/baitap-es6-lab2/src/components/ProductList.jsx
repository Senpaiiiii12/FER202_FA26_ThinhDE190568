import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import ProductCard from './ProductCard'

const ProductList = ({ products }) => {
	const [selectedCategory, setSelectedCategory] = useState('Tất cả')
	const categories = [
		'Tất cả',
		...new Set(products.map((product) => product.category.name)),
	]

	const filteredProducts = selectedCategory === 'Tất cả'
		? products
		: products.filter((product) => product.category.name === selectedCategory)

	return (
		<div className="container py-4">
			<h2 className="mb-3">Có {filteredProducts.length} sản phẩm</h2>
			<div className="d-flex flex-wrap gap-2 mb-4">
				{categories.map((category) => (
					<Button
						key={category}
						variant={selectedCategory === category ? 'primary' : 'outline-primary'}
						size="sm"
						onClick={() => setSelectedCategory(category)}
					>
						{category}
					</Button>
				))}
			</div>
			<Row xs={1} md={2} lg={4} className="g-4">
				{filteredProducts.map((product) => (
					<Col key={product.id}>
						<ProductCard product={product} />
					</Col>
				))}
			</Row>
		</div>
	)
}

export default ProductList
