import { useEffect, useState } from 'react';
import Carousel from './Carousel';
import { FaArrowRight } from "react-icons/fa6";

const backendURL = import.meta.env.VITE_BACKEND_URL;

export default function Trending(){
    const [trending, setTrending] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    
    useEffect(()=>{
        async function loadMovies() {
            try {
                setLoading(true);
                const response = await fetch(`${backendURL}/api/trending`);
                const data = await response.json();
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
        : <div className='flex items-center justify-between  px-5 lg:px-15'>
            <p className='font-instrument text-3xl md:text-4xl' >Trending Now</p> 
            <span className='flex gap-2 items-center'>
                <p className='font-monrope text-sm font-black'>VIEW ALL</p> 
                <FaArrowRight />
            </span>
        </div> }
        {loading ? <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div> : 
        <>
            <Carousel media={trending.movies} />
            <Carousel media={trending.series} />
            
        </>
         }
    </section>
    )
}

