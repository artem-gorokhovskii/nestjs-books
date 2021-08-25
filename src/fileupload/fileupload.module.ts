import { Module } from '@nestjs/common';
import { FileuploadService } from './fileupload.service';
import { FileuploadController } from './fileupload.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './entity/file.entity';
import { AuthorModule } from 'src/author/author.module';
import { CommentModule } from 'src/comment/comment.module';
import { BookModule } from 'src/book/book.module';

@Module({
  providers: [FileuploadService],
  controllers: [FileuploadController],
  imports: [TypeOrmModule.forFeature([ File ]), AuthorModule, CommentModule, BookModule]
})
export class FileuploadModule {}
