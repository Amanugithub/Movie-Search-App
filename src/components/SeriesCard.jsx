export default function SeriesCard({seriesDetails}){
    const IMG_BASE = "https://image.tmdb.org/t/p/w500";
    return (
        
        <div className="embla__slide grow-0 shrink-0 flex-[0 0 100%] min-w-0 pl-(--slide-spacing) w-[25%] lg:w-[13%] ">
            <img src={`${IMG_BASE}${seriesDetails.poster_path}`} alt="poster" className="
            border-4 border-secondary-dark-200 w-50 rounded-3xl" />

            <div className="info font-manrope text-secondary-dark-100 font-bold" >
                <p>{seriesDetails.name}</p>
                <span className="rating text-primary-dark-100 " >{seriesDetails.vote_average.toFixed(1)} Rating</span>
            </div>
        </div>
            
    )
}

