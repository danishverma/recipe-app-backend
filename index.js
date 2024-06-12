import express from 'express'
import { connect } from 'mongoose'
import { config } from 'dotenv'
config()
const app = express()
const PORT = process.env.PORT
const URL = process.env.DATABASE_URL
connect(`${URL}`).then(()=>{
    app.listen(PORT, ()=>{
        console.log('Server is running on port:', PORT)
    })
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});