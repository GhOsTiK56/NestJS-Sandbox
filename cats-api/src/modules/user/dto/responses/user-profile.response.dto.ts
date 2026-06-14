import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class UserProfileResponseDto {
  @ApiProperty({
    example: 'email@mail.com'
  })
  @IsString()
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: 'Name'
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    example: 20
  })
  @IsNumber()
  @IsOptional()
  age?: number;
}
