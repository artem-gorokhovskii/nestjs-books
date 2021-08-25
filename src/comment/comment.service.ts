import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthorService } from 'src/author/author.service';
import { BookService } from 'src/book/book.service';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { QueryPaginationDto } from './dto/query-pagination.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entity/comment.entity';

@Injectable()
export class CommentService {
    constructor(
        private readonly bookService: BookService,
        private readonly authorService: AuthorService,
        @InjectRepository(Comment) private readonly commentRepository: Repository<Comment>
    ) {}
    getAll(queryPaginationDta: QueryPaginationDto): Promise<Comment[]> {
        return this.commentRepository.find({
            relations: ['author','book','file'],
            skip: queryPaginationDta.offset || 0,
            take: queryPaginationDta.limit || 20
        })
    }

    async getOne(id: number): Promise<Comment> {
        const comment = await this.commentRepository.findOne(id, {relations: ['author','book','file']});

        if (!comment) {
            throw new NotFoundException("Comment not found");
        }

        return comment;
    }

    async createOne({authorId, bookId, ...commentData}: CreateCommentDto): Promise<Comment> {
        const author = await this.authorService.getOne(authorId);
        const book = await this.bookService.getOne(bookId);
        const comment = this.commentRepository.create({...commentData, book, author });
        await this.commentRepository.save(comment);
        return comment;
    }

    async updateOne(id: number, updateCommentDto: UpdateCommentDto): Promise<Comment> {
        const preloadedComment = await this.commentRepository.preload({ id, ...updateCommentDto });
        await this.commentRepository.save(preloadedComment);
        return preloadedComment;
    }

    async deleteOne(id: number) {
        const foundComment = await this.getOne(id);

        if (!foundComment) {
            throw new NotFoundException("Comment not found");
        }

        await this.commentRepository.delete(id);
    }
}
