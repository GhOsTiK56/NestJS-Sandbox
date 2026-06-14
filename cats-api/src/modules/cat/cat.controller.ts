import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query
} from '@nestjs/common';
import { CatsService } from './cat.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger';
import {
  CreateCatRequestDto,
  FindAllCatsRequestDto,
  UpdateCatRequestDto
} from './dto';
import { CatResponseDto } from './dto';
import { Protected } from '../auth/decorators/protected.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { OkResponseDto } from '../../common/dto';

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
  @ApiBearerAuth()
  @Protected()
  @ApiBadRequestResponse({ description: 'The cat was not created' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async create(
    @Body() createCatDto: CreateCatRequestDto,
    @CurrentUser() userId: string
  ): Promise<CatResponseDto> {
    return await this.catsService.create(createCatDto, userId);
  }

  @ApiOperation({
    summary: 'Get a list of all the cats',
    description: 'Return a list of all the cats'
  })
  @ApiOkResponse({
    description: 'The list of cats was founded',
    type: [CatResponseDto]
  })
  @ApiBearerAuth()
  @Protected()
  @Get()
  @HttpCode(HttpStatus.OK)
  public async findAll(
    @Query() query: FindAllCatsRequestDto,
    @CurrentUser() userId: string
  ): Promise<CatResponseDto[]> {
    return await this.catsService.findAll(userId, query.age, query.breed);
  }

  @ApiOperation({
    summary: 'Get a cat by ID',
    description: 'Return a cat by ID'
  })
  @ApiOkResponse({ description: 'The cat is found', type: CatResponseDto })
  @ApiNotFoundResponse({ description: 'The cat was not found' })
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @Protected()
  @Get(':id')
  public async findById(
    @Param('id') id: string,
    @CurrentUser() userId: string
  ): Promise<CatResponseDto> {
    return await this.catsService.findWithId(id, userId);
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
  @ApiBearerAuth()
  @Protected()
  @Put(':id')
  public async update(
    @Param('id') id: string,
    @Body() data: UpdateCatRequestDto,
    @CurrentUser() userId: string
  ): Promise<CatResponseDto> {
    return await this.catsService.update(id, data, userId);
  }

  @ApiOperation({
    summary: 'Delete a cat by ID',
    description: 'Deletes a cat by ID'
  })
  @ApiOkResponse({
    description: 'The cat was successfully deleted',
    type: OkResponseDto
  })
  @ApiNotFoundResponse({ description: 'The cat was not found' })
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @Protected()
  @Delete(':id')
  public async remove(
    @Param('id') id: string,
    @CurrentUser() userId: string
  ): Promise<OkResponseDto> {
    return await this.catsService.remove(id, userId);
  }

  @ApiOperation({
    summary: 'Delete all of cats',
    description: 'Delete all of cats'
  })
  @ApiOkResponse({
    description: 'The list of cats where..., was founded',
    type: OkResponseDto
  })
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @Protected()
  @Delete()
  public async removeAll(
    @CurrentUser() userId: string
  ): Promise<OkResponseDto> {
    return await this.catsService.removeAll(userId);
  }
}
