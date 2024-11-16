import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsNumber()
  period: number;

  @IsNotEmpty()
  @IsNumber()
  plan: number;
}
