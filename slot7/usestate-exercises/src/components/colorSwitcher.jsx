import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import './colorSwitcher.css'

const colors = ['red', 'blue', 'green', 'yellow']

function ColorSwitcher() {
	const [color, setColor] = useState('blue')

	return (
		<main className="color-switcher">
			<h1>Color Switcher</h1>
			<Form.Select
				aria-label="Chọn màu nền"
				value={color}
				onChange={(event) => setColor(event.target.value)}
			>
				{colors.map((option) => (
					<option key={option} value={option}>
						{option.charAt(0).toUpperCase() + option.slice(1)}
					</option>
				))}
			</Form.Select>
			<div
				className="color-preview"
				style={{ backgroundColor: color }}
				aria-label={`Màu đã chọn: ${color}`}
			/>
		</main>
	)
}

export default ColorSwitcher
