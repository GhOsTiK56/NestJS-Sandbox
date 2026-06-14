import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCatRequestDto {
  @ApiProperty({
    example: 'Cat1'
  })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({
    example: 3
  })
  @IsNumber()
  @IsNotEmpty()
  age!: number;

  @ApiProperty({
    example: 'average',
    default: 'average',
    required: false
  })
  @IsString()
  @IsOptional()
  breed?: string;
}
