import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorModule } from './author/author.module';
import { CommonModule } from './common/common.module';
import { BookModule } from './book/book.module';
import { CommentModule } from './comment/comment.module';
import { FileuploadModule } from './fileupload/fileupload.module';

@Module({
  imports: [AuthorModule, CommonModule, BookModule, CommentModule, FileuploadModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
