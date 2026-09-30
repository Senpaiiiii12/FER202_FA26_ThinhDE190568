import { useState } from 'react'
import { Alert, Button, Card, Form } from 'react-bootstrap'
import StarRating from './StarRating'

function ReviewForm() {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [reviews, setReviews] = useState([])

  const trimmedComment = comment.trim()
  const canSubmit = rating > 0 && trimmedComment.length >= 5
  const average = reviews.length
    ? (
        reviews.reduce((total, review) => total + review.rating, 0) /
        reviews.length
      ).toFixed(1)
    : '0.0'

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!canSubmit) {
      return
    }

    setReviews((prev) => [
      { id: Date.now(), rating, comment: trimmedComment },
      ...prev,
    ])
    setRating(0)
    setComment('')
  }

  return (
    <main className="container py-5" style={{ maxWidth: '760px' }}>
      <header className="mb-4">
        <h1 className="h2 mb-2">Đánh giá sản phẩm</h1>
        <p className="text-secondary mb-0">
          Chia sẻ trải nghiệm của bạn với sản phẩm.
        </p>
      </header>

      <Card className="mb-4">
        <Card.Body>
          <Card.Title className="h5">Gửi đánh giá</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="review-rating">
              <Form.Label>Điểm đánh giá</Form.Label>
              <StarRating value={rating} onChange={setRating} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="review-comment">
              <Form.Label>Nhận xét</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                placeholder="Nhập ít nhất 5 ký tự"
              />
            </Form.Group>

            <Button type="submit" disabled={!canSubmit}>
              Gửi đánh giá
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <section aria-labelledby="reviews-heading">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 id="reviews-heading" className="h5 mb-0">
            Trung bình {average}/5 ({reviews.length} lượt)
          </h2>
        </div>

        {reviews.length === 0 ? (
          <Alert variant="light" className="border">
            Chưa có đánh giá nào.
          </Alert>
        ) : (
          <div className="d-grid gap-3">
            {reviews.map((review) => (
              <Card key={review.id}>
                <Card.Body>
                  <div className="mb-2" aria-label={`${review.rating} trên 5 sao`}>
                    <span className="text-warning">{'★'.repeat(review.rating)}</span>
                    <span className="text-secondary">
                      {'★'.repeat(5 - review.rating)}
                    </span>
                  </div>
                  <Card.Text className="mb-0">{review.comment}</Card.Text>
                </Card.Body>
              </Card>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default ReviewForm
