import Card from './Card'

function ProductInfo({ products }) {
  return (
    <>
      {products.map((product) => (
        <article key={product.name} className="product-card col-12 col-md-6">
          <Card
            name={product.name}
            price={product.price}
            tag={product.tags[0]}
            avatar={product.avatar}
          />
        </article>
      ))}
    </>
  )
}

export default ProductInfo