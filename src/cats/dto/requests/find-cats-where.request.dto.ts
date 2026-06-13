import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class FindCatsWhereRequestDto {
  @ApiProperty({
    example: 3
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  age?: number;

  @ApiProperty({
    example: 'average'
  })
  @IsOptional()
  @IsString()
  breed?: string;
}
