import { PartialType } from '@nestjs/swagger';
import { CreateCatRequestDto } from './create-cat.requet.dto';

export class UpdateCatRequestDto extends PartialType(CreateCatRequestDto) {}
