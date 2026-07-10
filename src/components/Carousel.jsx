import useEmblaCarousel from 'embla-carousel-react'
import { IoIosArrowDropright } from "react-icons/io";
import MediaCard from './MediaCard'

    export default function MovieCarousel({media}){
        const [emblaRef , emblaApi] = useEmblaCarousel();
        const scrollPrev = () => emblaApi?.scrollPrev()
        const scrollNext = () => emblaApi?.scrollNext()

        
        return (
            <div className="embla relative p-[5vw]" >

            <div className='embla__viewport overflow-hidden z-0 ' ref={emblaRef}>
                 <div className="embla__container flex touch-pan-y touch-pinch-zoom ml-[calc(var(--slide-spacing) * -1)] ">
                {
                media.filter((item)=> item.vote_average !== 0)
                .map((item)=>(
                    <MediaCard details={item} key={item.id} className="embla__slide" />
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