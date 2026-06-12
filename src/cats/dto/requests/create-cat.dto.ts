import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCatDto {
  @ApiProperty({
    example: 'Myavka'
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 3
  })
  @IsNumber()
  @IsNotEmpty()
  age: number;

  @ApiProperty({
    example: 'average'
  })
  @IsString()
  @IsNotEmpty()
  breed: string;
}
