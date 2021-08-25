import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entity/book.entity';
import { AuthorModule } from 'src/author/author.module';

@Module({
  imports: [ TypeOrmModule.forFeature([ Book ]), AuthorModule ],
  providers: [BookService],
  controllers: [BookController],
  exports: [BookService]
})
export class BookModule {}
