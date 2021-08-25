import { IsOptional, Length } from "class-validator";

export class UpdateAuthorDto {
    @Length(2, 20)
    @IsOptional()
    name: string;
}
