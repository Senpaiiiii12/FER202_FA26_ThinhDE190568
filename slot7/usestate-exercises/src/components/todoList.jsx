import { useRef, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import ListGroup from 'react-bootstrap/ListGroup'
import './todoList.css'

function TodoList() {
	const [input, setInput] = useState('')
	const [todos, setTodos] = useState([])
	const nextId = useRef(0)

	function addTodo(event) {
		event.preventDefault()
		const text = input.trim()

		if (!text) return

		nextId.current += 1
		setTodos((currentTodos) => [...currentTodos, { id: nextId.current, text }])
		setInput('')
	}

	function deleteTodo(id) {
		setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id))
	}

	return (
		<main className="todo-list-widget">
			<h1>Todo List</h1>
			<Form className="todo-form" onSubmit={addTodo}>
				<Form.Control
					type="text"
					aria-label="Công việc mới"
					placeholder="Nhập công việc..."
					value={input}
					onChange={(event) => setInput(event.target.value)}
				/>
				<Button type="submit">Thêm</Button>
			</Form>
			<ListGroup>
				{todos.map((todo) => (
					<ListGroup.Item className="todo-item" key={todo.id}>
						<span>{todo.text}</span>
						<Button
							type="button"
							variant="danger"
							size="sm"
							onClick={() => deleteTodo(todo.id)}
						>
							Xóa
						</Button>
					</ListGroup.Item>
				))}
			</ListGroup>
		</main>
	)
}

export default TodoList
