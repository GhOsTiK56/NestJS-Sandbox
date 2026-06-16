import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class FindAllCatsRequestDto {
  @ApiProperty({
    example: 3,
    required: false
  })
  @IsOptional()
  @IsInt()
  age?: number;

  @ApiProperty({
    example: 'average',
    required: false
  })
  @IsOptional()
  @IsString()
  breed?: string;
}
