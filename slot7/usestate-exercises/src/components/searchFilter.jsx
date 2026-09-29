import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import ListGroup from 'react-bootstrap/ListGroup'
import './searchFilter.css'

const items = ['Apple', 'Banana', 'Blueberry', 'Mango', 'Orange', 'Strawberry']

function SearchFilter() {
	const [search, setSearch] = useState('')
	const filteredItems = items.filter((item) =>
		item.toLowerCase().includes(search.trim().toLowerCase()),
	)

	return (
		<main className="search-filter-widget">
			<h1>Search Filter</h1>
			<Form.Control
				type="search"
				aria-label="Tìm kiếm mục"
				placeholder="Search items..."
				value={search}
				onChange={(event) => setSearch(event.target.value)}
			/>
			<ListGroup>
				{filteredItems.length > 0 ? (
					filteredItems.map((item) => <ListGroup.Item key={item}>{item}</ListGroup.Item>)
				) : (
					<ListGroup.Item>Không tìm thấy kết quả</ListGroup.Item>
				)}
			</ListGroup>
		</main>
	)
}

export default SearchFilter
