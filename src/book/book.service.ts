import { NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthorService } from 'src/author/author.service';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { QueryPaginationDto } from './dto/query-pagination.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entity/book.entity';

@Injectable()
export class BookService {
    constructor(
        @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
        private readonly authorService: AuthorService,
    ) {
    }

    getAll(queryPaginationDta: QueryPaginationDto): Promise<Book[]> {
        return this.bookRepository.find({
            relations: ['author', 'comment', 'file'],
            skip: queryPaginationDta.offset || 0,
            take: queryPaginationDta.limit || 20
        })
    }

    async getOne(id: number): Promise<Book> {
        const book = await this.bookRepository.findOne(id, {
            relations: ['author', 'comment', 'file'],
        });

        if (!book) {
            throw new NotFoundException("Book not found");
        }

        return book;
    }

    async createOne({authorId, ...bookData}: CreateBookDto): Promise<Book> {
        const author = await this.authorService.getOne(authorId);
        const book = this.bookRepository.create({...bookData, author});
        await this.bookRepository.save(book);
        return book;
    }

    async updateOne(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
        const preloadedBook = await this.bookRepository.preload({ id: id, ...updateBookDto });
        await this.bookRepository.save(preloadedBook);
        return preloadedBook;
    }

    async deleteOne(id: number) {
        const foundBook = await this.getOne(id);

        if (!foundBook) {
            throw new NotFoundException("Book not found");
        }

        await this.bookRepository.delete(id);
    }
}
