import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginEmailDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
