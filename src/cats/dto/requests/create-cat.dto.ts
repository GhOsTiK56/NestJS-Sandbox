import { ApiProperty } from '@nestjs/swagger';

export class CreateCatDto {
	@ApiProperty({
		example: 'Myavka'
	})
	name: string;

	@ApiProperty({
		example: 3
	})
	age: number;

	@ApiProperty({
		example: 'average'
	})
	breed: string;
}
