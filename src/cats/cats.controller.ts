import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
  ValidationPipe
} from '@nestjs/common'
import { CatsService } from './cats.service'
import { CreateCatDto } from './dto/requests/create-cat.dto'
import { ApiOperation } from '@nestjs/swagger'
import { FindCatsWhereDto } from './dto/requests/find-cats-where.dto'

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @ApiOperation({
    summary: 'Create cat',
    description: 'Create cat'
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto)
  }

  @ApiOperation({
    summary: 'Get all cats list',
    description: 'Get all cats list'
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.catsService.findAll()
  }

  @Get('where')
  findAllWhere(@Query(ValidationPipe) query: FindCatsWhereDto) {
    return this.catsService.findAllWhere(query.age, query.breed)
  }

  @ApiOperation({
    summary: 'Get cat with id',
    description: 'Get cat with id'
  })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.catsService.findWithId(id)
  }
}
