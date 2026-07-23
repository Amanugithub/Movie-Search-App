import express from 'express'

const app = express();
const port = 3001;


app.get('/',(req,res)=>{
    res.send("trial loaded succesfully")
})

app.listen(port, ()=>{
    console.log('server started succesfully! yay!');
    
})
