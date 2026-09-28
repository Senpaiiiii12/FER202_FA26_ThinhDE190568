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

function HeroCarousel() {
  return (
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
  )
}

export default HeroCarousel