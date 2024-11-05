import { DataSource } from "typeorm";
import dotenv from "dotenv"
import { Author } from "./entities/Author";
import { News } from "./entities/News";

dotenv.config()

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "3306"), //as string
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: false,
    entities: [Author, News],
    migrations: [],
    subscribers: []
})