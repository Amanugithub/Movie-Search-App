
import NavBar from '../components/NavBar'
import Trending from '../components/Trending';


//const ACCESS_TOKEN =  import.meta.env.VITE_ACESS_TOKEN_AUTH;
export default function Home(){
 

    return (
        <>
        <div className='landing-page bg-[url(/images/bg_vertical.png)] md:bg-[url(/images/bg_horizontal.png)] 
        bg-cover bg-center h-[80vh] pt-10 px-10 flex flex-col relative  ' >
            <div className=' inset-0 absolute bg-linear-to-t from-neutral-dark from-0% to-30% to-transparent -z--10'></div>
            <NavBar />
            <h1 className='font-instrument italic text-center text-5xl md:text-7xl mt-10' >Discover Your Next Favorite <br /><span className='text-amber-400'>Movie.</span></h1>
            <p className='font-opensans text-center mt-5' >Browse thousands of movies and TV shows, explore trending releases, discover hidden gems, and build your personal watchlist.</p>
            <section className='Search relative mx-auto mt-[15vh]' >
                <input type="search" placeholder='Search for Movies...' className='border-gray-600 inset-shadow-xs inset-shadow-blue-200 border backdrop-blur-xl p-3 px-10 rounded-full focus:outline-none md:w-170 sm:w-120 w-80 bg-gray-900/10' />
                <button className=' absolute right-0 top-0 bg-neutral-100 text-blue-950 p-2 rounded-full mt-1.25 mr-1.25 shadow-orange-bloom inset-shadow-orange-300 inset-shadow-orange-bloom' >Search</button>
            </section>
        </div>
        <Trending />
        </>
    )
}
