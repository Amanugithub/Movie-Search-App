import { useEffect, useState } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import { useNavigate } from "react-router-dom";
const backendURL = 'http://localhost:3001'
const imageURL = 'https://image.tmdb.org/t/p/w92'
export default function SearchBar(){
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedValue  = useDebounce(searchTerm, 500);
    const [results,setResults] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    
    
    useEffect(()=>{
        async function loadResults(){
            if(!debouncedValue.trim()){
                setResults([]);
                return;
                }
            try {
                const data = await search(debouncedValue);
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

            { results.filter((data)=> data.media_type !== "person").length > 0 && 
            <div className=' results z-0 absolute top-5 overflow-y-auto left-0 max-h-96 rounded-2xl rounded-tr-none rounded-tl-none pt-10 border-gray-600 border-t-0 bg-neutral-dark-800 
                             md:w-170 sm:w-120 w-80 
                            scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden '>
                {
                    results.filter((data)=> data.media_type !== "person").slice(0,10)
                    .map((media)=>(
                        <div className='searchResultCard' key={media.id} >
                            <div className='flex p-0.5 items-center gap-5 ' onClick={()=>{ navigate(`/details/${media.media_type}/${media.id}` , {state: {movie:media}}) }} >
                                <img src={imageURL +  media.poster_path} alt={media.title || media.name} className='w-10  rounded-xl' />
                                <p>{media.title || media.name}</p>
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


async function search(searchTerm) {
    const response = await fetch(
        `${backendURL}/api/search?searchTerm=${encodeURIComponent(searchTerm)}`
    );

    if (!response.ok) {
        throw new Error("Search failed");
    }

    return await response.json();
}

