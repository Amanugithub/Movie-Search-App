import express from 'express';
import cors from 'cors';

import searchRoute from './routes/search.mjs';
import trendingRoute from './routes/trending.mjs'
import mediaDetails from './routes/mediaDetails.mjs'
const app = express();
const port = 3001;


app.use(cors());
app.use(express.json())

app.use('/api',searchRoute);
app.use('/api',trendingRoute);
app.use('/api',mediaDetails);


app.get('/',(req,res)=>{
    res.send("trial loaded succesfully")
})



app.listen(port, ()=>{
    console.log('server started succesfully! yay!');
    
})




