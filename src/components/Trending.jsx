import { useEffect, useState } from 'react';
import { IoIosArrowDropright } from "react-icons/io";
import useEmblaCarousel from 'embla-carousel-react'
import MovieCard from '../components/MovieCard'
const ACCESS_TOKEN =  import.meta.env.VITE_ACESS_TOKEN_AUTH;

export default function Trending(){
    const [trending, setTrending] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [emblaRef , emblaApi] = useEmblaCarousel();
    const scrollPrev = () => emblaApi?.scrollPrev()
    const scrollNext = () => emblaApi?.scrollNext()
    
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
        <div className="embla">
            <div className='trending-movies embla__viewport overflow-hidden ' ref={emblaRef}>
                 <div className="embla__container flex touch-pan-y touch-pinch-zoom ml-[calc(var(--slide-spacing) * -1)] ">
                                    {
                trending?.movies
                .filter((movie)=> movie.vote_average !== 0)
                .map((movie)=>(
                    <MovieCard movieDetails={movie} key={movie.id} />
                ))
            }
            </div>
        </div>
        <button className="embla__prev" onClick={scrollPrev}>
                <IoIosArrowDropright className='text-5xl text-primary-dark-100 scale-x-[-1]'/>
        </button>
        <button className="embla__next" onClick={scrollNext}>
            <IoIosArrowDropright className='text-5xl text-primary-dark-100'/>
        </button>

        <div className="trending-series"> 

        </div>
        </div> }
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