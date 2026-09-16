function Card({ name, price, tags, avatar, description, index }) {
	return (
		<article className="product-card col-12 col-md-6">
			<div className="card h-100 d-flex flex-column shadow-sm">
				<div className="product-image-wrap position-relative">
					<div className="ratio ratio-4x3">
						<img className="product-image card-img-top object-fit-cover" src={avatar} alt={name} />
					</div>
					<span className="product-index position-absolute top-0 end-0 m-3 badge text-bg-dark">
						{index}
					</span>
				</div>

				<div className="product-content card-body d-flex flex-column flex-grow-1">
				<div className="product-heading d-flex justify-content-between align-items-start gap-3">
					<h2>{name}</h2>
					<p className="product-price text-nowrap fw-bold">{price}</p>
				</div>
				<p className="product-description card-text">{description}</p>
				<div className="product-meta d-flex justify-content-between align-items-center mt-auto pt-4">
					<div className="product-tags d-flex flex-wrap gap-2" aria-label="Tags">
						{tags.map((tag) => (
							<span className="tag badge text-bg-light" key={tag}>{tag}</span>
						))}
					</div>
					<button className="add-button btn btn-primary rounded-circle" type="button" aria-label={`Thêm ${name} vào giỏ hàng`}>
						<span aria-hidden="true">+</span>
					</button>
				</div>
			</div>
			</div>
		</article>
	)
}

export default Card