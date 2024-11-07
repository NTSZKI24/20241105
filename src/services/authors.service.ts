import { AppDataSource } from "../data-source"
import { News } from "../entities/News"
import { Author } from "../entities/Author";
import { error } from "console";


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
    await authorRepository.save(inserted)

    return inserted
}



export const updateAuthor = async (authorData: IAuthorData) => {
    const author = await authorRepository.findOneBy({
        id: authorData.id 
    })

    if(author){
        author.first_name = authorData.first_name
        author.last_name = authorData.last_name
        
        authorRepository.save(author)
        return {
            error: false,
            message: "Successfully saved",
            statusCode: 200,
            author: author
            
        }
    } else {
        return {
            error: true,
            message: "Author not found",
            statusCode: 404,
            author: null
        }
    }
}

export const deleteAuthor = async (id: number) => {
    const author = await authorRepository.findOneBy({
        id: id
    })

    if(author) {
        await authorRepository.remove(author)
        return {
            error: false,
            message: "Deleted Author",
            statusCode: 204
        }
    } else {
        return {
            error: true,
            message: "Author not found",
            statusCode: 404
        }
    }

}