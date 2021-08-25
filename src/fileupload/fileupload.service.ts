import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { join, resolve } from 'path';
import { AuthorService } from 'src/author/author.service';
import { BookService } from 'src/book/book.service';
import { CommentService } from 'src/comment/comment.service';
import { Repository } from 'typeorm';
import { QueryFileDto } from './dto/query-file.dto';
import { File } from './entity/file.entity';

@Injectable()
export class FileuploadService {
    constructor(
        @InjectRepository(File) private readonly fileRepository: Repository<File>,
        private readonly authorService: AuthorService,
        private readonly bookService: BookService,
        private readonly commentService: CommentService
    ) {}

    async uploadFile(query: QueryFileDto, file: Express.Multer.File): Promise<string> {
        const newFile = {
            category: query.category,
            fileName: file.filename,
            author: null,
            book: null,
            comment: null,
        };

        if (query.category === 'author') {
            newFile.author = await this.authorService.getOne(query.sourceId);
        } else if (query.category === 'book') {
            newFile.book = await this.bookService.getOne(query.sourceId);
        } else if (query.category === 'comment') {
            newFile.comment = await this.commentService.getOne(query.sourceId);
        }
        
        const fileInstance = await this.fileRepository.create(newFile);
        await this.fileRepository.save(fileInstance);

        return join(process.env.RELATIVE_WEB_PATH_FOR_FILES, query.category, file.filename);
    }
}
