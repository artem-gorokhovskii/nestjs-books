import { Controller, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { QueryFileDto } from './dto/query-file.dto';
import { fileFilter } from './helpers/file-filter.helper';
import { diskStorage as storage } from './helpers/disk-storage.helper';
import { FileuploadService } from './fileupload.service';

@Controller('fileupload')
export class FileuploadController {
    constructor(private readonly fileuploadService: FileuploadService) {}
    @Post()
    @UseInterceptors(FileInterceptor("file", { storage, fileFilter }))
    uploadSingle(@Query() query: QueryFileDto, @UploadedFile() file: Express.Multer.File): Promise<string> {
        return this.fileuploadService.uploadFile(query, file);
    }
}
