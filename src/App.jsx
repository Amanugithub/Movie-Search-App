
import './App.css'
import { BrowserRouter , Routes , Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import MovieDetail from './pages/MovieDetail.jsx'
import Watchlist from './pages/Watchlist.jsx'

function App() {


  
  
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/movie:id' element={<MovieDetail />} />
          <Route path='/watchlist' element={<Watchlist />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
