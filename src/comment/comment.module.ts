import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { BookModule } from 'src/book/book.module';
import { AuthorModule } from 'src/author/author.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entity/comment.entity';

@Module({
  providers: [CommentService],
  controllers: [CommentController],
  imports: [ BookModule, AuthorModule, TypeOrmModule.forFeature([ Comment ]) ],
  exports: [ CommentService ]
})
export class CommentModule {}
