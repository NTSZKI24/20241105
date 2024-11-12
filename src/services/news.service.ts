import { StringMappingType } from "typescript";
import { AppDataSource } from "../data-source"
import { Author } from "../entities/Author"
import { News } from "../entities/News";
import { error } from "console";
import { In } from "typeorm";



const newsRepository = AppDataSource.getRepository(News);
const authorRepository = AppDataSource.getRepository(Author);

export interface INewsData {
    id?: number
    title: string
    lead: string
    author_id?: number
}

export const getAllNews = async () => {
    const news = await newsRepository.find({
        relations: {
            author: true
        }
    })

    return news;
}

export const createNews = async (newsData: INewsData) => {
    const inserted = await newsRepository.create(newsData)
    const author = await authorRepository.findOneBy({
        id: newsData.author_id
    })
    if(author){
        inserted.author = author;
    }
    await newsRepository.save(inserted)

    return inserted
}



export const updateNews = async (newsData: INewsData) => {
    const news = await newsRepository.findOneBy({
        id: newsData.id 
    })

    if(news){
        news.title = newsData.title
        news.lead = newsData.lead
        
        const author = await authorRepository.findOneBy({
            id: newsData.author_id
        })
        if(author){
            news.author = author;
        }
        
        newsRepository.save(news)
        return {
            error: false,
            message: "Successfully saved",
            statusCode: 200,
            news: news
            
        }
    } else {
        return {
            error: true,
            message: "News not found",
            statusCode: 404,
            news: null
        }
    }
}

export const deleteNews = async (id: number) => {
    const news = await newsRepository.findOneBy({
        id: id
    })

    if(news) {
        await newsRepository.remove(news)
        return {
            error: false,
            message: "Deleted News",
            statusCode: 204
        }
    } else {
        return {
            error: true,
            message: "News not found",
            statusCode: 404
        }
    }

}

export const connectToAuthor = async (
    authorId: number,
    news: number[]
) => {
    const author = await authorRepository.findOneBy({
        id: authorId
    })
    if (!author){
        return{
            error: true,
            message: "Author not found",
            statusCode: 404
        }
    }

    const newsModels = await newsRepository.find({
        where: {
            id: In(news)

        }
    })

    author.news.forEach((news: News) => {
        if(!author.news.some((n) => n.id === news.id)) {
            author.news.push(news)
        }
    })

    await authorRepository.save(author)
    return {
        error: false,
        message: "Connected",
        statusCode: 200
    }

}