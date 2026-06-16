import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CatResponseDto {
  @ApiProperty({
    example: 'Cat1'
  })
  @Expose()
  name!: string;

  @ApiProperty({
    example: 3
  })
  @Expose()
  age!: number;

  @ApiProperty({
    example: 'average'
  })
  @Expose()
  breed?: string;
}
