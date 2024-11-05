import { AppDataSource } from "../data-source"
import { News } from "../entities/News"
import { Author } from "../entities/Author";


const newRepository = AppDataSource.getRepository(News);
const authorRepository = AppDataSource.getRepository(Author);

export interface IAuthorData {
    id?: number
    first_name: string
    last_name: string
}

export const getAllAuthors = async () => {
    const authors = await authorRepository.find({
        relations: {
            news: true
        }
    })

    return authors;
}

export const creatAuthor = async (authorData: IAuthorData) => {
    const inserted = await authorRepository.create(authorData)
}