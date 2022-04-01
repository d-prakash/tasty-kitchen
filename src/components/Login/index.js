import {Component} from 'react'
import './index.css'

class Login extends Component {
  render() {
    return (
      <div className="login-container">
        <div className="login-card">
          <img
            src="https://i.postimg.cc/XNZMm0J3/Frame-274-1.jpg"
            className="app-logo"
            alt="logo"
          />
          <h1 className="tasty-kitchen-heading">Tasty Kitchens</h1>
          <img
            src="https://i.postimg.cc/5yRfcwYm/Rectangle-1456-3.jpg"
            className="logo-background-img logo-background-image"
            alt="website logo"
          />
          <img
            src="https://i.postimg.cc/5yRfcwYm/Rectangle-1456-3.jpg"
            className="logo-background-image"
            alt="website logo"
          />
          <h1 className="login-text">Login</h1>
          <form className="form-container">
            <div className="input-container">
              <label className="input-label" htmlFor="userName">
                USERNAME
              </label>
              <input
                type="text"
                id="userName"
                className="username-input-field"
              />
            </div>
            <div className="input-container">
              <label className="input-label" htmlFor="password">
                PASSWORD
              </label>
              <input
                type="password"
                id="password"
                className="password-input-field"
              />
            </div>
            <div className="input-container">
              <button type="button" className="login-button">
                Login
              </button>
            </div>
          </form>
        </div>
        <img
          src="https://i.postimg.cc/5yRfcwYm/Rectangle-1456-3.jpg"
          className="logo-background"
          alt="website logo"
        />
      </div>
    )
  }
}

export default Login
