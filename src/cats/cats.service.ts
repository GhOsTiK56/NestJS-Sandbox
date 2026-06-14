import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import type { CreateCatRequestDto, UpdateCatRequestDto } from './dto';
import { Cat } from 'prisma/generated/client';

@Injectable()
export class CatsService {
  constructor(private readonly prismaService: PrismaService) {}

  public async create(data: CreateCatRequestDto): Promise<Cat> {
    // const cat = await this.prismaService.cat.create({
    //   data
    // });
    //
    // return cat;
    return {
      id: 'string',
      userId: 'string',
      age: 3,
      name: 'name',
      breed: 'breed',
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }

  public async findWithId(id: string): Promise<Cat> {
    const cat = await this.prismaService.cat.findUnique({
      where: {
        id
      }
    });

    if (!cat) {
      throw new NotFoundException(`Cat with id: ${id} not found`);
    }

    return cat;
  }

  public async findAll(age?: number, breed?: string): Promise<Cat[]> {
    return await this.prismaService.cat.findMany({
      where: {
        age,
        breed
      }
    });
  }

  public async update(id: string, data: UpdateCatRequestDto): Promise<Cat> {
    const cat = await this.prismaService.cat.findUnique({
      where: {
        id
      }
    });

    if (!cat) {
      throw new NotFoundException(`Cat with id: ${id} not found`);
    }

    return await this.prismaService.cat.update({
      where: {
        id
      },
      data: {
        ...data
      }
    });
  }

  public async remove(id: string): Promise<Cat> {
    const cat = await this.prismaService.cat.delete({
      where: {
        id
      }
    });

    if (!cat) {
      throw new NotFoundException(`Cat with id: ${id} not found`);
    }

    return cat;
  }

  public async removeAll() {
    return await this.prismaService.cat.deleteMany({});
  }
}
