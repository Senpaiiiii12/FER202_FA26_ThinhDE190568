import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import './counter.css'

function Counter() {
	const [count, setCount] = useState(0)

	return (
		<div className="counter-widget">
			<h1>Counter</h1>
			<p aria-live="polite">{count}</p>
			<div className="counter-actions">
				<Button variant="primary" onClick={() => setCount((current) => current + 1)}>
					Tăng
				</Button>
				<Button variant="danger" onClick={() => setCount((current) => current - 1)}>
					Giảm
				</Button>
				<Button variant="secondary" onClick={() => setCount(0)}>
					Reset
				</Button>
			</div>
		</div>
	)
}

export default Counter
