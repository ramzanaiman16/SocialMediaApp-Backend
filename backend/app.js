import express from "express";
import dotenv from "dotenv"
import  {dbConnection}  from "./Config/db";
import router from "./routes/user-routes";
import blogRouter from "./routes/blog-routes";


dotenv.config()

const app = express()
app.use(express.json())

dbConnection()


app.use("/api/user", router)

app.use("/api/blog", blogRouter)
const port = process.env.Port || 8000


app.listen(port, ()=>{
    console.log(`Server is Connected in the port ${port} in ${process.env.App_dev}`)
})