import useEmblaCarousel from 'embla-carousel-react'
import { IoIosArrowDropright } from "react-icons/io";
import MovieCard from '../components/MovieCard'
    export default function MovieCarousel({trending}){
        const [emblaRef , emblaApi] = useEmblaCarousel();
        const scrollPrev = () => emblaApi?.scrollPrev()
        const scrollNext = () => emblaApi?.scrollNext()

        return (
            <div className="embla relative p-[5vw]" >
            <div className=' inset-0 absolute bg-linear-to-r from-neutral-dark  via-transparent to-neutral-dark from-5% to-95% z-1 pointer-events-none'></div>

            <div className='trending-movies embla__viewport overflow-hidden z-0 ' ref={emblaRef}>
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
        <button className="embla__prev absolute top-[40%] left-[5%] z-10 " onClick={scrollPrev}>
                <IoIosArrowDropright className='text-5xl text-primary-dark-100 scale-x-[-1]'/>
        </button>
        <button className="embla__next absolute top-[40%] right-[5%] z-10" onClick={scrollNext}>
            <IoIosArrowDropright className='text-5xl text-primary-dark-100'/>
        </button>

        </div>
        )
    }