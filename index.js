import express from 'express'
import { connect } from 'mongoose'
import { config } from 'dotenv'
import router from './src/routes/index.js'
import cors from 'cors'

config()
const app = express()
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
app.use(cors()) 
import appRouting from './src/routes/index.js'
appRouting(app);
const PORT = process.env.PORT || 8800
// const URL = process.env.DATABASE_URL
const URL = process.env.MONGO_URI

// app.use("/", router)

connect(URL).then(()=>{
    app.get("/test", (req, res) => {
        return res.json({message: 'BACKEND WORKING'})
    })
    app.listen(PORT, ()=>{
        console.log(`server is running on http://localhost:${PORT}/api/v1`)
    })
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

export default app
