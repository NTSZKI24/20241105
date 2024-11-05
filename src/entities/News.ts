import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Author } from "./Author";

@Entity("news")
export class News {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    lead: string

    @ManyToOne(() => Author, (author) => author.news)
    @JoinColumn({
        name: "author_id"
    })
    author: Author
}