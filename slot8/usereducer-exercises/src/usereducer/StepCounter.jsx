import { useReducer } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';

const MIN = 0;
const MAX = 100;

const ACTIONS = {
	INCREMENT: 'counter/increment',
	DECREMENT: 'counter/decrement',
	SET_STEP: 'counter/setStep',
	RESET: 'counter/reset',
};

const initialState = { count: 0, step: 1, history: [] };

const clamp = (value) => Math.min(MAX, Math.max(MIN, value));

const counterReducer = (state, action) => {
	switch (action.type) {
		case ACTIONS.INCREMENT:
		case ACTIONS.DECREMENT: {
			const delta = action.type === ACTIONS.INCREMENT ? state.step : -state.step;
			const next = clamp(state.count + delta);

			if (next === state.count) return state;

			return {
				...state,
				count: next,
				history: [`${state.count} → ${next}`, ...state.history].slice(0, 5),
			};
		}
		case ACTIONS.SET_STEP:
			return { ...state, step: action.payload };
		case ACTIONS.RESET:
			return initialState;
		default:
			throw new Error(`Action không hợp lệ: ${action.type}`);
	}
};

const StepCounter = () => {
	const [state, dispatch] = useReducer(counterReducer, initialState);
	const { count, step, history } = state;

	return (
		<Card className="step-counter shadow-sm">
			<Card.Body>
				<Card.Title className="text-center">Bộ đếm có bước nhảy</Card.Title>
				<div className="display-4 fw-semibold text-center my-3" aria-live="polite">
					{count}
				</div>

				<div className="d-flex flex-wrap gap-2 justify-content-center mb-4">
					<Button
						variant="outline-secondary"
						disabled={count <= MIN}
						onClick={() => dispatch({ type: ACTIONS.DECREMENT })}
					>
						{`− ${step}`}
					</Button>
					<Button
						disabled={count >= MAX}
						onClick={() => dispatch({ type: ACTIONS.INCREMENT })}
					>
						{`+ ${step}`}
					</Button>
					<Button variant="outline-danger" onClick={() => dispatch({ type: ACTIONS.RESET })}>
						Đặt lại
					</Button>
				</div>

				<Form.Group className="mb-4" controlId="step-select">
					<Form.Label>Bước nhảy</Form.Label>
					<Form.Select
						value={step}
						onChange={(event) =>
							dispatch({ type: ACTIONS.SET_STEP, payload: Number(event.target.value) })
						}
					>
						{[1, 5, 10, 25].map((value) => (
							<option key={value} value={value}>
								{value}
							</option>
						))}
					</Form.Select>
				</Form.Group>

				<h2 className="h6">5 thay đổi gần nhất</h2>
				<ListGroup>
					{history.length === 0 ? (
						<ListGroup.Item className="text-muted">Chưa có thay đổi</ListGroup.Item>
					) : (
						history.map((change, index) => (
							<ListGroup.Item key={`${change}-${index}`}>{change}</ListGroup.Item>
						))
					)}
				</ListGroup>
			</Card.Body>
		</Card>
	);
};

export default StepCounter;
