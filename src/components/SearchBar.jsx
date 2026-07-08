import { useState } from 'react';
export default function SearchBar(){
    const [searchTerm, setSearchTerm] = useState('');
    const [results,setResults] = useState(null);

    function handleSearch(e){
        setSearchTerm(e.target.value);

    }

    return (
        <section className='Search relative mx-auto mt-[15vh]' >
            <input type="search" placeholder='Search for Movies...' value={searchTerm} onChange={handleSearch} className='border-gray-600 inset-shadow-xs inset-shadow-blue-200 border backdrop-blur-xl p-3 px-10 rounded-full focus:outline-none md:w-170 sm:w-120 w-80 bg-gray-900/10' />
            <button className=' absolute right-0 top-0 bg-neutral-100 text-blue-950 p-2 rounded-full mt-1.25 mr-1.25 shadow-orange-bloom inset-shadow-orange-300 inset-shadow-orange-bloom' >Search</button>
            <div className='results' >
                
            </div>
        </section>
    )
}
async function fetchData(){
    const URL = ''
    const response = await fetch()
}



