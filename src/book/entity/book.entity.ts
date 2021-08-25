import { Author } from "src/author/entity/author.entity";
import { Comment } from "../../comment/entity/comment.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { File } from '../../fileupload/entity/file.entity';

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    title: string;

    @Column({ nullable: false })
    description: string;

    @Column({ nullable: false })
    year: number;

    @ManyToOne(() => Author, (author) => author.book)
    author: Author;

    @OneToMany(() => Comment, (comment) => comment.book, {cascade: true})
    @JoinColumn()
    comment: Comment[];

    @OneToMany(() => File, (file) => file.book, { cascade: true })
    @JoinColumn()
    file: File[];
}
