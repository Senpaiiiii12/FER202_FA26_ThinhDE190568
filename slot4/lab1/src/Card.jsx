import BootstrapCard from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

function Card({ name, price, tag, avatar }) {
	return (
		<BootstrapCard className="h-100 border-0 shadow-none">
			<div className="ratio ratio-4x3">
				<BootstrapCard.Img variant="top" src={avatar} alt={name} className="object-fit-cover" />
			</div>
			<BootstrapCard.Body>
				<BootstrapCard.Title>{name}</BootstrapCard.Title>
				<BootstrapCard.Text>Price: {price}</BootstrapCard.Text>
				<div>{tag}</div>
				<Button variant="primary" className="mt-2">Mua ngay</Button>
			</BootstrapCard.Body>
		</BootstrapCard>
	)
}

export default Card