/* eslint-disable prettier/prettier */
import { IsString } from 'class-validator';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class UserCredentialDto {
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
