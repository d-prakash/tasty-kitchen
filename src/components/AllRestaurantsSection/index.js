import {Component} from 'react'
import {RiArrowDropLeftLine, RiArrowDropRightLine} from 'react-icons/ri'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import RestaurantCard from '../RestaurantCard'
import RestaurantsHeader from '../RestaurantsHeader'
import './index.css'

const limit = 9

const restaurantApiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

class AllRestaurantsSection extends Component {
  state = {
    restaurantList: [],
    activePage: 1,
    restaurantApiStatus: restaurantApiStatusConstants.initial,
    sortOption: sortByOptions[1].value,
    totalPages: 0,
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
    const {activePage, sortOption} = this.state
    const offset = (activePage - 1) * limit
    const jwtToken = Cookies.get('jwt_token')
    const restaurantsApiUrl = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${limit}&sort_by_rating=${sortOption}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(restaurantsApiUrl, options)
    const fetchedData = await response.json()

    const totalPages = Math.ceil(fetchedData.total / limit)
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
        totalPages,
      })
    } else if (response.ok === false) {
      this.setState({
        restaurantApiStatus: restaurantApiStatusConstants.failure,
      })
    }
  }

  updateOption = option => {
    this.setState({sortOption: option}, this.getAllRestaurantsData)
  }

  decrementPage = () => {
    const {activePage} = this.state
    if (activePage > 1) {
      this.setState(
        prevState => ({
          activePage: prevState.activePage - 1,
        }),
        this.getAllRestaurantsData,
      )
    }
  }

  incrementPage = () => {
    const {activePage, totalPages} = this.state
    if (activePage < totalPages) {
      this.setState(
        prevState => ({
          activePage: prevState.activePage + 1,
        }),
        this.getAllRestaurantsData,
      )
    }
  }

  restaurantsDisplayLoading = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  noRestaurantsView = () => (
    <div className="no-res-container">
      <p className="description">No Restaurants Found!</p>
    </div>
  )

  restaurantsDisplayLoading = () => (
    <div className="products-loader-container" testid="restaurants-list-loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderRestaurantsView = () => {
    const {
      restaurantList,
      showNoRes,
      sortOption,
      activePage,
      totalPages,
    } = this.state
    // console.log(restaurantList)
    return (
      <>
        {showNoRes ? (
          <p>No Restaurants Found</p>
        ) : (
          <>
            <div>
              <RestaurantsHeader
                sortOption={sortOption}
                sortByOptions={sortByOptions}
                updateOption={this.updateOption}
              />
              <hr className="hr-line" />
            </div>
            <ul className="restaurant-list">
              {restaurantList.map(restaurant => (
                <RestaurantCard
                  key={restaurant.id}
                  restaurantData={restaurant}
                />
              ))}
            </ul>
            <div className="pagination-container">
              <button
                type="button"
                className="pagination-button"
                onClick={this.decrementPage}
                testid="pagination-left-button"
              >
                <RiArrowDropLeftLine size={20} />
              </button>
              <p testid="active-page-number" className="page-count">
                {activePage}
              </p>
              <span className="page-count">of</span>
              <p className="page-count"> {totalPages}</p>
              <button
                type="button"
                className="pagination-button"
                onClick={this.incrementPage}
                testid="pagination-right-button"
              >
                <RiArrowDropRightLine size={20} />
              </button>
            </div>
          </>
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
        {this.onRenderDisplayRestaurants()}
      </div>
    )
  }
}
export default AllRestaurantsSection
