/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialDto {
  @IsString()
  @IsNotEmpty({ message: 'Field Should not be empty' })
  @MaxLength(30, { message: 'Maximum length should be 30' })
  @MinLength(4, { message: 'Minimum length should be 4' })
  username: string;

  @IsString()
  @IsNotEmpty({ message: 'Field Should not be empty' })
  @MaxLength(30, { message: 'Maximum length should be 30' })
  @MinLength(4, { message: 'Minimum length should be 4' })
  password: string;
}
