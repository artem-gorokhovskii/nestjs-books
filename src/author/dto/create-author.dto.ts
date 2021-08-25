import { Length } from 'class-validator';

export class CreateAuthorDto {
    id: number;

    @Length(2, 20)
    name: string;
}
