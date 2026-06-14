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
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger';
import {
  CreateCatRequestDto,
  FindCatsWhereRequestDto,
  UpdateCatRequestDto
} from './dto';
import { CatResponseDto } from './dto';

@ApiTags('Cats')
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @ApiOperation({
    summary: 'Create cat',
    description: 'Creates one cat'
  })
  @ApiCreatedResponse({
    description: 'The cat was created',
    type: CatResponseDto
  })
  @ApiBadRequestResponse({ description: 'The cat was not created' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async create(
    @Body() createCatDto: CreateCatRequestDto
  ): Promise<CatResponseDto> {
    return await this.catsService.create(createCatDto);
  }

  @ApiOperation({
    summary: 'Get a list of all the cats',
    description: 'Return a list of all the cats'
  })
  @ApiOkResponse({
    description: 'The list of cats was founded',
    type: [CatResponseDto]
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  public async findAll() {
    return await this.catsService.findAll();
  }

  @ApiOperation({
    summary: 'Get a list of all the cats that',
    description: 'Returns a list of all cats that have'
  })
  @ApiOkResponse({
    description: 'The list of cats where..., was founded',
    type: [CatResponseDto]
  })
  @Get('where')
  @HttpCode(HttpStatus.OK)
  public async findAllWhere(
    @Query(ValidationPipe) query: FindCatsWhereRequestDto
  ) {
    return await this.catsService.findAllWhere(query.age, query.breed);
  }

  @ApiOperation({
    summary: 'Get a cat by ID',
    description: 'Return a cat by ID'
  })
  @ApiOkResponse({ description: 'The cat is found', type: CatResponseDto })
  @ApiNotFoundResponse({ description: 'The cat was not found' })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  public async findById(@Param('id') id: string): Promise<CatResponseDto> {
    return await this.catsService.findWithId(id);
  }

  @ApiOperation({
    summary: 'Update the cat by ID',
    description: 'Returns the updated cat by ID'
  })
  @ApiOkResponse({
    description: 'The cat has been successfully updated',
    type: CatResponseDto
  })
  @ApiNotFoundResponse({ description: 'The cat was not found' })
  @HttpCode(HttpStatus.OK)
  @Put(':id')
  public async update(
    @Param('id') id: string,
    @Body() data: UpdateCatRequestDto
  ): Promise<CatResponseDto> {
    return await this.catsService.update(id, data);
  }

  @ApiOperation({
    summary: 'Delete a cat by ID',
    description: 'Deletes a cat by ID'
  })
  @ApiOkResponse({
    description: 'The cat was successfully deleted',
    type: CatResponseDto
  })
  @ApiNotFoundResponse({ description: 'The cat was not found' })
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  public async remove(
    @Param('id', ParseIntPipe) id: string
  ): Promise<CatResponseDto> {
    return await this.catsService.remove(id);
  }

  @ApiOperation({
    summary: 'Delete all of cats',
    description: 'Delete all of cats'
  })
  @ApiOkResponse({
    description: 'The list of cats where..., was founded',
    type: [CatResponseDto]
  })
  @HttpCode(HttpStatus.OK)
  @Delete()
  public async removeAll() {
    return await this.catsService.removeAll();
  }
}
