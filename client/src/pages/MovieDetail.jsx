import { useParams , useLocation } from "react-router-dom";
import tv from '../../public/images/tv_cutout1.png'
import { FaStar } from "react-icons/fa";
import { IoShareSocialOutline } from "react-icons/io5";
import { IoAdd } from "react-icons/io5";
import { FaPlay } from "react-icons/fa";
import { useEffect, useState } from "react";
import MovieCarousel from "../components/Carousel";

const backendURL = import.meta.env.VITE_BACKEND_URL;
const imageURL = "https://image.tmdb.org/t/p/w1280";
export default function MovieDetail(){
    const { id } = useParams();
    const mediaType = useParams().media_type;
    const location = useLocation();
    
    const [details,setDetails] = useState({});
    const [similar, setSimilar] = useState([]);
    const [loading , setLoading] = useState(true);
    const [error,setError] = useState(null);

    
    useEffect(()=>{
        async function loadDetails(){
            try {
                setLoading(true);
                const {resultDetails , resultSimilar} = await fetchDetails(id , mediaType);
                setDetails(resultDetails);
                const Similar = resultSimilar.results.map((obj => ({...obj , media_type:mediaType})))
                setSimilar(Similar);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        
        loadDetails();
    },[id , mediaType,location]);

    
    

    return (
        <div>
            { loading ? <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div> 
            
            : <div className="">
                <div className="backdrop relative  overflow-hidden">
                    <img src={`${imageURL}${details.backdrop_path}`}
                        className="poster absolute left-[7%] top-[13%] w-[70%] h-[76%] object-cover z-0 "/>
                    <img src={tv} className=" relative block w-full z-10 max-w-full " />
                    <div inert className=' inset-0 absolute bg-linear-to-t from-neutral-dark from-10% to-75% z-20 to-transparent '></div>
                
                </div>

                <div className="details absolute top-[25%] md:top-[40%] lg:top-[60%] left-[2.5%] sm:left-[10%] md:left-[8%] p-4 sm:p-10 md:p-6 w-[95%] sm:w-3/4 md:w-4/5 z-20">

                    <div className="pills flex flex-wrap items-center gap-5 text-md font-bold text-secondary-dark-100 font-manrope sm:max-w-[60%] ">

                        <div className="border flex items-center justify-center border-secondary-dark-200/60 rounded-full min-w-20 text-center p-2 bg-neutral-dark-700/50 backdrop-blur-sm">
                            {details.release_date?.slice(0,4) || formatDuration(details.first_air_date , details.last_air_date) } 
                        </div>

                        <div className="border flex gap-2 items-center justify-center border-secondary-dark-200/60 rounded-full text-center font-bold p-2 bg-neutral-dark-700/50 backdrop-blur-sm">
                            <FaStar className="text-primary-dark-100" />
                            <div>{details.vote_average.toFixed(1)}</div>
                        </div>

                        <div className="border flex items-center justify-center border-secondary-dark-200/60 rounded-full min-w-20 text-center p-2 bg-neutral-dark-700/50 backdrop-blur-sm">
                            {details.runtime != null
                            ? formatRuntime(details.runtime)
                            : details.seasons[0].season_number == 0
                                ? details.seasons.length - 1 + " Seasons"
                                : details.seasons.length + " Seasons"}
                        </div>

                        <div className="border flex flex-wrap items-center justify-center gap-x-1 border-secondary-dark-200/60 rounded-full min-w-20 text-center p-2 bg-neutral-dark-700/50 backdrop-blur-sm">
                            {details.genres.map((genre, index) => (
                            <div key={genre.id} className="flex items-center">
                                {index > 0 && <span className="mx-1">•</span>}
                                {genre.name}
                            </div>
                            ))}
                        </div>

                    </div>

                    <h2 className=" font-instrument text-5xl sm:text-6xl text-glow-lg my-7 italic font-semibold" >{details.title || details.name}</h2>
                    <p className="" >{details.overview}</p>

                    <div className="action-buttons flex gap-4 font-monrope font-bold mt-10 ">

                        <div className="flex items-center  rounded-full bg-primary-dark-100 text-neutral-dark p-2 sm:p-5 ">
                            <FaPlay />
                            <p className="pl-2">Watch Now</p>
                        </div>

                        <div className="flex items-center gap-2 border rounded-full border-primary-dark-100 bg-neutral-dark-800 hover:bg-primary-dark-100 hover:text-neutral-dark-800 text-primary-dark-100 p-2 sm:p-5">
                            <IoAdd className="text-3xl items-center" />
                            <p>Add to Watchlist</p>
                        </div>

                        <button className="border border-neutral-dark-700 rounded-2xl p-2 sm:p-5 text-2xl bg-neutral-dark-800 " ><IoShareSocialOutline /></button>
                    </div>
                    
                    <div className="carousel mt-10 ">
                        <MovieCarousel media={similar} />
                    </div>
                    { error && <div>Error loading data</div> }
                </div>
            


            </div> }
        </div>


    )
}


async function fetchDetails(id , mediaType){
    const response = await fetch(`${backendURL}/api/mediaDetails?id=${id}&mediaType=${encodeURIComponent(mediaType)}`);
    if (!response.ok){
        throw new Error("error fetching details.")
    }
    return response.json();
}


function formatRuntime(mins){
    if (mins == 0 ) return "N/A"
    const h = Math.trunc(mins/60);
    const m = mins % 60;
    return `${h}h ${m.toString().padStart(2, '0')}m`;
}

function formatDuration(start , end){
    const start_year = start.slice(0,4);
    const end_year = end ? end.slice(0,4) : "Ongoing";
    return `${start_year} - ${end_year}`;
}

