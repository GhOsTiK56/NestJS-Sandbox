import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCatDto {
  @ApiProperty({
    example: 'MyavkaRename'
  })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({
    example: '20'
  })
  @IsOptional()
  @IsNumber()
  age: number;

  @ApiProperty({
    example: 'averageRename'
  })
  @IsOptional()
  @IsString()
  breed: string;
}
