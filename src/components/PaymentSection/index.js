import {Link} from 'react-router-dom'

import CartContext from '../../context/cartContext'

import './index.css'

const PaymentSection = () => (
  <CartContext.Consumer>
    {value => {
      const {removeAllCartItems} = value

      const clearCart = () => {
        removeAllCartItems()
      }

      return (
        <>
          <div className="payment-container">
            <div className="payment-card">
              <img
                src="https://res.cloudinary.com/dkobk5oao/image/upload/v1633712753/Vector_1_rjhmoy.png"
                alt="success"
                className="payment-image"
              />
              <h1 className="payment-heading">Payment Successful</h1>
              <p className="payment-para">
                Thank you for ordering Your payment is successfully completed.
              </p>
              <Link to="/">
                <button type="button" className="home-btn" onClick={clearCart}>
                  Go To Home Page
                </button>
              </Link>
            </div>
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default PaymentSection
