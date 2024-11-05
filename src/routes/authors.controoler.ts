import express, {Request, Response} from "express"
import { creatAuthor, getAllAuthors } from "../services/authors.service";

const router = express.Router()


router.get("/", async (req: Request, res: Response) => {
    const authors = await getAllAuthors()

    res.json(authors)
    return
})

router.get("/create", async (req: Request, res: Response) => {
    res.status(201).json(await creatAuthor({
        first_name: req.body.first_name,
        last_name: req.body.last_name
    }))
})

router.get("/update/:id", (req: Request, res: Response) => {

})

router.get("/delete/:id", (req: Request, res: Response) => {

})


