import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const getColor = current => {
    const {history} = props
    // console.log(history)
    if (history.location.pathname === current) {
      return '#f7931e'
    }
    return '##334155'
  }

  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-header">
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
        <div className="icon-container">
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
        </div>
        <ul className="nav-menu">
          <li className="nav-menu-item">
            <Link className="nav-link" to="/" style={{color: getColor('/')}}>
              Home
            </Link>
          </li>
          <li className="nav-menu-item">
            <Link
              className="nav-link"
              to="/cart"
              style={{color: getColor('/cart')}}
            >
              Cart
            </Link>
          </li>
        </ul>
        <button
          type="button"
          className="logout-desktop-btn"
          onClick={onClickLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)
