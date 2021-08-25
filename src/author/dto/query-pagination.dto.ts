import { IsInt, IsOptional, IsPositive, Max } from "class-validator";

export class QueryPaginationDto {
    @IsPositive()
    @IsInt()
    @Max(100)
    @IsOptional()
    limit: number;

    @IsPositive()
    @IsInt()
    @IsOptional()
    offset: number;
}
