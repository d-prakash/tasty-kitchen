import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import ReactSlider from '../ReactSlider'
import AllRestaurantsSection from '../AllRestaurantsSection'

class Home extends Component {
  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <>
        <Header />
        <ReactSlider />
        <AllRestaurantsSection />
        <Footer />
      </>
    )
  }
}

export default Home
