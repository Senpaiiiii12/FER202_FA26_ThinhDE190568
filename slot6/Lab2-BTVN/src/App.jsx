import { useState } from 'react'
import PizzaCard from './components/PizzaCard.jsx'
import { pizzas } from './data/pizzas.js'
import './App.css'

const slides = [
  {
    title: 'Neapolitan Pizza',
    description: 'If you are looking for traditional Italian pizza, the Neapolitan is the best option.',
  },
  {
    title: 'Fresh from our oven',
    description: 'Handmade dough, fresh ingredients, and a little taste of Italy in every slice.',
  },
  {
    title: 'Pizza for every occasion',
    description: 'Gather around the table and make tonight a little more delicious.',
  },
]

function App() {
  const [selectedPizza, setSelectedPizza] = useState('')
  const [messageSent, setMessageSent] = useState(false)

  function handleBookingSubmit(event) {
    event.preventDefault()
    setMessageSent(true)
    event.currentTarget.reset()
    setSelectedPizza('')
  }

  return (
    <div className="restaurant-page">
      <header className="site-header">
        <nav className="navbar navbar-expand-md navbar-dark container">
          <a className="navbar-brand" href="#home">Pizza House</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNavigation"
            aria-controls="mainNavigation"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="mainNavigation">
            <ul className="navbar-nav me-auto">
              <li className="nav-item"><a className="nav-link" href="#home">Home</a></li>
              <li className="nav-item"><a className="nav-link" href="#menu">About Us</a></li>
              <li className="nav-item"><a className="nav-link" href="#booking">Contact</a></li>
            </ul>
            <form className="d-flex search-form" role="search" onSubmit={(event) => event.preventDefault()}>
              <input className="form-control form-control-sm" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-danger btn-sm" type="submit" aria-label="Submit search">⌕</button>
            </form>
          </div>
        </nav>
      </header>

      <main>
        <section id="home" className="hero-carousel carousel slide" data-bs-ride="carousel">
          <div className="carousel-indicators">
            {slides.map((slide, index) => (
              <button
                key={slide.title}
                type="button"
                data-bs-target="#home"
                data-bs-slide-to={index}
                className={index === 0 ? 'active' : ''}
                aria-current={index === 0 ? 'true' : undefined}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>
          <div className="carousel-inner">
            {slides.map((slide, index) => (
              <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={slide.title}>
                <img src="/images/pizza1.jpg" className="hero-image" alt="Freshly baked pizzas" />
                <div className="carousel-caption">
                  <h1>{slide.title}</h1>
                  <p>{slide.description}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#home" data-bs-slide="prev" aria-label="Previous slide">
            <span className="carousel-control-prev-icon" aria-hidden="true" />
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#home" data-bs-slide="next" aria-label="Next slide">
            <span className="carousel-control-next-icon" aria-hidden="true" />
          </button>
        </section>

        <section id="menu" className="menu-section container">
          <h2>Our Menu</h2>
          <div className="row g-3 g-lg-4">
            {pizzas.map((pizza) => (
              <div className="col-6 col-md-3" key={pizza.name}>
                <PizzaCard pizza={pizza} onBuy={() => {
                  setSelectedPizza(pizza.name)
                  setMessageSent(false)
                }} />
              </div>
            ))}
          </div>
        </section>

        <section id="booking" className="booking-section container">
          <h2>Book Your Table</h2>
          <form onSubmit={handleBookingSubmit}>
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
                <select className="form-select form-select-sm" id="service" name="service" value={selectedPizza} onChange={(event) => setSelectedPizza(event.target.value)} required>
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
      </main>
    </div>
  )
}

export default App
