import { useContext } from "react";
import { GenreContext } from "../contexts/GenreContext";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
export default function MovieCard({movieDetails}){
    const IMG_BASE = "https://image.tmdb.org/t/p/w500";
    const genres = useContext(GenreContext).genres;
    const filteredGenres = genres.filter((obj)=>{ return movieDetails.genre_ids.includes(obj.id) });
    const navigate = useNavigate();

    return (
        
        <div className="embla__slide grow-0 shrink-0 flex-[0 0 100%] min-w-0 pl-(--slide-spacing) w-[45%] lg:w-[20%] " 
            onClick={()=>
            { navigate(`/details/${movieDetails.id}` , {state: {movie:movieDetails}}) }}>

            <div className=" bg-neutral-dark-700 border-2 border-neutral-dark-500 rounded-3xl border-dashed p-2">
                <img src={`${IMG_BASE}${movieDetails.poster_path}`} alt="poster" className="
                       rounded-3xl shadow-[0_0_10px_rgba(0,0,0,1)]" />
            </div>
            
            <div className="info font-manrope text-secondary-dark-100 font-bold" >
                <p>{movieDetails.title}</p>
                <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm gap-1">
                        <p className=" ">{movieDetails.release_date.slice(0,4)} •</p>
                        <p>{filteredGenres[0].name}</p>
                    </div>
                    <div className="rating flex items-center text-primary-dark-100">
                        <FaStar />
                        <p className="pl-2" >{movieDetails.vote_average.toFixed(1)}</p>
                    </div>
                </div>
                
            </div>
        </div>
            
    )
}

