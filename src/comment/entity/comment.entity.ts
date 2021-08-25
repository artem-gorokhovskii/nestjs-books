import { Author } from "src/author/entity/author.entity";
import { Book } from "src/book/entity/book.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { File } from '../../fileupload/entity/file.entity';

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;


    @Column()
    content: string;


    @ManyToOne(() => Author, (author) => author.comment)
    author: Author;
    

    @ManyToOne(() => Book, (book) => book.comment)
    book: Book;
    
    
    @OneToMany(() => File, (file) => file.comment, { cascade: true })
    @JoinColumn()
    file: File[];
}
