import { pizzas } from '../data/pizzas.js'

function BookingForm({ selectedPizza, onSelectedPizzaChange, messageSent, onSubmit }) {
  return (
    <section id="booking" className="booking-section container">
      <h2>Book Your Table</h2>
      <form onSubmit={onSubmit}>
        <div className="row g-3 mb-3">
          <div className="col-md-4">
            <label className="visually-hidden" htmlFor="guestName">Your name</label>
            <input className="form-control form-control-sm" id="guestName" name="name" placeholder="Your Name *" required />
          </div>
          <div className="col-md-4">
            <label className="visually-hidden" htmlFor="guestEmail">Your email</label>
            <input className="form-control form-control-sm" id="guestEmail" name="email" type="email" placeholder="Your Email *" required />
          </div>
          <div className="col-md-4">
            <label className="visually-hidden" htmlFor="service">Select a service</label>
            <select
              className="form-select form-select-sm"
              id="service"
              name="service"
              value={selectedPizza}
              onChange={(event) => onSelectedPizzaChange(event.target.value)}
              required
            >
              <option value="">Select a Service</option>
              {pizzas.map((pizza) => <option key={pizza.name} value={pizza.name}>{pizza.name}</option>)}
              <option value="Table reservation">Table reservation</option>
            </select>
          </div>
        </div>
        <label className="visually-hidden" htmlFor="message">Your message</label>
        <textarea className="form-control booking-message" id="message" name="message" placeholder="Please write your comment" rows="4" />
        <button className="btn btn-warning send-button mt-3" type="submit">Send Message</button>
        {messageSent && <p className="form-feedback" role="status">Thank you! Your request has been received.</p>}
      </form>
    </section>
  )
}

export default BookingForm