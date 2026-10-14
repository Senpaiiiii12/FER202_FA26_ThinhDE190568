import { Carousel } from 'react-bootstrap'
import banners from '../data/banners.js'

function MyCarousel() {
  return (
    <Carousel interval={3000}>
      {banners.map((banner) => (
        <Carousel.Item key={banner.title}>
          <img
            className="d-block w-100"
            src={banner.image}
            alt={banner.title}
            style={{
              height: '400px',
              objectFit: 'contain',
              backgroundColor: '#000',
            }}
          />
          <Carousel.Caption>
            <h3>{banner.title}</h3>
            <p>{banner.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default MyCarousel