import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onLoginSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}

    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)

    if (response.ok === true) {
      this.onLoginSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-container">
        <div className="login-card">
          <img
            src="https://i.postimg.cc/XNZMm0J3/Frame-274-1.jpg"
            className="website login"
            alt="logo"
          />
          <h1 className="tasty-kitchen-heading">Tasty Kitchens</h1>
          <img
            src="https://i.postimg.cc/5yRfcwYm/Rectangle-1456-3.jpg"
            className="logo-background-img logo-background-image"
            alt="website login"
          />
          <img
            src="https://i.postimg.cc/5yRfcwYm/Rectangle-1456-3.jpg"
            className="logo-background-image"
            alt="website logo"
          />
          <h1 className="login-text">Login</h1>
          <form className="form-container" onSubmit={this.submitForm}>
            <div className="input-container">
              <label className="input-label" htmlFor="userName">
                USERNAME
              </label>
              <input
                type="text"
                id="userName"
                className="username-input-field"
                value={username}
                onChange={this.onChangeUsername}
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
                value={password}
                onChange={this.onChangePassword}
              />
            </div>
            <div className="input-container">
              <button type="submit" className="login-button">
                Login
              </button>
              {showSubmitError && <p className="error-message">*{errorMsg}</p>}
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

export default LoginForm
