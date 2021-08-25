import { IsIn, IsInt, IsPositive, IsString } from "class-validator";
import { allowedFileCategories } from '../entity/file.entity';

export class QueryFileDto {
    @IsString()
    @IsIn(allowedFileCategories)
    category: string;

    @IsInt()
    @IsPositive()
    sourceId: number;
}