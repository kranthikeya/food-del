import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from './routes/foodRoute.js'
import userRouter from "./routes/userRoute.js"
import "dotenv/config"
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"



// app config
const app = express()
const  port = process.env.PORT || 4000;

// middleware
app.use(express.json())
app.use(cors({ origin: 'https://food-del-frontend-cduiz6bab-krantikeyas-projects.vercel.app/' }));

//db connection
connectDB();

// api endpoints
app.use("/api/food",foodRouter)
app.use("/image",express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)

app.get("/",(req,res)=>{
    res.send("API Working")
})

app.listen(port,()=>{
    console.log(`Server Stared on http://localhost:${port}`)
})

// mongodb+srv://dandekranthikeya99:kalakeya99@cluster0.2ewj8ec.mongodb.net/?
