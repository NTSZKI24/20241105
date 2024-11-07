import { StringMappingType } from "typescript";
import { AppDataSource } from "../data-source"
import { Author } from "../entities/Author"
import { News } from "../entities/News";



const newsRepository = AppDataSource.getRepository(News);
const authorRepository = AppDataSource.getRepository(Author);

export interface INewsData {
    id?: number
    title: string
    lead: string
}

export const getAllNews = async () => {
    const news = await newsRepository.find({
        relations: {
            author: true
        }
    })

    return news;
}

export const creatNews = async (newsData: INewsData) => {
    const inserted = await newsRepository.create(newsData)
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