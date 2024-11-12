import express, {Request, Response} from "express"
import { connectToAuthor, createNews, deleteNews, getAllNews, updateNews} from  "../services/news.service";
import { connect } from "http2";

const router = express.Router()


router.get("/", async (req: Request, res: Response) => {
    const news =await getAllNews()

    res.json(news)
    return
})

router.post("/create", async (req: Request, res: Response) => {
    res.status(201).json(await createNews({
        title: req.body.title,
        lead: req.body.lead,
        author_id: req.body.author_id || null 
    }))
})

router.put("/update/:id", async (req: Request, res: Response) => {
    const update = await updateNews({
        id: parseInt(req.params.id),
        title: req.body.title,
        lead: req.body.lead,
        author_id: req.body.author_id || null
    })

    res.status(update.statusCode).json(update)
    return
})

router.delete("/delete/:id", async (req: Request, res: Response) => {
    const deleted = await deleteNews(parseInt(req.params.id)) 

    res.status(deleted.statusCode).json(deleted)
})


router.put("/connect", async (req: Request, res: Response) => {
    const connected = await connectToAuthor(
        req.body.author_id,
        req.body.news
    )

    res.status(connected.statusCode).json(connected)

})

export default router;

