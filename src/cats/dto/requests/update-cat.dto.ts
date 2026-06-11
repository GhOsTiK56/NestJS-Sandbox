import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsOptional, IsString } from 'class-validator'

export class UpdateCatDto {
  @ApiProperty({
    example: 'MyavkaRename'
  })
  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @ApiProperty({
    example: '20'
  })
  @IsNumber()
  age?: number

  @IsOptional()
  @ApiProperty({
    example: 'averageRename'
  })
  @IsString()
  breed?: string
}
