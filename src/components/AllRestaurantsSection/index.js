import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import RestaurantCard from '../RestaurantCard'
import './index.css'

const limit = 9

const restaurantApiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class AllRestaurantsSection extends Component {
  state = {
    restaurantList: [],
    activePage: 1,
    restaurantApiStatus: restaurantApiStatusConstants.initial,
  }

  componentDidMount() {
    this.getAllRestaurantsData()
  }

  getActivePage = page => {
    window.scrollTo(500, 500)
    this.setState({activePage: page}, this.getAllRestaurantsData)
  }

  getAllRestaurantsData = async () => {
    this.setState({
      restaurantApiStatus: restaurantApiStatusConstants.inProgress,
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
    // console.log(fetchedData)
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
      this.setState({
        restaurantApiStatus: restaurantApiStatusConstants.success,
        restaurantList: updatedData,
      })
    } else if (response.ok === false) {
      this.setState({
        restaurantApiStatus: restaurantApiStatusConstants.failure,
      })
    }
  }

  restaurantsDisplayLoading = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  popularRestaurantsView = () => (
    <div className="restaurant-section">
      <div className="header-text-container">
        <h1 className="restaurant-list-heading">Popular Restaurants</h1>
        <p className="description">
          Select your favorite restaurant special dish and make your day
          happy...
        </p>
      </div>

      <hr className="horizontal-line" />
    </div>
  )

  noRestaurantsView = () => (
    <div className="no-res-container">
      <p className="description">No Restaurants Found!</p>
    </div>
  )

  restaurantsDisplayLoading = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderRestaurantsView = () => {
    const {restaurantList, showNoRes} = this.state
    // console.log(restaurantList)
    return (
      <>
        {showNoRes ? (
          <p>No Restaurants Found</p>
        ) : (
          <ul className="restaurant-list">
            {restaurantList.map(restaurant => (
              <RestaurantCard key={restaurant.id} restaurantData={restaurant} />
            ))}
          </ul>
        )}
      </>
    )
  }

  noRestaurantsView = () => (
    <div className="no-res-container">
      <p className="description">No Restaurants Found!</p>
    </div>
  )

  onRenderDisplayRestaurants = () => {
    const {restaurantApiStatus} = this.state

    switch (restaurantApiStatus) {
      case restaurantApiStatusConstants.success:
        return this.renderRestaurantsView()
      case restaurantApiStatusConstants.inProgress:
        return this.restaurantsDisplayLoading()
      case restaurantApiStatusConstants.failure:
        return this.noRestaurantsView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="display-container">
        {this.popularRestaurantsView()}
        {this.onRenderDisplayRestaurants()}
      </div>
    )
  }
}
export default AllRestaurantsSection
