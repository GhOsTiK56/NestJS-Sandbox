import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CatResponseDto {
  @ApiProperty({
    example: 'Cat1'
  })
  @IsString()
  name!: string;

  @ApiProperty({
    example: 3
  })
  @IsNumber()
  age!: number;

  @ApiProperty({
    example: 'average'
  })
  @IsString()
  breed!: string;
}
