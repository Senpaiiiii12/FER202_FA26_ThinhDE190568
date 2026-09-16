function ProductInfo(props) {
  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="card-title">Thông tin sản phẩm</h2>
        <p className="card-text">Tên sản phẩm: {props.Name}</p>
        <p className="card-text">Giá: {props.Price}</p>
        <p className="card-text">Tag: {props.tag}</p>
      </div>
    </div>
  )
}

export default ProductInfo