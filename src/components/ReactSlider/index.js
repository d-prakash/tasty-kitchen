import {Component} from 'react'
import Slider from 'react-slick'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import './index.css'

export default class ReactSlider extends Component {
  state = {carouselList: [], isLoading: true}

  componentDidMount() {
    this.getCorousel()
  }

  getCorousel = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    // console.log(data)
    const dataList = data.offers.map(eachList => ({
      id: eachList.id,
      imageUrl: eachList.image_url,
    }))
    this.setState({carouselList: dataList, isLoading: false})
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderCorousel = () => {
    const {carouselList} = this.state
    const settings = {
      dots: true,
      speed: 1000,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000,
    }
    return (
      <ul className="carousel-container">
        <Slider className="carousel" {...settings}>
          {carouselList.map(eachCarousel => (
            <li key={eachCarousel.id}>
              <img
                src={eachCarousel.imageUrl}
                alt="offer"
                className="carousel-img"
              />
            </li>
          ))}
        </Slider>
      </ul>
    )
  }

  render() {
    const {isLoading} = this.state
    return isLoading ? this.renderLoader() : this.renderCorousel()
  }
}
