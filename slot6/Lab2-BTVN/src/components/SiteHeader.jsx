function SiteHeader() {
  return (
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
  )
}

export default SiteHeader