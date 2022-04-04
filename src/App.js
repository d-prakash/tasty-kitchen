import {Route, Switch} from 'react-router-dom'

import Footer from './components/Footer'
import Home from './components/Home'
import Cart from './components/Cart'
import Login from './components/Login'
import './App.css'

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

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/cart" component={Cart} />
    <Footer />
  </Switch>
)

export default App
