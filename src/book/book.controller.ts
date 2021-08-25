import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PublicDecorator } from 'src/common/decorators/public-decorator';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { QueryPaginationDto } from './dto/query-pagination.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from "./entity/book.entity";

@ApiTags("Book")
@Controller('book')
export class BookController {
    constructor(private readonly bookService: BookService) {
    }

    @PublicDecorator()
    @Get()
    getAll(@Query() query: QueryPaginationDto): Promise<Book[]> {
        return this.bookService.getAll(query);
    }

    @PublicDecorator()
    @Get(':id')
    getOne(@Param('id') id: number): Promise<Book> {
        return this.bookService.getOne(id);
    }

    @Post()
    createOne(@Body() createBookDto: CreateBookDto): Promise<Book> {
        return this.bookService.createOne(createBookDto);
    }

    @Patch(':id')
    updateOne(@Body() updateBookDto: UpdateBookDto, @Param('id') id: number): Promise<Book> {
        return this.bookService.updateOne(id, updateBookDto);
    }

    @Delete(':id')
    deleteOne(@Param('id') id: number) {
        return this.bookService.deleteOne(id);
    }
}
