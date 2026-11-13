import { IsString, IsOptional } from "class-validator";

export class TokenDto {
    @IsOptional()
    @IsString()
    // @Transform(({value}) => value.trim())
    readonly token;
}