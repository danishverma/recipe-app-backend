import express from 'express'
import { connect } from 'mongoose'
import { config } from 'dotenv'
import router from './src/routes/index.js'
import cors from 'cors'

config()
const app = express()
app.use(express.json());
app.use(cors({
    origin: "*"
}))
const PORT = process.env.PORT
// const URL = process.env.DATABASE_URL
const URL = process.env.MONGODB_URI

app.use("/", router)
// app.get("/test",(req, res) => {
//     res.json({
//         message: "app is working"
//     })
// })
console.log("=== mongod url ===",URL)
connect(URL).then(()=>{
    app.listen(PORT, ()=>{
        console.log('Server is running on port:', PORT)
    })
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

export default app