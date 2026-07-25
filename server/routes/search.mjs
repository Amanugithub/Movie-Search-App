import express from 'express';
import { config } from 'dotenv';
config();
const router = express.Router();
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;


router.get('/search', async (req, res) => {
    try {
        const { searchTerm } = req.query;
        const data = await fetchData(searchTerm);

        res.json(data);

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Failed to search."
        });
    }
});

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
        return data.results;
    }

export default router;