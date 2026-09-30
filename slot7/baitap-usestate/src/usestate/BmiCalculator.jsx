import { useState } from 'react'
import { Alert, Card, Form } from 'react-bootstrap'

function classify(bmi) {
  if (bmi < 18.5) {
    return { label: 'Thiếu cân', variant: 'info' }
  }

  if (bmi < 23) {
    return { label: 'Bình thường', variant: 'success' }
  }

  if (bmi < 25) {
    return { label: 'Thừa cân', variant: 'warning' }
  }

  return { label: 'Béo phì', variant: 'danger' }
}

function BmiCalculator() {
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [unit, setUnit] = useState('cm')

  const h = Number(height)
  const w = Number(weight)
  const heightInMeters = unit === 'cm' ? h / 100 : h
  const errors = {}

  if (height !== '') {
    const min = unit === 'cm' ? 50 : 0.5
    const max = unit === 'cm' ? 250 : 2.5

    if (!(heightInMeters >= (unit === 'cm' ? 0.5 : min) && heightInMeters <= (unit === 'cm' ? 2.5 : max))) {
      errors.height = `Chiều cao từ ${min} đến ${max} ${unit}`
    }
  }

  if (weight !== '' && !(w >= 10 && w <= 300)) {
    errors.weight = 'Cân nặng từ 10 đến 300 kg'
  }

  const ready = height !== '' && weight !== '' && Object.keys(errors).length === 0
  const bmi = ready ? w / heightInMeters ** 2 : null
  const result = bmi === null ? null : { bmi, ...classify(bmi) }

  const changeUnit = (next) => {
    if (next === unit) {
      return
    }

    if (height !== '') {
      const converted = next === 'cm' ? h * 100 : h / 100
      setHeight(String(converted))
    }

    setUnit(next)
  }

  return (
    <main className="container py-5" style={{ maxWidth: '760px' }}>
      <header className="mb-4">
        <h1 className="h2 mb-2">Máy tính BMI</h1>
        <p className="text-secondary mb-0">
          Nhập chiều cao và cân nặng để tính chỉ số BMI theo chuẩn châu Á.
        </p>
      </header>

      <Card>
        <Card.Body>
          <Form.Group className="mb-3" controlId="height">
            <Form.Label>Chiều cao</Form.Label>
            <div className="input-group">
              <Form.Control
                type="number"
                min={unit === 'cm' ? 50 : 0.5}
                max={unit === 'cm' ? 250 : 2.5}
                step={unit === 'cm' ? 1 : 0.1}
                value={height}
                onChange={(event) => setHeight(event.target.value)}
                isInvalid={Boolean(errors.height)}
                placeholder={unit === 'cm' ? 'Ví dụ: 170' : 'Ví dụ: 1.7'}
              />
              <div className="input-group-text p-0">
                <Form.Check
                  inline
                  type="radio"
                  id="height-unit-cm"
                  name="height-unit"
                  label="cm"
                  checked={unit === 'cm'}
                  onChange={() => changeUnit('cm')}
                  className="ms-2"
                />
                <Form.Check
                  inline
                  type="radio"
                  id="height-unit-m"
                  name="height-unit"
                  label="m"
                  checked={unit === 'm'}
                  onChange={() => changeUnit('m')}
                  className="me-2"
                />
              </div>
              {errors.height && (
                <Form.Control.Feedback type="invalid">
                  {errors.height}
                </Form.Control.Feedback>
              )}
            </div>
          </Form.Group>

          <Form.Group className="mb-4" controlId="weight">
            <Form.Label>Cân nặng</Form.Label>
            <div className="input-group">
              <Form.Control
                type="number"
                min="10"
                max="300"
                step="0.1"
                value={weight}
                onChange={(event) => setWeight(event.target.value)}
                isInvalid={Boolean(errors.weight)}
                placeholder="Ví dụ: 65"
              />
              <span className="input-group-text">kg</span>
              {errors.weight && (
                <Form.Control.Feedback type="invalid">
                  {errors.weight}
                </Form.Control.Feedback>
              )}
            </div>
          </Form.Group>

          {result ? (
            <Alert variant={result.variant} className="mb-0">
              BMI = {result.bmi.toFixed(1)} → {result.label}
            </Alert>
          ) : (
            <p className="text-secondary mb-0">
              Nhập chiều cao từ 50 đến 250 cm và cân nặng từ 10 đến 300 kg.
            </p>
          )}
        </Card.Body>
      </Card>
    </main>
  )
}

export default BmiCalculator
