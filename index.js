import express from 'express'
import { connect } from 'mongoose'
import { config } from 'dotenv'
import router from './src/routes/index.js'

config()
const app = express()
app.use(express.json());
const PORT = process.env.PORT
const URL = process.env.DATABASE_URL

app.use("/", router)
connect(`${URL}`).then(()=>{
    app.listen(PORT, ()=>{
        console.log('Server is running on port:', PORT)
    })
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});