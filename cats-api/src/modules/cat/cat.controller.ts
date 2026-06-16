import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query
} from '@nestjs/common';
import { CatService } from './cat.service';
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
import { CurrentUser, ParseNanoIDPipe } from '../../common';

@ApiBearerAuth()
@Protected()
@ApiTags('Cats')
@Controller('cats')
export class CatController {
  constructor(private readonly catsService: CatService) {}

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
  public create(
    @Body() createCatDto: CreateCatRequestDto,
    @CurrentUser() userId: string
  ): Promise<CatResponseDto> {
    return this.catsService.create(userId, createCatDto);
  }

  @ApiOperation({
    summary: 'Get a cat by ID',
    description: 'Return a cat by ID'
  })
  @ApiOkResponse({ description: 'The cat is found', type: CatResponseDto })
  @ApiNotFoundResponse({ description: 'The cat was not found' })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  public findOne(
    @Param('id', ParseNanoIDPipe) id: string,
    @CurrentUser() userId: string
  ): Promise<CatResponseDto> {
    return this.catsService.findOne(userId, id);
  }

  @ApiOperation({
    summary: 'Get a list of all the cats',
    description: 'Return a list of all the cats'
  })
  @ApiOkResponse({
    description: 'The list of cats was founded',
    type: CatResponseDto,
    isArray: true
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  public findAll(
    @Query() query: FindAllCatsRequestDto,
    @CurrentUser() userId: string
  ): Promise<CatResponseDto[]> {
    return this.catsService.findAll(userId, query);
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
  @Patch(':id')
  public update(
    @Param('id', ParseNanoIDPipe) id: string,
    @Body() data: UpdateCatRequestDto,
    @CurrentUser() userId: string
  ): Promise<CatResponseDto> {
    return this.catsService.update(userId, id, data);
  }

  @ApiOperation({
    summary: 'Delete a cat by ID',
    description: 'Deletes a cat by ID'
  })
  @ApiNotFoundResponse({ description: 'The cat was not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  public remove(
    @Param('id', ParseNanoIDPipe) id: string,
    @CurrentUser() userId: string
  ): Promise<void> {
    return this.catsService.remove(userId, id);
  }

  @ApiOperation({
    summary: 'Delete all of cats',
    description: 'Delete all of cats'
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete()
  public removeAll(@CurrentUser() userId: string): Promise<void> {
    return this.catsService.removeAll(userId);
  }
}
