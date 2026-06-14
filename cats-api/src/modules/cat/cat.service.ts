import { Injectable, NotFoundException } from '@nestjs/common';
import type {
  CatResponseDto,
  CreateCatRequestDto,
  UpdateCatRequestDto
} from './dto';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { OkResponseDto } from '../../common/dto';
import { Cat } from '../../../prisma/generated/client';

@Injectable()
export class CatsService {
  constructor(private readonly prismaService: PrismaService) {}

  private mapDto(cat: Cat): CatResponseDto {
    return {
      name: cat.name,
      age: cat.age,
      breed: cat.breed ?? 'average'
    };
  }

  public async create(
    data: CreateCatRequestDto,
    userId: string
  ): Promise<CatResponseDto> {
    const cat = await this.prismaService.cat.create({
      data: {
        ...data,
        userId
      }
    });

    return this.mapDto(cat);
  }

  public async findWithId(id: string, userId: string): Promise<CatResponseDto> {
    const cat = await this.prismaService.cat.findUnique({
      where: {
        id,
        userId
      }
    });

    if (!cat) {
      throw new NotFoundException(`Cat with id: ${id} not found`);
    }

    return this.mapDto(cat);
  }

  public async findAll(
    userId: string,
    age?: number,
    breed?: string
  ): Promise<CatResponseDto[]> {
    const cats = await this.prismaService.cat.findMany({
      where: {
        userId,
        age,
        breed
      }
    });

    return cats.map((cat) => this.mapDto(cat));
  }

  public async update(
    id: string,
    data: UpdateCatRequestDto,
    userId: string
  ): Promise<CatResponseDto> {
    const cat = await this.prismaService.cat.findUnique({
      where: {
        userId,
        id
      }
    });

    if (!cat) {
      throw new NotFoundException(`Cat with id: ${id} not found`);
    }

    const catRenamed = await this.prismaService.cat.update({
      where: {
        userId,
        id
      },
      data: {
        ...data
      }
    });

    return this.mapDto(catRenamed);
  }

  public async remove(id: string, userId: string): Promise<OkResponseDto> {
    try {
      await this.prismaService.cat.delete({
        where: {
          userId,
          id
        }
      });

      return { message: 'ok' };
    } catch (error) {
      const prismaError = error as { code?: string };

      if (prismaError.code === 'P2025') {
        throw new NotFoundException(`Cat with id: ${id} not found`);
      }
      throw error;
    }
  }

  public async removeAll(userId: string): Promise<OkResponseDto> {
    await this.prismaService.cat.deleteMany({
      where: {
        userId
      }
    });

    return { message: 'ok' };
  }
}
