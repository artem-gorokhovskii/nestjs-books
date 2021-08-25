import { Delete, Patch, Query } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PublicDecorator } from 'src/common/decorators/public-decorator';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { QueryPaginationDto } from './dto/query-pagination.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entity/comment.entity';

@ApiTags('Comment')
@Controller('comment')
export class CommentController {
    constructor(private readonly commentService: CommentService) {
    }

    @PublicDecorator()
    @Get()
    getAll(@Query() query: QueryPaginationDto): Promise<Comment[]> {
        return this.commentService.getAll(query);
    }

    @PublicDecorator()
    @Get(':id')
    getOne(@Param('id') id: number): Promise<Comment> {
        return this.commentService.getOne(id);
    }

    @Post()
    createOne(@Body() createCommentDto: CreateCommentDto): Promise<Comment> {
        return this.commentService.createOne(createCommentDto);
    }

    @Patch(':id')
    updateOne(@Body() updateBookDto: UpdateCommentDto, @Param('id') id: number): Promise<Comment> {
        return this.commentService.updateOne(id, updateBookDto);
    }

    @Delete(':id')
    deleteOne(@Param('id') id: number) {
        return this.commentService.deleteOne(id);
    }}
