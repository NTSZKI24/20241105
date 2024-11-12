import express, {Request, Response} from "express"
import { creatAuthor, deleteAuthor, getAllAuthors, updateAuthor } from "../services/authors.service";
import { validateData } from "../middleware/validationMiddleWare";
import { authorsCreateSchema, authorsUpdateSchema } from "../schemas/authorsSchema";

const router = express.Router()


router.get("/", async (req: Request, res: Response) => {
    const authors = await getAllAuthors()

    res.json(authors)
    return
})

router.post("/create", validateData(authorsCreateSchema), async (req: Request, res: Response) => {
    res.status(201).json(await creatAuthor({
        first_name: req.body.first_name,
        last_name: req.body.last_name
    }))
})

router.put("/update/:id", validateData(authorsUpdateSchema) ,async (req: Request, res: Response) => {
    const update = await updateAuthor({
        id: parseInt(req.params.id),
        first_name: req.body.first_name,
        last_name: req.body.last_name
    })

    res.status(update.statusCode).json(update)
    return
})

router.delete("/delete/:id", async (req: Request, res: Response) => {
    const deleted = await deleteAuthor(parseInt(req.params.id)) 

    res.status(deleted.statusCode).json(deleted)
})

export default router;

