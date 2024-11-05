import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { News } from "./News";

@Entity("authors")
export class Author {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    first_name: string

    @Column()
    last_name: string

    @OneToMany(() => News, (news) => news.author)
    news: News[]
}