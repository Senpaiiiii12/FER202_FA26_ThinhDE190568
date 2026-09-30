import { useState } from 'react'

const LABELS = ['', 'Rất tệ', 'Tệ', 'Bình thường', 'Tốt', 'Tuyệt vời']

function StarRating({ value, onChange, max = 5 }) {
	const [hovered, setHovered] = useState(0)
	const display = hovered || value

	return (
		<div onMouseLeave={() => setHovered(0)}>
			<div className="d-flex gap-1" aria-label={`Đánh giá ${display}/${max}`}>
				{Array.from({ length: max }, (_, i) => i + 1).map((star) => (
					<button
						type="button"
						className="btn p-0 border-0 fs-2 lh-1"
						key={star}
						aria-label={`${star} sao`}
						onMouseEnter={() => setHovered(star)}
						onClick={() => onChange(star === value ? 0 : star)}
						style={{ color: star <= display ? '#ffc107' : '#ced4da' }}
					>
						★
					</button>
				))}
			</div>
			<div className="small text-secondary mt-1">
				{display > 0 ? LABELS[display] || `${display}/${max}` : 'Chưa đánh giá'}
			</div>
		</div>
	)
}

export default StarRating
