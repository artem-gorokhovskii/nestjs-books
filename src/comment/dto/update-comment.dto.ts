import { IsInt, IsOptional, IsPositive, IsString, Length } from "class-validator";

export class UpdateCommentDto {
        @IsString()
        @Length(1, 500)
        @IsOptional()
        content: string;
    
        @IsInt()
        @IsPositive()
        @IsOptional()
        authorId: number;
    
        @IsInt()
        @IsPositive()
        @IsOptional()
        bookId: number;
}
