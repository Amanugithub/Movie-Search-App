import express from 'express';
import { config } from 'dotenv';
config();
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const router = express.Router();

const movieDetailsURL = 'https://api.themoviedb.org/3/movie/';
const seriesDetailsURL = 'https://api.themoviedb.org/3/tv/';
const option = {headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${ACCESS_TOKEN}`
                }}



router.get('/mediaDetails',async (req,res)=>{
    
    try {
        const { id , mediaType } = req.query;
        
        if (!id){
            throw new Error("media id not provided!")
        }
        const data = await fetchdetails(id , mediaType);
        res.json(data);
    }   catch(error){
            console.log(error);
            res.json({
                message: "couldn't fetch data."
            })
        
    }
})

async function fetchdetails(id , mediaType){
    let URL = '';
    if (mediaType == "movie") {
        URL = `${movieDetailsURL}${id}`
    } else if (mediaType == "tv"){
        URL = `${seriesDetailsURL}${id}`
    }

    const [responseDetails , responseSimilar] = await Promise.all([
        fetch(URL , option),
        fetch(`${URL}/similar` ,option)
    ]) 
    if (!responseDetails.ok){
        throw new Error("Error fetching details")
    } else if (!responseSimilar.ok){
    throw new Error("Error fetching similar media")
    }
    const [resultDetails , resultSimilar] = await Promise.all([
        responseDetails.json() , 
        responseSimilar.json()
    ])
    return {resultDetails , resultSimilar}
}

export default router;