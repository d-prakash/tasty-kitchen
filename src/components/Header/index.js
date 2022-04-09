import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import {GiHamburgerMenu} from 'react-icons/gi'
import {AiOutlineCloseCircle} from 'react-icons/ai'
import Popup from 'reactjs-popup'
import CartContext from '../../context/cartContext'

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

  const renderCartNumber = () => (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        const itemsCount = cartList.length

        return (
          <>
            {itemsCount > 0 && (
              <span className="cart-count-badge">{itemsCount}</span>
            )}
          </>
        )
      }}
    </CartContext.Consumer>
  )

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

          <Link
            className="nav-link"
            to="/cart"
            style={{color: getColor('/cart')}}
          >
            <li className="nav-menu-item">
              Cart
              {renderCartNumber()}
            </li>
          </Link>

          <li>
            <button
              type="button"
              className="logout-desktop-btn"
              onClick={onClickLogout}
            >
              Logout
            </button>
          </li>
        </ul>
        <Popup
          trigger={
            <button type="button" className="hamburger-btn">
              <GiHamburgerMenu size={25} className="hamburger" />
            </button>
          }
        >
          {close => (
            <div className="modal-container">
              <div className="nav-link-container">
                <Link to="/" className="nav-link">
                  <p className="nav-menu-item" style={{color: getColor('/')}}>
                    Home
                  </p>
                </Link>
                <Link to="/cart" className="nav-link">
                  <p className="cart-number" style={{color: getColor('/cart')}}>
                    Cart
                    {renderCartNumber()}
                  </p>
                </Link>
                <button
                  type="button"
                  className="logout-desktop-btn"
                  onClick={onClickLogout}
                >
                  Logout
                </button>
              </div>
              <button type="button" className="close-btn">
                <AiOutlineCloseCircle size={18} onClick={() => close()} />
              </button>
            </div>
          )}
        </Popup>
      </div>
    </nav>
  )
}

export default withRouter(Header)
