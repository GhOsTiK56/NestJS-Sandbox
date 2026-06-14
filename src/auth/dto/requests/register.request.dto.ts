import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength
} from 'class-validator';

export class RegisterRequestDto {
  @ApiProperty({
    example: 'Karen'
  })
  @IsString()
  @IsOptional()
  @MaxLength(50)
  name?: string;

  @ApiProperty({
    example: 20
  })
  @IsNumber()
  @IsOptional()
  age?: number;

  @ApiProperty({
    example: 'email@gmail.com'
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: '123456'
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(50)
  password!: string;
}
