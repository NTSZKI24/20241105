import express, {Request, Response} from "express"
import { createNews, deleteNews, getAllNews, updateNews } from  "../services/news.service";

const router = express.Router()


router.get("/", async (req: Request, res: Response) => {
    
})

router.post("/create", async (req: Request, res: Response) => {
    
})

router.put("/update/:id", async (req: Request, res: Response) => {
    
})

router.delete("/delete/:id", async (req: Request, res: Response) => {
   
})

export default router;

