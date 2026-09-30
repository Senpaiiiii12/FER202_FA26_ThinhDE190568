import { useState } from 'react'
import { Alert, Button, Card, ListGroup, ProgressBar } from 'react-bootstrap'

const QUESTIONS = [
  {
    id: 'q1',
    text: 'Hook nào dùng để lưu trạng thái cục bộ?',
    options: ['useEffect', 'useState', 'useRef', 'useMemo'],
    answer: 1,
  },
  {
    id: 'q2',
    text: 'Gọi setCount(count + 1) ba lần trong một sự kiện, count tăng bao nhiêu?',
    options: ['1', '2', '3', '0'],
    answer: 0,
  },
  {
    id: 'q3',
    text: 'Cách đúng để thêm phần tử vào mảng state?',
    options: [
      'list.push(x)',
      'setList(list.push(x))',
      'setList([...list, x])',
      'list[list.length] = x',
    ],
    answer: 2,
  },
  {
    id: 'q4',
    text: 'Checkbox có điều khiển dùng prop nào?',
    options: ['value', 'checked', 'selected', 'defaultValue'],
    answer: 1,
  },
]

function shuffle(array) {
  const result = [...array]

  for (let i = result.length - 1; i > 0; i -= 1) {
    const randomIndex = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[randomIndex]] = [result[randomIndex], result[i]]
  }

  return result
}

function Quiz({ onRestart }) {
  const [questions] = useState(() => shuffle(QUESTIONS))
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [finished, setFinished] = useState(false)

  const current = questions[index]
  const selected = answers[current.id]
  const answeredCount = Object.keys(answers).length
  const score = questions.filter(
    (question) => answers[question.id] === question.answer,
  ).length

  const selectAnswer = (optionIndex) => {
    setAnswers((prev) => ({
      ...prev,
      [current.id]: optionIndex,
    }))
  }

  const goNext = () => {
    if (index < questions.length - 1) {
      setIndex((i) => i + 1)
    }
  }

  const goPrevious = () => {
    setIndex((i) => i - 1)
  }

  return (
    <main className="container py-5" style={{ maxWidth: '760px' }}>
      {finished ? (
        <Card>
          <Card.Body>
            <Card.Title className="h2">Kết quả bài làm</Card.Title>
            <Alert variant="success">Bạn đúng {score}/4 câu</Alert>

            <ListGroup className="mb-4">
              {questions.map((question, questionIndex) => {
                const selectedOption = answers[question.id]
                const isCorrect = selectedOption === question.answer

                return (
                  <ListGroup.Item
                    key={question.id}
                    variant={isCorrect ? 'success' : 'danger'}
                  >
                    <div className="fw-semibold">
                      Câu {questionIndex + 1}: {question.text}
                    </div>
                    <div>
                      Đáp án của bạn:{' '}
                      {selectedOption === undefined
                        ? 'Chưa trả lời'
                        : question.options[selectedOption]}
                    </div>
                    <div>Đáp án đúng: {question.options[question.answer]}</div>
                  </ListGroup.Item>
                )
              })}
            </ListGroup>

            <Button type="button" onClick={onRestart}>
              Làm lại
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <Card>
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="text-secondary">
                Câu {index + 1}/{questions.length}
              </span>
              <span className="text-secondary">
                Đã trả lời: {answeredCount}/{questions.length}
              </span>
            </div>
            <ProgressBar
              now={(answeredCount / questions.length) * 100}
              label={`${answeredCount}/${questions.length}`}
              className="mb-4"
            />

            <Card.Title className="h4 mb-4">{current.text}</Card.Title>
            <div className="d-grid gap-2 mb-4">
              {current.options.map((option, optionIndex) => (
                <Button
                  type="button"
                  key={option}
                  variant={selected === optionIndex ? 'primary' : 'outline-secondary'}
                  className="text-start"
                  aria-pressed={selected === optionIndex}
                  onClick={() => selectAnswer(optionIndex)}
                >
                  {option}
                </Button>
              ))}
            </div>

            <div className="d-flex justify-content-between gap-2">
              <Button
                type="button"
                variant="outline-secondary"
                disabled={index === 0}
                onClick={goPrevious}
              >
                ← Trước
              </Button>

              {index === questions.length - 1 ? (
                <Button
                  type="button"
                  disabled={answeredCount !== questions.length}
                  onClick={() => setFinished(true)}
                >
                  Nộp bài
                </Button>
              ) : (
                <Button
                  type="button"
                  disabled={selected === undefined}
                  onClick={goNext}
                >
                  Tiếp →
                </Button>
              )}
            </div>
          </Card.Body>
        </Card>
      )}
    </main>
  )
}

function QuizApp() {
  const [attempt, setAttempt] = useState(1)

  return (
    <>
      <div className="container pt-4" style={{ maxWidth: '760px' }}>
        <p className="text-secondary mb-0">Lượt làm bài thứ {attempt}</p>
      </div>
      <Quiz
        key={attempt}
        onRestart={() => setAttempt((current) => current + 1)}
      />
    </>
  )
}

export default QuizApp
