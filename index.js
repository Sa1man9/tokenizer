import express from 'express'
import cors from 'cors'
const app=express();

import tokenRoutes from './tokenizer.js'

app.use(cors({origin:"*"}));
app.use(express.json())
app.use("/api/v1",tokenRoutes)

app.listen(5000,()=>{
    console.log("tokenizer is listening")
})