/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsOptional, IsString, IsEmail, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name?: string | undefined;

  @IsOptional()
  @IsEmail()
  email?: string | undefined;

  @IsOptional()
  @MinLength(6)
  password?: string | undefined;
}
