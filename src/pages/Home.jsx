
import NavBar from '../components/NavBar'
import Trending from '../components/Trending';
import SearchBar from '../components/SearchBar';

//const ACCESS_TOKEN =  import.meta.env.VITE_ACESS_TOKEN_AUTH;
export default function Home(){
    return (
        <>
        <div className='landing-page bg-[url(/images/bg_vertical.png)] md:bg-[url(/images/bg_horizontal.png)] 
        bg-cover bg-center min-h-screen pt-10 px-10 flex flex-col relative  ' >
            <div className=' inset-0 absolute bg-linear-to-t from-neutral-dark from-0% to-30% to-transparent -z--10'></div>
            <NavBar />
            <h1 className='font-instrument italic text-center text-5xl md:text-7xl mt-10' >Discover Your Next Favorite <br /><span className='text-amber-400'>Movie.</span></h1>
            <p className='font-opensans text-center mt-5' >Browse thousands of movies and TV shows, explore trending releases, discover hidden gems, and build your personal watchlist.</p>
            <SearchBar />
        </div>
        <Trending />
        </>
    )
}
