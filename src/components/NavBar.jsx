import { Link } from "react-router-dom";

export default function NavBar(){
    return (
        <nav className="fixed top-4 left-1/2 -translate-x-1/2
                flex gap-6
                bg-neutral-dark-800/70
                backdrop-blur-md
                px-6 py-3
                rounded-full z-30" >
            <Link to='/' >Home</Link>
            <Link to='/watchlist'>Watchlist</Link>
            <Link to='/AI' >AI</Link>
            <Link to='/quiz' >Quiz</Link>
            <Link to='/about' >About</Link>
            
        </nav>
    )
}