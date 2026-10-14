import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export const NotFoundPage = () => (
  <Container className="mt-5 text-center">
    <h1>404 - Không tìm thấy trang</h1>
    <p>Đường dẫn bạn truy cập không tồn tại.</p>
    <Link to="/" className="btn btn-outline-primary">
      Về trang chủ
    </Link>
  </Container>
)