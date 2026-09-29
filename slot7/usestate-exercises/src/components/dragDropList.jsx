import { useState } from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import './dragDropList.css'

function DragDropList() {
  const [items, setItems] = useState([
    'Học React',
    'Làm bài tập',
    'Ôn tập JavaScript',
  ])
  const [draggingItem, setDraggingItem] = useState(null)

  function handleDrop(dropIndex) {
    if (draggingItem === null || draggingItem === dropIndex) return

    setItems((currentItems) => {
      const reorderedItems = [...currentItems]
      const [draggedItem] = reorderedItems.splice(draggingItem, 1)
      reorderedItems.splice(dropIndex, 0, draggedItem)
      return reorderedItems
    })
    setDraggingItem(null)
  }

  return (
    <main className="drag-drop-list">
      <h1>Drag and Drop List</h1>
      <ListGroup>
        {items.map((item, index) => (
          <ListGroup.Item
            key={item}
            className="drag-drop-item"
            draggable
            onDragStart={() => setDraggingItem(index)}
            onDragOver={(event) => event.preventDefault()}
            onDrop={() => handleDrop(index)}
            onDragEnd={() => setDraggingItem(null)}
          >
            {item}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </main>
  )
}

export default DragDropList