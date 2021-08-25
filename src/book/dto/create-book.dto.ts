import { IsInt, IsPositive, MaxLength } from "class-validator";

export class CreateBookDto {
    @MaxLength(100)
    title: string;

    @MaxLength(1000)
    description: string;

    @IsInt()
    @IsPositive()
    year: number;

    @IsInt()
    @IsPositive()
    authorId: number;
}
