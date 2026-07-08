import { useEffect, useState } from 'react';
import { useDebounce } from '../hooks/useDebounce';
const ACCESS_TOKEN =  import.meta.env.VITE_ACESS_TOKEN_AUTH;
const imageURL = 'https://image.tmdb.org/t/p/w92'
export default function SearchBar(){
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedValue  = useDebounce(searchTerm, 500);
    const [results,setResults] = useState([]);
    const [error, setError] = useState(null);
    
    
    useEffect(()=>{
        async function loadResults(){
            if(!debouncedValue.trim()){
                setResults([]);
                return;
                }
            try {
                const data = await fetchData(debouncedValue);
                setResults(data);
            } catch (error) {
                setError(error);
            }
        }
        loadResults();
        
    },[debouncedValue])
    function handleSearch(e){
        setSearchTerm(e.target.value);
    }

    return (
        <section className='Search relative mx-auto mt-[15vh] ' >
            <input type="search" placeholder='Search for Movies...' value={searchTerm} onChange={handleSearch} spellCheck='false' className='
                                z-20 relative border-gray-600 border-b-0 border-t-0 inset-shadow-xs inset-shadow-blue-200 border backdrop-blur-xl p-3 px-10 rounded-full focus:outline-none md:w-170 sm:w-120 w-80 bg-gray-900/10   ' />
            <button className=' z-25 absolute right-0 top-0 bg-neutral-100 text-blue-950 p-2 rounded-full mt-1.25 mr-1.25 shadow-orange-bloom inset-shadow-orange-300 inset-shadow-orange-bloom ' >Search</button>

            { results.length > 0 && 
            <div className=' results z-0 absolute top-5 overflow-y-auto left-0 max-h-96 rounded-2xl rounded-tr-none rounded-tl-none pt-10 border-gray-600 border-t-0 bg-neutral-dark-800 
                             md:w-170 sm:w-120 w-80 
                            scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden '>
                {
                    results?.slice(0,10)
                    .map((movie)=>(
                        <div className='  ' key={movie.id} >
                            <div className='flex p-0.5 items-center gap-5' >
                                <img src={imageURL +  movie.poster_path} alt={movie.title || movie.name} className='w-10  rounded-xl' />
                                <p>{movie.title || movie.name}</p>
                            </div>
                            
                            <hr  className='border-neutral-950' />
                        </div>
                    ))
                    
                }
            </div>
            }
        </section>
    )
}


    async function fetchData(searchTerm){
    const URL = 'https://api.themoviedb.org/3/search/multi'
    const params = {
        query: searchTerm,
        language:'en-US',
        page: 1,
        include_adult:false
        }
    const queryString = new URLSearchParams(params).toString();
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${ACCESS_TOKEN}`
        }
    }
    const response = await fetch(`${URL}?${queryString}`,options)
    if(!response.ok)
        throw new Error("Error fetching data");
    const data = await response.json();
    console.log(data.results);
    
    return data.results;
    }




