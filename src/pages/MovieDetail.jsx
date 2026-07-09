import { useParams , useLocation } from "react-router-dom";
import tv from '../../public/images/tv_cutout1.png'
import { FaStar } from "react-icons/fa";
import { IoShareSocialOutline } from "react-icons/io5";
import { IoAdd } from "react-icons/io5";
import { FaPlay } from "react-icons/fa";
import { useEffect, useState } from "react";

const movieDetailsURL = 'https://api.themoviedb.org/3/movie/';
const seriesDetailsURL = 'https://api.themoviedb.org/3/tv/';
const imageURL = "https://image.tmdb.org/t/p/w1280";
const ACCESS_TOKEN =  import.meta.env.VITE_ACCESS_TOKEN_AUTH;

export default function MovieDetail(){
    const { id } = useParams();
    const location = useLocation();
    const tempState = location.state.movie;

    const [details,setDetails] = useState({});
    const [loading , setLoading] = useState(true);
    const [error,setError] = useState(null);

    useEffect(()=>{
        async function loadDetails(){
            try {
                setLoading(true);
                const data = await fetchdetails(id , tempState);
                setDetails(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        loadDetails();
    },[id , tempState]);

    console.log(details);
    

    return (
        <div>
            <div className=" relative  overflow-hidden">
                <img src={`${imageURL}${details.backdrop_path}`}
                    className="poster absolute left-[7%] top-[13%] w-[70%] h-[76%] object-cover z-0 "/>
                <img src={tv} className=" relative block w-full z-10 max-w-full " />
                <div inert className=' inset-0 absolute bg-linear-to-t from-neutral-dark from-10% to-75% z-20 to-transparent '></div>

            </div>


            { loading ? <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div> : 
            <div className=" details absolute top-[60%] left-[10%] z-30 p-10 w-3/4 ">

                <div className="pills flex flex-wrap justify-between text-md font-bold text-secondary-dark-100 font-manrope max-w-[50%] ">
                    <div className="border border-secondary-dark-200/60 rounded-full min-w-20 text-center p-1 bg-neutral-dark-700/50 backdrop-blur-sm ">{details.release_date || details.first_air_date.slice(0,4) + " - " + details.last_air_date.slice(0,4) }</div>
                    <div className="border flex gap-2 items-center justify-center border-secondary-dark-200/60 rounded-full min-w-20 text-center font-bold p-1 bg-neutral-dark-700/50 backdrop-blur-sm ">
                        <FaStar className="text-primary-dark-100"/>
                        <div>{details.vote_average.toFixed(1)}</div>
                    </div>
                    <div className="border border-secondary-dark-200/60 rounded-full min-w-20 text-center p-1 bg-neutral-dark-700/50 backdrop-blur-sm">duration</div>
                    <div className="border flex border-secondary-dark-200/60 rounded-full min-w-20 text-center p-1 bg-neutral-dark-700/50 backdrop-blur-sm ">{details.genres.map((genre, index) => ( <div key={genre.id}>{index > 0 && <span className="mx-1">•</span>}{genre.name}</div>))}</div>
                </div>
                <h2 className=" font-instrument text-6xl text-glow-lg my-7 italic font-semibold " >{details.title || details.name}</h2>
                <p className=" w-2/3 " >{details.overview}</p>
                <div className="action-buttons flex gap-4 font-monrope font-bold mt-10">
                    
                    <div className="flex items-center rounded-full bg-primary-dark-100 text-neutral-dark p-5 ">
                        <FaPlay />
                        <p className="pl-2">Watch Now</p>
                    </div>
                    <div className="flex gap-2 border rounded-full border-primary-dark-100 bg-neutral-dark-800 hover:bg-primary-dark-100 hover:text-neutral-dark-800 text-primary-dark-100 p-5">
                        <IoAdd className="text-2xl items-center" />
                        <p>Add to Watchlist</p>
                    </div>
                    <button className="border border-neutral-dark-700 rounded-2xl p-5 text-2xl bg-neutral-dark-800 " ><IoShareSocialOutline /></button>
                </div>
            </div>}
            
            { error && <div>Error loading details</div> }
            
        </div>


    )
}


async function fetchdetails(id , movie){
    let URL = '';
    if (movie.media_type == "movie") {
        URL = `${movieDetailsURL}${id}`
    } else if (movie.media_type == "tv"){
        URL = `${seriesDetailsURL}${id}`
    }

    const response = await fetch(URL , {
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${ACCESS_TOKEN}`
        }
    });
    const result = await response.json();
    return result
}