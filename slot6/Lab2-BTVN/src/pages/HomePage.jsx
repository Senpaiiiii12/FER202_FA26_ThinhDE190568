import { useState } from 'react'
import BookingForm from '../components/BookingForm.jsx'
import HeroCarousel from '../components/HeroCarousel.jsx'
import MenuSection from '../components/MenuSection.jsx'
import SiteHeader from '../components/SiteHeader.jsx'
import '../App.css'

function HomePage() {
  const [selectedPizza, setSelectedPizza] = useState('')
  const [messageSent, setMessageSent] = useState(false)

  function handleBuy(pizzaName) {
    setSelectedPizza(pizzaName)
    setMessageSent(false)
  }

  function handleBookingSubmit(event) {
    event.preventDefault()
    setMessageSent(true)
    event.currentTarget.reset()
    setSelectedPizza('')
  }

  function handleSelectedPizzaChange(value) {
    setSelectedPizza(value)
    setMessageSent(false)
  }

  return (
    <div className="restaurant-page">
      <SiteHeader />
      <main>
        <HeroCarousel />
        <MenuSection onBuy={handleBuy} />
        <BookingForm
          selectedPizza={selectedPizza}
          onSelectedPizzaChange={handleSelectedPizzaChange}
          messageSent={messageSent}
          onSubmit={handleBookingSubmit}
        />
      </main>
    </div>
  )
}

export default HomePage