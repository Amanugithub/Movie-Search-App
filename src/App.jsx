import { useState } from 'react'
import './App.css'
import { BrowserRouter , Routes , Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import MovieDetail from './pages/MovieDetail.jsx'
import Watchlist from './pages/Watchlist.jsx'


function App() {
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const ACCESS_TOKEN =  import.meta.env.VITE_ACESS_TOKEN_AUTH;
  const URL = "https://api.themoviedb.org/3/movie/popular";
  
  
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
