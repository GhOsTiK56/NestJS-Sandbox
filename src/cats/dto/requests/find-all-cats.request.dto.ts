import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class FindAllCatsRequestDto {
  @ApiProperty({
    example: 3,
    required: false
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  age?: number;

  @ApiProperty({
    example: 'average',
    required: false
  })
  @IsOptional()
  @IsString()
  breed?: string;
}
