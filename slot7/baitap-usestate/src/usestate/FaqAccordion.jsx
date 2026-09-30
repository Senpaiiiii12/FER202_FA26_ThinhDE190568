import { useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'

const faqs = [
	{
		id: 1,
		question: 'React là gì?',
		answer:
			'Thư viện JavaScript để xây dựng giao diện người dùng theo component.',
	},
	{
		id: 2,
		question: 'State khác props thế nào?',
		answer:
			'Props do cha truyền xuống và chỉ đọc; state do chính component quản lý và thay đổi được.',
	},
	{
		id: 3,
		question: 'Vì sao phải dùng setState?',
		answer:
			'Vì chỉ khi gọi hàm set, React mới biết dữ liệu đổi để render lại giao diện.',
	},
]

function FaqItem({ question, answer }) {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<Card className="mb-3">
			<Card.Header
				role="button"
				tabIndex={0}
				aria-expanded={isOpen}
				onClick={() => setIsOpen((open) => !open)}
				onKeyDown={(event) => {
					if (event.key === 'Enter' || event.key === ' ') {
						event.preventDefault()
						setIsOpen((open) => !open)
					}
				}}
				className="d-flex justify-content-between align-items-center"
			>
				<span>{question}</span>
				<span aria-hidden="true">{isOpen ? '−' : '+'}</span>
			</Card.Header>
			{isOpen && <Card.Body>{answer}</Card.Body>}
		</Card>
	)
}

function FaqAccordion() {
	const [singleMode, setSingleMode] = useState(false)
	const [openId, setOpenId] = useState(null)

	const handleToggle = (id) => {
		setOpenId((current) => (current === id ? null : id))
	}

	const handleModeChange = (event) => {
		setSingleMode(event.target.checked)
		setOpenId(null)
	}

	return (
		<main className="container py-5" style={{ maxWidth: '760px' }}>
			<div className="mb-4">
				<h1 className="h2 mb-2">FAQ Accordion</h1>
				<p className="text-secondary mb-0">
					Khám phá cách state boolean và state được nâng lên component cha hoạt động.
				</p>
			</div>

			<div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
				<Form.Check
					type="switch"
					id="single-mode-switch"
					label="Chỉ mở một câu tại một thời điểm"
					checked={singleMode}
					onChange={handleModeChange}
				/>
				<Button
					type="button"
					variant="outline-secondary"
					disabled={!singleMode || openId === null}
					onClick={() => setOpenId(null)}
				>
					Đóng tất cả
				</Button>
			</div>

			{singleMode
				? faqs.map(({ id, question, answer }) => {
						const isOpen = openId === id

						return (
							<Card className="mb-3" key={id}>
								<Card.Header
									role="button"
									tabIndex={0}
									aria-expanded={isOpen}
									onClick={() => handleToggle(id)}
									onKeyDown={(event) => {
										if (event.key === 'Enter' || event.key === ' ') {
											event.preventDefault()
											handleToggle(id)
										}
									}}
									className="d-flex justify-content-between align-items-center"
								>
									<span>{question}</span>
									<span aria-hidden="true">{isOpen ? '−' : '+'}</span>
								</Card.Header>
								{isOpen && <Card.Body>{answer}</Card.Body>}
							</Card>
						)
					})
				: faqs.map(({ id, question, answer }) => (
						<FaqItem key={id} question={question} answer={answer} />
					))}
		</main>
	)
}

export default FaqAccordion
