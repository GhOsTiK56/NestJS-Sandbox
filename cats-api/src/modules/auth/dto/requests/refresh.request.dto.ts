import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshReqeustDto {
  @ApiProperty({
    example: 'token'
  })
  @IsString()
  @IsNotEmpty()
  refreshToken!: string;
}
