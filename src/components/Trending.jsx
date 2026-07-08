import { useEffect, useState } from 'react';
import SeriesCarousel from './SeriesCarousel'
import MovieCarousel from './MovieCarousel';
import { FaArrowRight } from "react-icons/fa6";
const ACCESS_TOKEN =  import.meta.env.VITE_ACCESS_TOKEN_AUTH;

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
        {error ? <p>Error occured while loading...</p> 
        : <div className='flex items-center justify-between px-15'>
            <p className='font-instrument text-4xl' >Trending Now</p> 
            <span className='flex gap-2 items-center'>
                <p className='font-monrope text-sm font-black'>VIEW ALL</p> 
                <FaArrowRight />
            </span>
        </div> }
        {loading ? <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div> : 
        <>
            <MovieCarousel trending={trending} />
            <SeriesCarousel trending={trending} />
        </>
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
    
    
    return {movies: movieData.results , series:seriesData.results}

}