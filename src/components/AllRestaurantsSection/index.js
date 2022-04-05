import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import RestaurantCard from '../RestaurantCard'
import './index.css'

const limit = 9

class AllRestaurantsSection extends Component {
  state = {restaurantList: [], activePage: 1, isLoading: false}

  componentDidMount() {
    this.getAllRestaurantsData()
  }

  getActivePage = page => {
    window.scrollTo(500, 500)
    this.setState({activePage: page}, this.getAllRestaurantsData)
  }

  getAllRestaurantsData = async () => {
    this.setState({
      isLoading: true,
    })
    const {activePage} = this.state
    const offset = (activePage - 1) * limit
    const jwtToken = Cookies.get('jwt_token')
    const restaurantsApiUrl = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${limit}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(restaurantsApiUrl, options)
    const fetchedData = await response.json()
    console.log(fetchedData)
    if (response.ok === true) {
      // const fetchedData = await response.json()
      const updatedData = fetchedData.restaurants.map(restaurant => ({
        costForTwo: restaurant.cost_for_two,
        cuisine: restaurant.cuisine,
        groupByTime: restaurant.group_by_time,
        hasOnlineDelivery: restaurant.has_online_delivery,
        hasTableBooking: restaurant.has_table_booking,
        id: restaurant.id,
        imageUrl: restaurant.image_url,
        isDeliveringNow: restaurant.is_delivering_now,
        location: restaurant.location,
        menuType: restaurant.menu_type,
        name: restaurant.name,
        opensAt: restaurant.opens_at,
        userRating: {
          rating: restaurant.user_rating.rating,
          ratingColor: restaurant.user_rating.rating_color,
          ratingText: restaurant.user_rating.rating_text,
          totalReviews: restaurant.user_rating.total_reviews,
        },
      }))
      this.setState({restaurantList: updatedData, isLoading: false})
    }
  }

  renderRestaurantList = () => {
    const {restaurantList} = this.state
    return (
      <div className="restaurant-section">
        <div className="header-text-container">
          <h1 className="restaurant-list-heading">Popular Restaurants</h1>
          <p className="description">
            Select your favorite restaurant special dish and make your day
            happy...
          </p>
        </div>
        <hr className="horizontal-line" />
        <ul className="restaurant-list">
          {restaurantList.map(restaurant => (
            <RestaurantCard restaurantData={restaurant} key={restaurant.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  render() {
    const {isLoading} = this.state
    return isLoading ? this.renderLoader() : this.renderRestaurantList()
  }
}

export default AllRestaurantsSection
