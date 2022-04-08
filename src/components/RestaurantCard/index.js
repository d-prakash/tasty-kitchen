import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import './index.css'

const RestaurantCard = props => {
  const {restaurantData} = props
  const {imageUrl, name, cuisine, id, userRating} = restaurantData
  const {rating, totalReviews} = userRating

  return (
    <Link
      to={`/restaurant/${id}`}
      style={{textDecoration: 'none', alignItems: 'center'}}
      testid="restaurant-item"
    >
      <li className="restaurant-card">
        <img src={imageUrl} alt="restaurant" className="restaurant-image" />
        <div className="restaurant-details">
          <h1 className="restaurant-name">{name}</h1>
          <p className="restaurant-cuisine">{cuisine}</p>
          <div className="ratings-container">
            <FaStar size="13px" color="#FFCC00" className="star" />
            <p className="rest-rating">{rating}</p>
            <p className="reviews">({totalReviews} ratings)</p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default RestaurantCard
