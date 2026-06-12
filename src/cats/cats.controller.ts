import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  ValidationPipe
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { ApiOperation } from '@nestjs/swagger';
import {
  CreateCatRequest,
  FindCatsWhereRequest,
  UpdateCatRequest
} from './dto';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @ApiOperation({
    summary: 'Create cat',
    description: 'Create cat'
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  public create(@Body() createCatDto: CreateCatRequest) {
    return this.catsService.create(createCatDto);
  }

  @ApiOperation({
    summary: 'Get all cats list',
    description: 'Get all cats list'
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  public findAll() {
    return this.catsService.findAll();
  }

  @ApiOperation({
    summary: 'Get all cats where',
    description: 'Get all cats where'
  })
  @Get('where')
  public findAllWhere(@Query(ValidationPipe) query: FindCatsWhereRequest) {
    return this.catsService.findAllWhere(query.age, query.breed);
  }

  @ApiOperation({
    summary: 'Get a cat by id',
    description: 'Get a cat by id'
  })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.catsService.findWithId(id);
  }

  @ApiOperation({
    summary: 'Put a cat by id',
    description: 'Put a cat by id'
  })
  @Put(':id')
  public update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateCatRequest
  ) {
    return this.catsService.update(id, data);
  }

  @ApiOperation({
    summary: 'Delete a cat by id',
    description: 'Delete a cat by id'
  })
  @Delete(':id')
  public remove(@Param('id', ParseIntPipe) id: number) {
    return this.catsService.remove(id);
  }

  @ApiOperation({
    summary: 'Delete all cats',
    description: 'Delete all cats'
  })
  @Delete()
  public removeAll() {
    return this.catsService.removeAll();
  }
}
