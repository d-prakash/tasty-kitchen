import './App.css'
import Counter from './components/Counter'
import Footer from './components/Footer'

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
  <>
    <Counter />
    <Footer />
  </>
)

export default App
