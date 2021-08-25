import { IsInt, IsPositive, IsString, Length } from "class-validator";

export class CreateCommentDto {
    @IsString()
    @Length(1, 500)  
    content: string;

    @IsInt()
    @IsPositive()
    authorId: number;

    @IsInt()
    @IsPositive()
    bookId: number;
}
