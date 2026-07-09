import { useParams , useLocation } from "react-router-dom";

export default function MovieDetail(){
    const { id } = useParams;
    const imageURL = "https://image.tmdb.org/t/p/w1280";
    const location = useLocation();
    const movie = location.state.movie;
    return (
        <div>
            <img src={`${imageURL}/${movie.backdrop_path}`} alt="backdrop" />
        </div>
    )
}