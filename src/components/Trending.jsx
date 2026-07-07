import { useEffect, useState } from 'react';


import MovieCard from '../components/MovieCard'
import MovieCarousel from './MovieCarousel';
const ACCESS_TOKEN =  import.meta.env.VITE_ACESS_TOKEN_AUTH;

export default function Trending(){
    const [trending, setTrending] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    
       //fetch trending
    useEffect(()=>{
        //fetch trending movies and series
        async function loadMovies() {
            try {
                setLoading(true);
                const data = await fetchTrending();
                setTrending(data);
                
            } catch (error) {
                setError(error);
            }finally {
                setLoading(false);
            }
        }
        loadMovies();

    },[])

    return(
    <section className="trending bg-neutral-dark pt-10" >
        {error ? <p>Error occured while loading...</p> : <p>Trending</p> }
        {loading ? <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div> : 
        <MovieCarousel trending={trending} />
         }
    </section>
    )
}


async function fetchTrending(){

    const [responseForMovies , responseForSeries ] = await Promise.all(
        [
        fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US',{
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${ACCESS_TOKEN}`
            }
        }) , 
        fetch('https://api.themoviedb.org/3/trending/tv/day?language=en-US',{
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${ACCESS_TOKEN}`
            }
        })
        ]
    )
    if (!responseForMovies.ok) {
        throw new Error("Failed to fetch Movies");
    }
    
    if (!responseForSeries.ok) {
        throw new Error("Failed to fetch TV shows.")
    }
    const [movieData ,seriesData ] = await Promise.all([
        responseForMovies.json(),
        responseForSeries.json()
    ])
    
    console.log({movies: movieData.results , series:seriesData.results});
    return {movies: movieData.results , series:seriesData.results}

}