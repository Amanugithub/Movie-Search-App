
import './App.css'
import { BrowserRouter , Routes , Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import MovieDetail from './pages/MovieDetail.jsx'
import Watchlist from './pages/Watchlist.jsx'
import {GenreContext} from './contexts/GenreContext.js'
import genreList from '../src/assets/genreList.js'
import NavBar from './components/NavBar.jsx'
const genres = genreList;


function App() {

 
  return (
    <GenreContext.Provider value={genres}>
     
    <BrowserRouter>
     <NavBar />
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/details/:id' element={<MovieDetail />} />
          <Route path='/watchlist' element={<Watchlist />} />
      </Routes>
    </BrowserRouter>
    </GenreContext.Provider>
  )
}

export default App

