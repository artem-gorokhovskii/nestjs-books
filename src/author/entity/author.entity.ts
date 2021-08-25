import { Book } from "src/book/entity/book.entity";
import { Comment } from "src/comment/entity/comment.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { File } from '../../fileupload/entity/file.entity';

@Entity()
export class Author {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    name: string;

    @OneToMany(() => Comment, (comment) => comment.author, { cascade: true })
    @JoinColumn()
    comment: Comment;

    @OneToMany(() => Book, (book) => book.author, { cascade: true })
    @JoinColumn()
    book: Book;

    @OneToMany(() => File, (file) => file.author, { cascade: true })
    @JoinColumn()
    file: File[];
}
