import { Author } from "../../author/entity/author.entity";
import { Book } from "../../book/entity/book.entity";
import { Comment } from "../../comment/entity/comment.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export const allowedFileCategories = [
    'book',
    'comment',
    'author'
];

@Entity()
export class File {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, enum: allowedFileCategories })
    category: string;

    @Column({ nullable: false })
    fileName: string;

    @ManyToOne(() => Author, (author) => author.file)
    author: Author;

    @ManyToOne(() => Book, (book) => book.file)
    book: Book;

    @ManyToOne(() => Comment, (comment) => comment.file)
    comment: Comment;
}

