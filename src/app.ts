import express from "express"
import dotenv from "dotenv"
import { AppDataSource } from "./data-source"

dotenv.config()

const app = express()
app.use(express.json())

app.listen(process.env.PORT, () => {
    console.log(`server is running on port: ${process.env.PORT}`)
    AppDataSource.initialize()
        .then(() => {
            console.log(`Connected to database ${process.env.DB_DATABASE}`)
        })
        .catch((e) => {
            console.log(e)
        })
})