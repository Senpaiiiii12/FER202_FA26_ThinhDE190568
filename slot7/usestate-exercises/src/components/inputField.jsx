import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import './inputField.css'

function InputField() {
	const [text, setText] = useState('')

	return (
		<div className="input-field-widget">
			<h1>Input Field</h1>
			<Form.Control
				type="text"
				aria-label="Nhập văn bản"
				placeholder="Nhập văn bản..."
				value={text}
				onChange={(event) => setText(event.target.value)}
			/>
			<p aria-live="polite">Input text: {text}</p>
		</div>
	)
}

export default InputField
