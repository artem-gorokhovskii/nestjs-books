import { BadRequestException } from "@nestjs/common";
import { Request } from "express";
import { extension } from "mime";
import { allowedFileCategories } from '../entity/file.entity';

type Req = Request;
type File = Express.Multer.File;
type Callback = (error: Error, acceptFile: boolean) => void;

const validMimeTypes = ['image/jpeg', 'image/png'];
const validExtensions = validMimeTypes.map(file => extension(file));

const allowedMimeTypes = new Set(validMimeTypes); 
const allowedCategories = new Set(allowedFileCategories);  

// We are handling only provided file extension, not real
export const fileFilter = (req: Req, file: File, cb: Callback): void => {
    if (!allowedCategories.has(req.query.category as string)) {
        cb(new BadRequestException("Invalid category of file"), false);
    } else if (!allowedMimeTypes.has(file.mimetype)) {
        cb(new BadRequestException("File extension is invalid. Valid extensions: " + validExtensions.join(",")), false);
    } else {
        cb(null, true);
    }
}