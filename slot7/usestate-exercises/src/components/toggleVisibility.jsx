import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import './toggleVisibility.css'

function ToggleVisibility() {
	const [isVisible, setIsVisible] = useState(false)

	return (
		<div className="toggle-visibility-widget">
			<Button
				type="button"
				variant="primary"
				aria-expanded={isVisible}
				aria-controls="toggle-message"
				onClick={() => setIsVisible((visible) => !visible)}
			>
				{isVisible ? 'Hide' : 'Show'}
			</Button>
			{isVisible && <p id="toggle-message">Toggle me!</p>}
		</div>
	)
}

export default ToggleVisibility
