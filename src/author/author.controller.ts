import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PublicDecorator } from '../common/decorators/public-decorator';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { QueryPaginationDto } from './dto/query-pagination.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from './entity/author.entity';

@ApiTags("Author")
@Controller('author')
export class AuthorController {
    constructor(private readonly authorService: AuthorService) {
    }

    @PublicDecorator()
    @Get()
    getAll(@Query() query: QueryPaginationDto): Promise<Author[]> {
        return this.authorService.getAll(query);
    }

    @PublicDecorator()
    @Get(':id')
    getOne(@Param('id') id: number): Promise<Author> {
        return this.authorService.getOne(id);
    }

    @Post()
    createOne(@Body() createAuthorDto: CreateAuthorDto): Promise<Author> {
        return this.authorService.createOne(createAuthorDto);
    }

    @Patch(':id')
    updateOne(@Body() updateAuthorDto: UpdateAuthorDto, @Param('id') id: number): Promise<Author> {
        return this.authorService.updateOne(id, updateAuthorDto);
    }

    @Delete(':id')
    deleteOne(@Param('id') id: number) {
        return this.authorService.deleteOne(id);
    }
}
