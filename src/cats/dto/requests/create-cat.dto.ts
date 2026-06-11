import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateCatDto {
  @ApiProperty({
    example: 'Myavka'
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 3
  })
  @IsNumber()
  age: number;

  @ApiProperty({
    example: 'average'
  })
  breed: string;
}
