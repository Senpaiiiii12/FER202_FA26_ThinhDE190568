import Badge from 'react-bootstrap/Badge'
import ListGroup from 'react-bootstrap/ListGroup'
import Table from 'react-bootstrap/Table'

const formatVND = (number) => number.toLocaleString('vi-VN', {
  style: 'currency',
  currency: 'VND',
})

const CartTable = ({ cartItems, products }) => {
  const sortedItems = [...cartItems].sort(
    (first, second) => second.price * second.quantity - first.price * first.quantity,
  )
  const totalPrice = cartItems.reduce(
    (sum, { price, quantity }) => sum + price * quantity,
    0,
  )
  const totalQuantity = cartItems.reduce(
    (sum, { quantity }) => sum + quantity,
    0,
  )
  const maxPrice = Math.max(...cartItems.map((item) => item.price))
  const onSale = products.filter(
    ({ inStock, discount }) => inStock && discount > 0,
  )

  return (
    <main className="container py-4">
      <h1 className="h3 mb-4">Bài 7: Giỏ hàng</h1>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên</th>
            <th>Đơn giá</th>
            <th>Số lượng</th>
            <th>Thành tiền</th>
          </tr>
        </thead>
        <tbody>
          {sortedItems.map(({ id, name, price, quantity }, index) => (
            <tr key={id}>
              <td>{index + 1}</td>
              <td>{name}</td>
              <td>{formatVND(price)}</td>
              <td>{quantity}</td>
              <td>{formatVND(price * quantity)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="fw-bold">
            <td colSpan={4}>Tổng tiền</td>
            <td>{formatVND(totalPrice)}</td>
          </tr>
          <tr>
            <td colSpan={4}>Tổng số lượng</td>
            <td>{totalQuantity}</td>
          </tr>
          <tr>
            <td colSpan={4}>Đơn giá cao nhất</td>
            <td>{formatVND(maxPrice)}</td>
          </tr>
        </tfoot>
      </Table>

      <h2 className="h5 mt-4">Sản phẩm đang giảm giá và còn hàng</h2>
      <ListGroup>
        {onSale.map(({ id, name, discount }) => (
          <ListGroup.Item key={id} className="d-flex justify-content-between">
            <span>{name}</span>
            <Badge bg="danger">-{discount}%</Badge>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </main>
  )
}

export default CartTable
