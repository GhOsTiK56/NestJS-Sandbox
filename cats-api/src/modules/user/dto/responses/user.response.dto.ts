import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserResponseDto {
  @ApiProperty({
    example: 'email@mail.com'
  })
  @Expose()
  email!: string;

  @ApiProperty({
    example: 'Name'
  })
  @Expose()
  name?: string;

  @ApiProperty({
    example: 20
  })
  @Expose()
  age?: number;
}
