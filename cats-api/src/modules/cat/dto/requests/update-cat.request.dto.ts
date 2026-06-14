import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCatRequestDto {
  @ApiProperty({
    example: 'CatRename'
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    example: 10
  })
  @IsOptional()
  @IsNumber()
  age?: number;

  @ApiProperty({
    example: 'averageRename'
  })
  @IsOptional()
  @IsString()
  breed?: string;
}
