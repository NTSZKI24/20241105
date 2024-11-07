import express, {Request, Response} from "express"
import { createNews, deleteNews, getAllNews, updateNews} from  "../services/news.service";

const router = express.Router()


router.get("/", async (req: Request, res: Response) => {
    const news =await getAllNews()

    res.json(news)
    return
})

router.post("/create", async (req: Request, res: Response) => {
    res.status(201).json(await createNews({
        title: req.body.title,
        lead: req.body.lead
    }))
})

router.put("/update/:id", async (req: Request, res: Response) => {
    const update = await updateNews({
        id: parseInt(req.params.id),
        title: req.body.title,
        lead: req.body.lead
    })

    res.status(update.statusCode).json(update)
    return
})

router.delete("/delete/:id", async (req: Request, res: Response) => {
    const deleted = await deleteNews(parseInt(req.params.id)) 

    res.status(deleted.statusCode).json(deleted)
})

export default router;

