import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

class Header extends Component {
  render() {
    return (
      <nav className="nav-header">
        <div className="nav-content">
          <div className="navbar-small-screen-container">
            <Link className="nav-link" to="/">
              <div className="header-logo-container">
                <img
                  src="https://res.cloudinary.com/nsp/image/upload/v1635311275/tastyKitchens/websiteLogo_1x_fzy1tx.png"
                  className="website-logo"
                  alt="website logo"
                />
                <p className="logo-name">Tasty Kitchens</p>
              </div>
            </Link>
            <button type="button" className="nav-mobile-btn">
              <img
                src="https://res.cloudinary.com/nsp/image/upload/v1635332660/tastyKitchens/menu_1x_fcu8zv.png"
                className="navbar-image"
                alt="nav menu"
              />
            </button>
          </div>

          <div className="nav-bar-large-screen-container">
            <Link className="nav-link" to="/">
              <div className="header-logo-container">
                <img
                  src="https://res.cloudinary.com/nsp/image/upload/v1635311275/tastyKitchens/websiteLogo_1x_fzy1tx.png"
                  className="website-logo"
                  alt="website logo"
                />
                <p className="logo-name">Tasty Kitchens</p>
              </div>
            </Link>
            <ul className="nav-menu">
              <li className="nav-menu-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-menu-item">
                <Link className="nav-link" to="/cart">
                  Cart
                </Link>
              </li>
            </ul>
            <button type="button" className="logout-desktop-btn">
              Logout
            </button>
          </div>
        </div>
      </nav>
    )
  }
}

export default Header
