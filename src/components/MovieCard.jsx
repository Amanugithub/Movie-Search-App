export default function MovieCard({movieDetails}){
    const IMG_BASE = "https://image.tmdb.org/t/p/w500";
    return (
        
        <div className="embla__slide grow-0 shrink-0 flex-[0 0 100%] min-w-0 pl-(--slide-spacing) w-[25%] lg:w-[13%] ">
            <div className=" bg-neutral-dark-700 border-2 border-neutral-dark-500 rounded-3xl border-dashed p-2">
                <img src={`${IMG_BASE}${movieDetails.poster_path}`} alt="poster" className="
                      w-50 rounded-3xl shadow-[0_0_10px_rgba(0,0,0,1)]" />
            </div>
            <div className="info font-manrope text-secondary-dark-100 font-bold" >
                <p>{movieDetails.title}</p>
                <p className="text-sm ">{movieDetails.release_date.slice(0,4)} • <span className="rating text-primary-dark-100 " >{movieDetails.vote_average.toFixed(1)} Rating</span></p>
            </div>
        </div>
            
    )
}

