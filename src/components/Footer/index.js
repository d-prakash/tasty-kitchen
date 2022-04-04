import {
  FaInstagram,
  FaPinterestSquare,
  FaTwitterSquare,
  FaFacebookSquare,
} from 'react-icons/fa'

import './index.css'

const imgUrl =
  'https://res.cloudinary.com/dppqkea7f/image/upload/v1625978524/footer-icon_cs8bzb.png'

const Footer = () => (
  <div className="footer-container">
    <div className="footer-heading-container">
      <img src={imgUrl} className="logo" alt="website-footer-logo" />
      <h1 className="footer-heading">Tasty Kitchens</h1>
    </div>
    <p className="footer-description">
      The only thing we are serious about is food. Contact us on
    </p>
    <div className="social-icons-container">
      <FaPinterestSquare className="icon" />
      <FaInstagram className="icon" />
      <FaTwitterSquare className="icon" />
      <FaFacebookSquare className="icon" />
    </div>
  </div>
)
export default Footer
