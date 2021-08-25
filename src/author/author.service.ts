import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAuthorDto } from './dto/create-author.dto';
import { QueryPaginationDto } from './dto/query-pagination.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from './entity/author.entity';

@Injectable()
export class AuthorService {
    constructor(@InjectRepository(Author) private readonly authorRepository: Repository<Author>) {
    }

    getAll(queryPaginationDta: QueryPaginationDto): Promise<Author[]> {
        return this.authorRepository.find({
            skip: queryPaginationDta.offset || 0,
            take: queryPaginationDta.limit || 20,
            relations: ['book','file']
        })
    }

    async getOne(id: number): Promise<Author> {
        const author = await this.authorRepository.findOne(id, {relations: ['book','file']});

        if (!author) {
            throw new NotFoundException("Author not found");
        }

        return author;
    }

    async createOne(createAuthorDto: CreateAuthorDto): Promise<Author> {
        const author = this.authorRepository.create(createAuthorDto);
        await this.authorRepository.save(author);
        return author;
    }

    async updateOne(id: number, updateAuthorDto: UpdateAuthorDto): Promise<Author> {
        const preloadedAuthor = await this.authorRepository.preload({ id: id, ...updateAuthorDto });
        await this.authorRepository.save(preloadedAuthor);
        return preloadedAuthor;
    }

    async deleteOne(id: number) {
        const foundAuthor = await this.getOne(id);

        if (!foundAuthor) {
            throw new NotFoundException("Author not found");
        }

        await this.authorRepository.delete(id);
    }
}
