import express from "express"
import dotenv from "dotenv"
import { AppDataSource } from "./data-source"

dotenv.config()

const app = express()
app.use(express.json())

app.get("/loop/:i", (req, res) => {
    const i = parseInt(req.params.i) // bekert ertek
    const tomb: string[] = [];

    for (let j = 0; j < i; j++) {
        tomb.push(`Elem ${j + 1}`);
    }

    res.json(tomb)
    return
})

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