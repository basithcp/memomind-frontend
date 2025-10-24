import React from 'react'

const Header = () => {
  return (
    <div className="bg-light border-bottom p-3">
      <div className="d-flex justify-content-end align-items-center">
        <div className="d-flex align-items-center">
          <span className="me-3 text-dark fw-semibold">Bob</span>
          <a href="#" className="text-danger text-decoration-none me-3">
            <span className="me-1">→</span>log out
          </a>
          <div className="user-avatar">
            <span className="text-muted">👤</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
