import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CatResponseDto,
  CreateCatRequestDto,
  FindAllCatsRequestDto,
  UpdateCatRequestDto
} from './dto';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { Prisma, type Cat } from '../../../prisma/generated/client';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CatService {
  constructor(private readonly prismaService: PrismaService) {}

  private mapToDto(cat: Cat): CatResponseDto {
    return plainToInstance(
      CatResponseDto,
      {
        name: cat.name,
        age: cat.age,
        breed: cat.breed ?? undefined
      },
      { excludeExtraneousValues: true }
    );
  }

  public async create(
    userId: string,
    data: CreateCatRequestDto
  ): Promise<CatResponseDto> {
    const cat = await this.prismaService.cat.create({
      data: {
        userId,
        ...data
      }
    });

    return this.mapToDto(cat);
  }

  public async findOne(userId: string, id: string): Promise<CatResponseDto> {
    const cat = await this.prismaService.cat.findUnique({
      where: {
        userId,
        id
      }
    });

    if (!cat) {
      throw new NotFoundException(`Cat with id: ${id} not found`);
    }

    return this.mapToDto(cat);
  }

  public async findAll(
    userId: string,
    query: FindAllCatsRequestDto
  ): Promise<CatResponseDto[]> {
    const cats = await this.prismaService.cat.findMany({
      where: {
        userId,
        age: query.age,
        breed: query.breed
      }
    });

    return cats.map((cat) => this.mapToDto(cat));
  }

  public async update(
    userId: string,
    id: string,
    data: UpdateCatRequestDto
  ): Promise<CatResponseDto> {
    try {
      const cat = await this.prismaService.cat.update({
        where: {
          userId,
          id
        },
        data: {
          ...data
        }
      });

      return this.mapToDto(cat);
    } catch (error) {
      this.handlerPrismaError(error, id);
    }
  }

  public async remove(userId: string, id: string): Promise<void> {
    try {
      await this.prismaService.cat.delete({
        where: {
          userId,
          id
        }
      });
    } catch (error) {
      this.handlerPrismaError(error, id);
    }
  }

  public async removeAll(userId: string): Promise<void> {
    await this.prismaService.cat.deleteMany({
      where: {
        userId
      }
    });
  }

  private handlerPrismaError(error: unknown, id: string): never {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Cat with id: ${id} not found`);
      }
    }
    throw error;
  }
}
