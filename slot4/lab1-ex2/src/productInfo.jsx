import ProductCard from './Card'

function ProductInfo({ products }) {
  return (
    <>
      {products.map((product) => (
        <div key={product.name} className="col-12 col-md-6 col-lg-4">
          <ProductCard
            name={product.name}
            price={product.price}
            tag={product.tag}
            avatar={product.avatar}
          />
        </div>
      ))}
    </>
  )
}

export default ProductInfo
