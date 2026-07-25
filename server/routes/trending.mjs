import express from 'express';
import {config } from 'dotenv';
config()
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const router = express.Router();

const options = {
            method:'GET',
            headers: {
                accept: 'application/json',
                Authorization:`Bearer ${ACCESS_TOKEN}`
            }
        }
router.get('/trending' , async (req,res)=>{
    try {
        const data = await fetchTrending();
        res.json(data)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to fetch trending media."
        })
    }
})
    async function fetchTrending(){

    const [responseForMovies , responseForSeries] = await Promise.all(
        [
        fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US',options) , 
        fetch('https://api.themoviedb.org/3/trending/tv/day?language=en-US',options) ,
        ]
    )
    if (!responseForMovies.ok) {
        throw new Error("Failed to fetch Movies");
    } else if (!responseForSeries.ok) {
        throw new Error("Failed to fetch TV shows.")
    } 
    const [movieData ,seriesData] = await Promise.all([
        responseForMovies.json(),
        responseForSeries.json(),
    ])
    
    
    return {movies: movieData.results , series:seriesData.results}

    }
export default router;